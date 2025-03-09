import request from '@/utils/request'

export function getNewsList(data) {
    return request({
        url: '/news/xykx',
        method: 'post',
        data
    })
}

export function getNewsContent(params) {
    return request({
        url: '/news/content',
        method: 'get',
        params
    })
}