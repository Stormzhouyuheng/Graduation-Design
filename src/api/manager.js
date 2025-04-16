import request from '@/utils/request'

// 管理员
export function userList(data) {
    return request({
        url: `/getRole/user`,
        method: 'post',
        data
    })
}

// /createone
export function createOne(data) {
    return request({
        url: `/getRole/createone`,
        method: 'post',
        data
    })
}

// /createMore
export function createMore(data) {
    return request({
        url: `/getRole/createMore`,
        method: 'post',
        data
    })
}

// /getRole/updateState
export function updateState(data) {
    return request({
        url: `/getRole/updateState`,
        method: 'post',
        data
    })
}

// /announce
export function announce() {
    return request({
        url: `/announce`,
        method: 'get'
    }) 
}

// /announce/create
export function createAnnounce(data) {
    return request({
        url: `/announce/create`,
        method: 'post',
        data
    }) 
}

// /announce/update
export function updateAnnounce(data) {
    return request({
        url: `/announce/update`,
        method: 'post',
        data
    }) 
}

// /announce/delete
export function deleteAnnounce(data) {
    return request({
        url: `/announce/delete`,
        method: 'post',
        data
    }) 
}
