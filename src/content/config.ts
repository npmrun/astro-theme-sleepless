// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    heroPosition: z.string().optional(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.string(),
    theme: z.enum(["green", "high"]).optional(),
    hot: z.boolean().optional(),
    chinese: z.boolean().optional(),
    tags: z.array(z.string()).or(z.string()),
    image: z.string().optional().optional(),
    // Reference a single author from the `authors` collection by `id`
    author: reference('authors'),
    // Reference an array of related posts from the `blog` collection by `slug`
    relatedPosts: z.array(reference('posts')).optional(),
  }),
});

const lifeCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    heroPosition: z.string().optional(),
    heroImage: z.string().optional(),
    hot: z.boolean().optional(),
    theme: z.enum(["green", "high"]).optional(),
    chinese: z.boolean().optional(),
    image: z.string().optional().optional(),
    // Reference a single author from the `authors` collection by `id`
    author: reference('authors'),
    // Reference an array of related posts from the `blog` collection by `slug`
    relatedPosts: z.array(reference('posts')).or(z.array(reference('life'))).optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  life: lifeCollection,
};
