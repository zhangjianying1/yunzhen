/**
 * 找到带有滚动条的父元素
 * @param obj {Object} 当前元素
 * @returns {Object} 返回的父元素没有的话就返回当前元素
 */
export let getParentScroll = function getParentScroll(obj) {

    while (obj = obj.parentNode) {

        if (obj.className == 'body') {
            return obj;
        }
    }
    obj = {
        scrollTop: 0
    }
    return obj;
}

// 懒加载图片
function loadingShowImg(img){
    let oImg = new Image(),
        imgSrc = img.getAttribute("id");

    oImg.src = imgSrc;


    oImg.onload = function(){
        img.src = imgSrc;
        img.className = img.className + " show";
        img.removeAttribute('id');
        oImg = null;
    }
}
export let preventLoadImg = function(imgs){
    let winH = document.body.clientHeight;

    for (let i = 0; i < imgs.length; i ++) {

        let imgT = imgs[i].getBoundingClientRect().top;

        // 进入可视区
        if (imgT < winH && imgs[i].getAttribute('id')) {
            loadingShowImg(imgs[i]);
        }
    }
}

