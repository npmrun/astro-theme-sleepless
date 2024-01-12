import { BlogCollectionName, LifeCollectionName } from '@blog/config'
import { getCollection } from 'astro:content'

/**
 * 筛选posts文章中含有hot属性的
 */
export async function getBlogTop() {
    const blogEntries = await getBlogDataSortByTime()
    let list = blogEntries.filter((node) => {
        return !!node.data.hot
    })
    // if(list.length === 0){
    //     list = blogEntries.slice(0, 3)
    // }
    return list
}

/**
 * 获取所有posts文章
 */
export async function getBlogData() {
    const blogEntries = await getCollection(BlogCollectionName)
    return blogEntries
}

/**
 * 获取所有posts文章，并根据修改时间与创建时间排序
 */
export async function getBlogDataSortByTime() {
    const blogEntries = await getBlogData()
    const getPubTimestamp = (blog: any) => {
        let pubTimestamp = 0
        if (blog.data.pubDate) {
            pubTimestamp = new Date(blog.data.pubDate).valueOf()
        }
        return pubTimestamp
    }
    const getUpdatedTimestamp = (blog: any) => {
        let updatedTimestamp = 0
        if (blog.data.updatedDate) {
            updatedTimestamp = new Date(blog.data.updatedDate).valueOf()
        }
        return updatedTimestamp
    }
    return blogEntries.sort((a, b) => {
        if (!b.data || !a.data) {
            return 0
        }
        if (getUpdatedTimestamp(b) && getUpdatedTimestamp(a)) {
            return getUpdatedTimestamp(b) - getUpdatedTimestamp(a);
        }
        if (getPubTimestamp(b) && getPubTimestamp(a)) {
            return getPubTimestamp(b) - getPubTimestamp(a);
        } else {
            return -1;
        }
    })
}

/**
 * 获取posts文章个数
 */
export async function getBlogCount() {
    const blogEntries = await getBlogData()
    return blogEntries.length
}

/**
 * 获取life所有文章
 */
export async function getLifeData() {
    const data = await getCollection(LifeCollectionName)
    return data
}

/**
 * 获取life文章，并根据修改时间与创建时间排序
 */
export async function getLifeDataSortByTime() {
    const lifeEntries = await getLifeData()
    const getPubTimestamp = (blog: any) => {
        let pubTimestamp = 0
        if (blog.data.pubDate) {
            pubTimestamp = new Date(blog.data.pubDate).valueOf()
        }
        return pubTimestamp
    }
    const getUpdatedTimestamp = (blog: any) => {
        let updatedTimestamp = 0
        if (blog.data.updatedDate) {
            updatedTimestamp = new Date(blog.data.updatedDate).valueOf()
        }
        return updatedTimestamp
    }
    return lifeEntries.sort((a, b) => {
        if (!b.data || !a.data) {
            return 0
        }
        if (getUpdatedTimestamp(b) && getUpdatedTimestamp(a)) {
            return getUpdatedTimestamp(b) - getUpdatedTimestamp(a);
        }
        if (getPubTimestamp(b) && getPubTimestamp(a)) {
            return getPubTimestamp(b) - getPubTimestamp(a);
        } else {
            return -1;
        }
    })
}

/**
 * 获取life文章个数
 */
export async function getLiftCount() {
    const data = await getLifeData()
    return data.length
}

/**
 * 获取posts文章中所有分类
 */
export async function getCategoryData() {
    const allPosts = await getBlogData()
    const categories = [
        ...new Set(allPosts.map((post) => post.data.category).flat()),
    ]
    return categories
}

/**
 * 获取posts文章中所有分类的个数
 */
export async function getCategoryCount() {
    const data = await getCategoryData()
    return data.length
}

/**
 * 获取posts文章中所有标签
 */
export async function getTagsData() {
    const allPosts = await getBlogData()
    const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())]
    return tags
}

/**
 * 获取posts文章中所有标签的个数
 */
export async function getTagsCount() {
    const data = await getTagsData()
    return data.length
}
