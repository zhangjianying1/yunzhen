import React from 'react';
import Ajax from '../../utils/Ajax';
require('./popupUpload.scss');



export default class PupupUpload extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            isShow: props
        }
    }
    componentWillMount(){

        let ajax = new Ajax(),
            timeStamp = parseInt(new Date().getTime() / 1000);

        ajax.post({
            url: '/userController/jsApiTicket',
            sendData: {
                timestamp: timeStamp,
                nonceStr: '1fMjPYFhElzTSuUP',
                url: location.href.slice(0, location.href.indexOf('#'))
            },
            callback: (res) => {

                wx.config({
                    debug: false,
                    appId: 'wxb85cd746038164e4',
                    timestamp: timeStamp,
                    nonceStr: '1fMjPYFhElzTSuUP',
                    signature: res.signature,
                    jsApiList: [
                        'checkJsApi',
                        'chooseImage',
                        'uploadImage'
                    ]
                });

            }
        })
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         */



    }
    closeHandle(){
       this.props.closeHandle();
    }
    changeHandle(event){
        this.setState({
            msg: JSON.stringify(event)
        })
    }
    uploadImg(val){
        this.props.uploadImg(val);
    }
    stopPropagation(e){
        e.stopPropagation();
    }
    camera(){
        this.setState({
            msg: JSON.stringify(wx)
        })
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                this.closeHandle();

                // 预览图片
                this.props.preventImg(localIds[0]);
                wx.uploadImage({
                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: (res) => {
                        this.uploadImg(res.serverId);

                    }
                });
            }
        })
    }
    chooseImage(){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                this.closeHandle();

                // 预览图片
                this.props.preventImg(localIds[0]);
                wx.uploadImage({
                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: (res) => {
                        this.uploadImg(res.serverId);

                    }
                });
            }
        });

    }
    render(){

            if (this.props.isShow ) {

                return (
                    <div className="upload-mask" onClick={() => this.closeHandle()}>
                        <dl className="upload-pupup" onClick={this.stopPropagation}>
                            <dt>请选择上传方式</dt>
                            <dd>
                                <div className="select-btn" onClick={() => this.camera()}>
                                    <i className="icon icon-select-camera"></i>
                                    拍照
                                </div>
                                <div className="select-btn" onClick={() => this.chooseImage()}>
                                    <i className="icon icon-select-image"></i>
                                    相册
                                </div>
                            </dd>
                        </dl>
                    </div>
                )
            } else {
                return null;
            }
    }
}