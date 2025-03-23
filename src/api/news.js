import request from '@/utils/request'

export function getNewsList(data, type) {
    return request({
        url: `/news/${type}`,
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

export function reCatchNews(type) {
    return request({
        url: `/news/${type}/latest`,
        method: 'get'
    })
}

export function companyList() {
    return request({
        url: `/company`,
        method: 'get'
    })
}