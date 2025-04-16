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

// /company/resumePosition
export function companyResumePosition(data) {
    return request({
        url: '/company/resumePosition',
        method: 'post',
        data
    }) 
}

// /company/stuPositions
export function companyStuPositions(data) {
    return request({
        url: '/company/stuPositions',
        method: 'post',
        data
    }) 
}

// /company/cancelResumePosition
export function companyCancelResumePosition(data) {
    return request({
        url: '/company/cancelResumePosition',
        method: 'post',
        data
    })  
}
