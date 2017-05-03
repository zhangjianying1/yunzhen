import superagent from 'superagent';
export let redirect = function() {
    superagent.get('/userController/weixin').then(function (res) {
        if (res.ok) {
            if (res.body.result) {

                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + res.body.result.appId + "&redirect_uri=http%3A%2F%2Fad.icaimi.com%2Fweixin%2F%23%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
            }
        }
    })
}