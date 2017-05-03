export let getBonusNumber = function(bonusNumber){
    // 如果有#(有蓝色球)
    let obj = {};

    if (bonusNumber && bonusNumber.indexOf('#') > -1) {
        let arr = bonusNumber.split('#');
        obj.redball = arr[0].split(',');
        obj.blueball = arr[1].split(',')
    } else {
        obj.redball = bonusNumber.split(',');
    }
    return obj;
}
