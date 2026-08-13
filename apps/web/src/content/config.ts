import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    overrideCategory: z.string().optional()
  }),
});

const achievementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  }),
});

const certificatesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'achievements': achievementsCollection,
  'certificates': certificatesCollection,
};
