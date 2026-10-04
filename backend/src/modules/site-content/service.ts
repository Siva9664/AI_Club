import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';
import { recordActivity } from '../../lib/activity';
import type { ContentKey } from './schema';

/** Returns every stored site-content block as a { key: value } map. */
export async function getAllContent(): Promise<Record<string, unknown>> {
  const rows = await prisma.siteContent.findMany();
  return rows.reduce<Record<string, unknown>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

export async function getContent(key: ContentKey) {
  const row = await prisma.siteContent.findUnique({ where: { key } });
  if (!row) throw AppError.notFound(`Site content "${key}" not found`);
  return { key: row.key, value: row.value, updatedAt: row.updatedAt };
}

export async function setContent(key: ContentKey, value: unknown, userId: number | null) {
  const row = await prisma.siteContent.upsert({
    where: { key },
    create: { key, value: value as object, updatedById: userId },
    update: { value: value as object, updatedById: userId },
  });
  await recordActivity(prisma, {
    action: 'updated',
    resourceType: 'site-content',
    resourceId: row.id,
    title: key,
    userId,
  });
  return { key: row.key, value: row.value, updatedAt: row.updatedAt };
}

/** Assembles the public /club payload from stored content blocks. */
export async function getClub() {
  const content = await getAllContent();
  const socials = (content.socials as unknown[]) ?? [];
  return {
    name: 'AI Club',
    tagline: 'SIET AI Club and AI Lab',
    logo: { light: '/icons.svg', dark: '/icons.svg', alt: 'AI Club' },
    overview: content.overview ?? {},
    contact: content.contact ?? {},
    socials,
    stats: [],
  };
}