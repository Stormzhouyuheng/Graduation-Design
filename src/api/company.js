import request from '@/utils/request'

export function companyOne(data) {
    return request({
        url: '/company/one',
        method: 'post',
        data
    })
}

// /company/positionTemp
export function companyPositionTemp(data) {
    return request({
        url: '/company/positionTemp',
        method: 'post',
        data
    })
}
