/**
 *
 * @param str
 * @param start
 * @param end
 * @returns {*}
 */
let hideNumber = function(str, start, end){

    var re = start < 0 ? str.slice(start) : str.substr(start, end);
    var hideStr = start < 0 ? '**********'.slice(0, -start) :  '**********'.substr(0, end);
    if (re == hideStr) return str;

    var replaceRE = new RegExp(re , 'g');
    return str.replace(replaceRE, hideStr)
}

export default hideNumber;

