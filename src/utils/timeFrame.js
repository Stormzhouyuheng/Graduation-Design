//时间格式

//年月日时分秒格式化

/**
 * index === 0 以 '-' 格式化年月日 , ':' 格式化时分秒
 * index === 1 以 '年月日时分秒' 分割时间
 * index === 2 在选择的日期加一天，并设时间为早上八点（日均参数格式化）
 * index === 3 在选择的该月的11号，并设时间为早上八点（旬均-上旬参数格式化）
 * index === 4 在选择的该月的21号，并设时间为早上八点（旬均-中旬参数格式化）
 * index === 5 在选择的下个月的1号，并设时间为早上八点（旬均-下旬参数格式化）
 * index === 6 在选择的该月早上八点
 * index === 7 在选择的该月的1号，并设时间为早上八点
 * index === 8 在选择的该日期减一年
 * index === 9 在选择的该日期加一年
 * index === 10 把该日期格式化为（yyyy-MM-dd HH:mm）
 * index === 11 把该日期格式化为（yyyy-MM-dd 08:mm）
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function timeFrameFormat(time, index) {
    if (time == null || time == "") return "";
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    if (index === 0) {
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    } else if (index === 1) {
        return year + '年' + month + '月' + day + '日 ' + hours + '时' + minutes + '分' + seconds + '秒'
    } else if (index === 2) {
        day = date.getDate() + 1 < 9 ? '0' + (date.getDate() + 1) : date.getDate() + 1
        return year + '-' + month + '-' + day + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 3) {
        return year + '-' + month + '-' + '11' + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 4) {
        return year + '-' + month + '-' + '21' + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 5) {

        month = date.getMonth() + 2 < 8 ? '0' + (date.getMonth() + 2) : date.getMonth() + 2
        if (month > 12) {
            let monthDay = month - 12
            month = monthDay
            year++
        }
        // month = month > 12 ? month += (month - 12) : month
        return year + '-' + month + '-' + '01' + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 6) {
        return year + '-' + month + '-' + day + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 7) {
        return year + '-' + month + '-' + '01' + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 8) {
        year--
        return year + '-' + month + '-' + day
    } else if (index === 9) {
        year++
        return year + '-' + month + '-' + day
    } else if (index === 10) {

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes

    } else if (index === 11) {

        return year + '-' + month + '-' + day + ' ' + '08' + ':' + minutes

    } else if (index === 12) {

        return year + '-' + month + '-' + day + ' ' + hours

    } else if (index === 13) {

        return year + '-' + month + '-' + day - 1 + ' ' + '08' + ':' + '00' + ':' + '00'

    }
}

/**
 * 最近时间设置
 * index === 0 在选择的日期向前推3天
 * index === 1 在选择的日期向前推一周（7天）
 * index === 2 在选择的日期向前推一个月（30天）
 * index === 3 在选择的日期向前推三个月（30*3天）
 * index === 4 在选择的日期向前推一天
 * index === 5 在选择的日期向后推一天
 * index === 6 在选择的日期向前推15天
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function recentlyTime(time, index) {
    let date = new Date(time)
    if (index === 0) {
        return date.getTime() - 3600 * 1000 * 24 * 3
    } else if (index === 1) {
        return date.getTime() - 3600 * 1000 * 24 * 7
    } else if (index === 2) {
        return date.getTime() - 3600 * 1000 * 24 * 30
    } else if (index === 3) {
        return date.getTime() - 3600 * 1000 * 24 * 90
    } else if (index === 4) {
        // console.log(date.getTime() - 3600 * 1000 * 24);
        return date.getTime() - 3600 * 1000 * 24

    } else if (index === 5) {
        return date.getTime() + 3600 * 1000 * 24
    } else if (index === 6) {
        return date.getTime() - 3600 * 1000 * 24 * 15
    } else if (index === 7) {
        return date.getTime() - 3600 * 1000 * 24 * 20
    }
}

/**
 * 最近时间格式化
 * index === 0 设置为选择的日期的08点（整点）
 * index === 1 设置为选择的日期的23点（整点）
 * index === 2 设置为选择的日期时分
 * index === 3 设置为选择的时分
 * index === 4 设置为选择的日期的08点（整点）
 * index === 5 设置为选择的日期的23点（整点）
 * index === 6 设置为选择的日期年月日
 * index === 7 设置为选择的日期该年的1月1号
 * index === 8 设置为选择的日期的年月日时分秒
 * index === 9 设置为选择的日期的年月日0时0分0秒
 * index === 10 设置为选择的日期的年月
 * index === 11 设置为选择的日期的该年1月
 * index === 12 设置为选择的日期的该年
 * index === 13 设置为选择的日期的该月
 * index === 14 设置为选择的日期格式化为 (yyyy年MM月dd日HH时)
 * index === 15 设置为选择的日期格式化为 (yyyyMMdd)
 * index === 16 设置为选择的日期格式化为 (MM-dd HH:mm:ss)
 * index === 18 设置为选择的日期格式化为 (yyyy/MM/dd HH:mm)
 * index === 19 设置为前一天的0点
 * index === 20 设置为前一天
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function recentlyTimeFormat(time, index) {
    var date = new Date(time)

    if (!isValidDate(date)) {

      return time
    }

    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    if (index === 0) {
        return year + '-' + month + '-' + day + ' ' + '08' + ':' + '00' + ':' + '00'
    } else if (index === 1) {
        return year + '-' + month + '-' + day + ' ' + '23' + ':' + '00' + ':' + '00'
    } else if (index === 2) {

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes

    } else if (index === 3) {

        return hours + ':' + minutes

    } else if (index === 4) {

        return year + '-' + month + '-' + day + ' ' + '08' + ':' + '00' + ':' + '00'

    } else if (index === 5) {

        return year + '-' + month + '-' + day + ' ' + '23' + ':' + '00' + ':' + '00'

    } else if (index === 6) {

        return year + '-' + month + '-' + day

    } else if (index === 7) {

        return year + '-' + '01' + '-' + '01'

    } else if (index === 8) {

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

    } else if (index === 9) {

        return year + '-' + month + '-' + day + ' ' + '00' + ':' + '00' + ':' + '00'

    } else if (index === 10) {

        return year + '-' + month

    } else if (index === 11) {

        return year + '-' + '01'

    } else if (index === 12) {

        return year

    } else if (index === 13) {

        return month

    } else if (index === 14) {
        return year + '年' + month + '月' + day + '日' + hours + '时'

    } else if (index === 15) {
        return year + '' + month + '' + day + ''
        // year + month + day

    } else if (index === 16) {
        return month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

    } else if (index === 17) {

        return year + '-' + (month - 1)

    } else if (index === 18) {

        return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes

    } else if (index === 19) {

        day = day - 1

        // console.log(year);
        // console.log(month);
        // // console.log(day);
        // var tDate = getFormatDate(new Date(), "yyyy/MM/dd");  //当前凌晨时间(string)
        // var tTime = new Date(tDate).getTime(); //当前凌晨时间(long)
        // var eTime = 24 * 60 * 60 * 1000;  //一天时间(long)
        // var yTime = tTime - eTime;  //昨天凌晨时间(long)

        // console.log(yTime);


        return year + '-' + month + '-' + day + ' ' + '00' + ':' + '00' + ':' + '00'

    }
}

/**
 * 旬均时间格式化
 * 当天为1-10号时，时间显示为上个月的下旬（即这个月的1号早上八点）
 * 当天为11-20号时，时间显示为这个月的上旬（即这个月的11号早上八点）
 * 当天为21-31号时，时间显示为这个月的中旬（即这个月的21号早上八点）
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function tenDayFormat(time) {
    if (time == null || time == "") return "";
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()

    if (day >= 1 && day <= 10) {
        // return timeFrameFormat(date,7)
        return [timeFrameFormat(date, 7), '0']
    } else if (day >= 11 && day <= 20) {
        // return timeFrameFormat(date,3)
        return [timeFrameFormat(date, 3), '1']
    } else if (day >= 21 && day <= 31) {
        // return timeFrameFormat(date,4)
        return [timeFrameFormat(date, 4), '2']
    }
}

/**
 * 把获取到的时间字符串转化格式
 * index === 0 ,把字符串转化成(月日)格式
 * index === 1 ,把字符串转化成(- -)的月日格式
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function timeStringChange(time, index) {
    if (time === undefined) return false
    let month = '';
    let day = '';
    if (index === 0) {
        month = time.substring(0, 2)
        day = time.substring(2, 4)
        return month + '月' + day + '日'
    } else if (index === 1) {
        month = time.substring(0, 2)
        day = time.substring(2, 4)
        return '-' + month + '-' + day
    }
}

/**
 * 对年份、月份+1-1时间处理
 * index === 0 向前推一个月，设时间为1号，格式化时间为年月日
 * index === 1 向后推一个月，设时间为1号，格式化时间为年月日
 * index === 2 向前推一年，设时间为1月1号，格式化时间为年月日
 * index === 3 向后推一年，设时间为1月1号，格式化时间为年月日
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function monthTimeFormat(time, index) {
    if (time == null || time == "") return "";
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth()

    if (index === 0) {
        if (month != '0') {
            month = month < 10 ? '0' + month : month
        } else {
            month = 12
            year--
        }
        return year + '-' + month + '-' + '01'
    } else if (index === 1) {
        // console.log(month);
        if (month == '11') {
            year++
            month = '01'
        } else {
            month = month + 2 < 10 ? '0' + (month + 2) : month + 2
        }
        return year + '-' + month + '-' + '01'
    } else if (index === 2) {
        year--
        return year + '-' + '01' + '-' + '01'
    } else if (index === 3) {
        year++
        return year + '-' + '01' + '-' + '01'
    }

}

/**
 * 对旬+1-1时间处理
 * 根据上下旬向前后推
 */
