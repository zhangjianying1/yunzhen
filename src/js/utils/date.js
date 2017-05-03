export let fullZero = (str) => {
    str = '' + str;

    if (str.length < 2) {
        return '0' + str;
    }
    return str;

}
export let setDate = (strTime, beforeTime) => {
    let oDate = new Date();

    let oParseDate = new Date();
    if (typeof strTime == 'string') {
        oParseDate.setFullYear(strTime.substring(0, 4))
        oParseDate.setMonth((strTime.substring(5, 7) - 1))
        oParseDate.setDate(strTime.substring(8, 10))
        oParseDate.setHours(strTime.substring(11, 13))
        oParseDate.setMinutes(strTime.substring(14, 16))
    }
    let toDay = oDate.getDate();
    let oParseDay = oParseDate.getDate();
    let result =  oParseDate.getHours() + ':' + fullZero(oParseDate.getSeconds());

    // 今天和昨天
    if (toDay == oParseDay) {

        // 小于一小时
        if(beforeTime && oDate.getHours() == oParseDate.getHours()) {
            result = oDate.getMinutes() - oParseDate.getMinutes();

            if (result < 5)
                return '刚刚 ';
            else if (result < 60)
                return  result + '分钟前';
        }
        return '今天 ' + result;
    } else if (toDay - oParseDay == 1) {
        return '昨天 ' + result;
    } else {

        return strTime;
    }


}

export let getArrDate = function(str) {

    let oDate = new Date();
    if (typeof str == 'string') {
        oDate.setFullYear(str.substring(0, 4))
        oDate.setMonth((str.substring(5, 7) -1))
        oDate.setDate(str.substring(8, 10))
        oDate.setHours(str.substring(11, 13))
        oDate.setMinutes(str.substring(14, 16))
    }

    return [oDate.getMonth() + 1, oDate.getDay()];

}