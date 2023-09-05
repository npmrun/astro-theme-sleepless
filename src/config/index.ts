export const SiteInfo = {
    title: '失眠先生',
    description: '花间一壶酒，独酌无相亲。举杯邀明月，对影成三人。',
}

export const BlogCollectionName = 'posts'
export const getBlogSlugPrefix = (url: string) => {
    return '/posts/' + url
}

export const LifeCollectionName = 'life'
export const getLifeSlugPrefix = (url: string) => {
    return '/life/' + url
}

export const OpenViewTransitions = false

// 是否开启动画，写文章时可以关闭，避免刷新时执行动画
export const UseMotion = true //import.meta.env.PROD