/**
 * @param {number} index 
 * @param {string} time
 * @returns {string}
 */
export function tendayTimeFormat(time, index) {
    if (time == null || time == "") return "";
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    var lastTime = ''

    if (index === 0) {
        if (day == '01') {
            lastTime = timeFrameFormat(monthTimeFormat(date, 0), 4)
        } else if (day == '11') {
            lastTime = timeFrameFormat(date, 7)
        } else if (day == '21') {
            lastTime = timeFrameFormat(date, 3)
        }
    } else if (index === 1) {
        if (day == '01') {
            lastTime = timeFrameFormat(date, 3)
        } else if (day == '11') {
            lastTime = timeFrameFormat(date, 4)
        } else if (day == '21') {
            lastTime = timeFrameFormat(monthTimeFormat(date, 1), 7)
        }
    }
    return lastTime
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(Y)、月(m)、日(d)、小时(H)、分(M)、秒(S) 可以用 1-2 个占位符，
 * 例子：
 * dateFormat('YYYY-mm-dd HH:MM:SS', new Date()) ==> 2020-01-01 08:00:00
 */
export const dateFormat = (fmt, date) => {
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    let ret
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt
}

export const saltTime = () => {

    let nowTime = +new Date()

    let flagTime = +new Date(dateFormat('YYYY-mm-dd 10:00:00', new Date()))

    if (flagTime > nowTime) {

        return dateFormat('YYYY-mm-dd 08:00', new Date(+new Date() - 86400000))

    } else {

        return dateFormat('YYYY-mm-dd 08:00', new Date())

    }

}

// 判断是否在某段时间内
export const isDuringDate = (beginDateStr, endDateStr) => {

    const curDate = +new Date(),
        beginDate = +new Date(beginDateStr),
        endDate = +new Date(endDateStr);
    if (curDate >= beginDate && curDate <= endDate) {
        return true;
    }
    return false;

}

// 判断返回是今天8点还是昨天8点
export const eightDefaultTime = () => {

    // 当天0点时间
    const zero = dateFormat('YYYY-mm-dd 00:00', new Date(+new Date()))

    // 当天10点时间
    const eight = dateFormat('YYYY-mm-dd 10:00', new Date(+new Date()))

    console.log(zero, eight);

    if (isDuringDate(zero, eight)) {

        return dateFormat('YYYY-mm-dd 08:00', new Date(+new Date() - (86400000)))

    } else {

        return dateFormat('YYYY-mm-dd 08:00', new Date(+new Date()))

    }

}

export function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
}

// 判断平闰年