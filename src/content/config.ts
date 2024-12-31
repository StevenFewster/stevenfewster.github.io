import { defineCollection, z } from "astro:content";

const BlogPosts = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      author: z.string(),
      category: z.string(),
      type: z.string().optional(),
      cover: image(),
      attr: z
        .object({
          sourceName: z.string().optional(),
          sourceLink: z.string().optional(),
          siteName: z.string().optional(),
          siteLink: z.string().optional(),
        })
        .optional(),
      meta: z
        .object({
          rating: z.number().optional(),
          type: z.string().optional(),
          author: z.string().optional(),
          year: z.number().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { BlogPosts };
