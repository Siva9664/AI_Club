import { z } from 'zod';

export const HOME_SECTIONS = ['featuredProjects', 'featuredAchievements', 'guests'] as const;
export type HomeSection = (typeof HOME_SECTIONS)[number];

export const homeSectionBodySchema = z.object({
  section: z.enum(HOME_SECTIONS),
  itemIds: z.array(z.coerce.number().int().positive()).max(24),
});

export const homeLayoutBodySchema = z.object({
  sections: z.array(homeSectionBodySchema).min(1),
});