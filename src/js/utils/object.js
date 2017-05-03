export let isEmptyObject = function(obj) {
    if (isObject(obj)) {
        for (var i in obj) {
            return false;
        }
    }

    return true;
}
export let setToFixed = function(number){

    if (number == undefined) return;

    let result = '' + number,
        re = /(^[0-9]*$|^[0-9]*\.[0-9]{1,2})/;


    result = re.exec(result);
    return result && result[0];
}
export function isArray(array){
    return Object.prototype.toString.call(array) == '[object Array]';
}
export function isObject(obj){
    return Object.prototype.toString.call(obj) == '[object Object]'
}

export function extend(flag, obj1, obj2){

    // 如果只有一个参数并且这个参数是对象
    if (arguments.length == 1 && isObject(flag) ) return flag;

    if (flag !== true) {
        obj2 = obj1;
        obj1 = flag;
        flag = false;
    }


    for (let i in obj2) {

        // 深拷贝
        if (flag === true && !isEmptyObject(obj2[i])) {
            extend(true, obj1[i], obj2[i]);
        } else {
            obj1[i] = obj2[i];
        }
    }
}