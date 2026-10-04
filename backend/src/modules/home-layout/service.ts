import { prisma } from '../../lib/prisma';
import { recordActivity } from '../../lib/activity';
import { serializeResourceList } from '../../lib/serialize';
import { getAllContent } from '../site-content/service';
import type { HomeSection } from './schema';
import { HOME_SECTIONS } from './schema';

/** Section -> backing resource and maximum number of picks shown. */
export const SECTION_MAP: Record<HomeSection, { resourceType: string; limit: number }> = {
  featuredProjects: { resourceType: 'projects', limit: 6 },
  featuredAchievements: { resourceType: 'achievements', limit: 8 },
  guests: { resourceType: 'guests', limit: 6 },
};

const INCLUDE = { updatedBy: { select: { name: true } } } as const;

function delegateFor(resourceType: string) {
  if (resourceType === 'projects') return prisma.project as any;
  if (resourceType === 'achievements') return prisma.achievement as any;
  return prisma.guest as any;
}

/** Loads the approved rows for `ids`, preserving the given order. */
async function loadByIds(resourceType: string, ids: number[]) {
  if (ids.length === 0) return [];
  const rows = await delegateFor(resourceType).findMany({
    where: { id: { in: ids }, status: 'APPROVED', deletedAt: null },
    include: INCLUDE,
  });
  const byId = new Map<number, any>(rows.map((row: any) => [row.id, row]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

/** Fallback: approved featured rows (or any approved row) when no picks exist. */
async function featuredFallback(resourceType: string, limit: number) {
  const delegate = delegateFor(resourceType);
  const where = { status: 'APPROVED', deletedAt: null };
  let rows = await delegate.findMany({
    where: { ...where, featured: true },
    orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    take: limit,
    include: INCLUDE,
  });
  if (rows.length === 0) {
    rows = await delegate.findMany({
      where,
      orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      take: limit,
      include: INCLUDE,
    });
  }
  return rows;
}

/** Resolves one home section to a serialized list of items. */
async function resolveSection(section: HomeSection) {
  const { resourceType, limit } = SECTION_MAP[section];
  const slots = await prisma.homeSlot.findMany({
    where: { section, resourceType },
    orderBy: { position: 'asc' },
  });
  const ids = slots.map((slot) => slot.itemId);
  let rows = await loadByIds(resourceType, ids);
  if (rows.length === 0) rows = await featuredFallback(resourceType, limit);
  return serializeResourceList(rows.slice(0, limit));
}

/** Current layout: every section with its picked ids and resolved items. */
export async function getLayout() {
  const slots = await prisma.homeSlot.findMany({
    orderBy: [{ section: 'asc' }, { position: 'asc' }],
  });

  return Promise.all(
    HOME_SECTIONS.map(async (section) => {
      const picks = slots
        .filter((slot) => slot.section === section)
        .map((slot) => ({
          itemId: slot.itemId,
          position: slot.position,
          resourceType: slot.resourceType,
        }));
      return {
        section,
        resourceType: SECTION_MAP[section].resourceType,
        picks,
        items: await resolveSection(section),
      };
    })
  );
}

/** Replaces every section pick atomically. */
export async function replaceLayout(
  sections: Array<{ section: HomeSection; itemIds: number[] }>,
  userId: number | null
) {
  await prisma.$transaction(async (tx) => {
    await tx.homeSlot.deleteMany({});
    const rows = sections.flatMap((entry) => {
      const resourceType = SECTION_MAP[entry.section].resourceType;
      // De-duplicate while preserving order, then assign 1-based positions.
      const unique = [...new Set(entry.itemIds)];
      return unique.map((itemId, index) => ({
        section: entry.section,
        resourceType,
        itemId,
        position: index + 1,
      }));
    });
    if (rows.length > 0) await tx.homeSlot.createMany({ data: rows });
  });

  await recordActivity(prisma, {
    action: 'updated',
    resourceType: 'home-layout',
    resourceId: null,
    title: 'Home layout',
    userId,
  });

  return getLayout();
}
export async function getHome() {
  const content = await getAllContent();
  const [featuredProjects, featuredAchievements, guests] = await Promise.all([
    resolveSection('featuredProjects'),
    resolveSection('featuredAchievements'),
    resolveSection('guests'),
  ]);

  return {
    hero: content.hero ?? {},
    overview: content.overview ?? {},
    activities: [],
    featuredProjects,
    featuredAchievements,
    upcomingEvents: [],
    recentEvents: [],
    facilities: [],
    guests,
    contact: content.contact ?? {},
    socials: content.socials ?? [],
  };
}