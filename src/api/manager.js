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
