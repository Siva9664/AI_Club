import { prisma } from './prisma';

/** Turns an arbitrary string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * Returns a slug that is not already taken by another Project row.
 * When `preferred` is empty a slug is derived from `name`. Appends -2, -3…
 * until a free slug is found, ignoring the row being edited (`ignoreId`).
 */
export async function ensureUniqueProjectSlug(
  preferred: string | undefined,
  name: string,
  ignoreId?: number
): Promise<string> {
  const base = slugify(preferred && preferred.trim() ? preferred : name) || 'project';
  let candidate = base;
  let counter = 2;

  // Loop until a free slug is found.
  // Bounded to avoid an infinite loop on data anomalies.
  for (let i = 0; i < 1000; i += 1) {
    const existing = await prisma.project.findFirst({
      where: { slug: candidate, NOT: ignoreId ? { id: ignoreId } : undefined },
      select: { id: true },
    });
    if (!existing) return candidate;
    candidate = `${base}-${counter}`;
    counter += 1;
  }
  return `${base}-${Date.now()}`;
}
