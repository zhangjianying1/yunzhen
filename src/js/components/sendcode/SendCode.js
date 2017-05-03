import React from 'react';
import {post} from '../../utils/Ajax';
let count = 10;
class SendCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            btnT: '发送验证码'
        }
    }
    sendCode(){


            // 手机号码是不是正确
            let mobile = this.props.verificationPhone();
            if (mobile != false && this.state.btnT == '发送验证码') {
                let {dispatch}  = this.props;
                this.setState({
                    btnT: '发送中...'
                })
                post({
                    url: '/',
                    sendData: {
                        mobile: mobile
                    },
                    callback: () => {
                        this.downCount();
                    }
                })
            }

    }
    // 倒计时
    downCount(){
        this.setState({
            btnT: count
        })
        setTimeout(() => {
            this.setState({
                btnT: --count
            })

            // 倒计时结束
            if (this.state.btnT == 0) {
                this.setState({
                    btnT: '发送验证码'
                })
                count = 10;
            } else {
                this.downCount();
            }
        }, 1000)
    }
    render(){
        return(<span className={this.state.btnT == '发送验证码' ? 'send-btn' : 'send-btn disabled'} onClick={() => this.sendCode()}>{this.state.btnT}</span>)
    }
}

export default SendCode;