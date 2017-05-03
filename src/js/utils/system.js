export let system = function(){
    let sAgent = navigator.userAgent,
        ipRE = /iphone/i,
        androidRE = /android/i;
    if (ipRE.test(sAgent)) {
        return 'IPHONE';
    } else if (androidRE.test(sAgent)) {
        return 'ANDROID';
    } else {
        return 'IPAD';
    }
}