import request from '@/utils/request'

export function commitTask(data) {
    return request({
        url: `/task/commit`,
        method: 'post',
        data
    })
}

export function taskTeaFind(data) {
    return request({
        url: `/task/teaFind`,
        method: 'post',
        data
    })
}

export function taskUpdate(data) {
    return request({
        url: `/task/update`,
        method: 'post',
        data
    })
}

export function taskDelete(data) {
    return request({
        url: `/task/delete`,
        method: 'post',
        data
    })
}

export function findAllStudent(data) {
    return request({
        url: `/updateTeacher/findAll`,
        method: 'post',
        data
    })
}

// /removeNo
export function removeNo(data) {
    return request({
        url: `/updateTeacher/removeNo`,
        method: 'post',
        data
    })
}
