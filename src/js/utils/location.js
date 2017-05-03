export let search = function(){
    let url = location.href;
    let searchStr = url.indexOf('?') > -1 && url.substring(url.indexOf('?') + 1);
console.log(searchStr)
    let obj = {};
    searchStr.split('&').forEach(function(val){
        let index = val.indexOf('=');
        if (index > -1) {
            obj[val.substring(0, index)] = val.substring(index+1);
        }
    })
    return obj;
}