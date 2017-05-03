/**
 *
 * @param str
 * @param start
 * @param end
 * @returns {*}
 */
export function hideKey(str, start, end){

    if (!str) return;
    // 不符合隐藏
    if (str.length < (start + end)) {
        return str;
    }
    var re = new RegExp('(\\d{' + start + '})(\\d{' + end + '})', 'g'),
        star = '*******';

    str = str.replace(re, function($1, $2, $3){
        return  $2 + star.substring(0, end);
    })
    return str
}
