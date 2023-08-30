import { BlogCollectionName, LifeCollectionName } from '@blog/config'
import { getCollection } from 'astro:content'

export async function getBlogTop() {
    const blogEntries = await getBlogData()
    return blogEntries.filter((node) => {
        return !!node.data.hot
    })
}

export async function getBlogData() {
    const blogEntries = await getCollection(BlogCollectionName)
    return blogEntries
}

export async function getBlogCount() {
    const blogEntries = await getBlogData()
    return blogEntries.length
}

export async function getLifeData() {
    const data = await getCollection(LifeCollectionName)
    return data
}

export async function getLiftCount() {
    const data = await getLifeData()
    return data.length
}

export async function getCategoryData() {
    const allPosts = await getBlogData()
    const categories = [
        ...new Set(allPosts.map((post) => post.data.category).flat()),
    ]
    return categories
}

export async function getCategoryCount() {
    const data = await getCategoryData()
    return data.length
}

export async function getTagsData() {
    const allPosts = await getBlogData()
    const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())]
    return tags
}

export async function getTagsCount() {
    const data = await getTagsData()
    return data.length
}
