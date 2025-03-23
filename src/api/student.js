import request from '@/utils/request'

export function resumeUpload(data) {
    return request({
        url: `/resume/upload`,
        method: 'post',
        data
    })
}

export function resumeFind(data) {
    return request({
        url: `/resume/find`,
        method: 'post',
        data
    })
}

export function resumeDelete(data) {
    return request({
        url: `/resume/delete`,
        method: 'post',
        data
    })
}

export function taskStuFind(data) {
    return request({
        url: `/task/stuFind`,
        method: 'post',
        data
    })
}

export function taskStudelete(data) {
    return request({
        url: `/task/studelete`,
        method: 'post',
        data
    })
}

export function taskStuCommit(data) {
    return request({
        url: `/task/stuCommit`,
        method: 'post',
        data
    })
}

export function no(data) {
    return request({
        url: `/updateTeacher/no`,
        method: 'post',
        data
    })
}

// /getRole/user
export function getRoleUser(data) {
    return request({
        url: `/getRole/user`,
        method: 'post',
        data
    })
}

// /addNo
export function addNo(data) {
    return request({
        url: `/updateTeacher/addNo`,
        method: 'post',
        data
    })
}