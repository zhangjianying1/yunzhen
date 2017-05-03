import React from 'react';
import {connect} from 'react-redux';
import Loading from '../components/loading/Loading';
import {setUserData} from '../actions/action';
import {search} from '../utils/location';
import Ajax from '../utils/Ajax';
import Prompt from '../components/dialog/Prompt';
import Error from '../components/dialog/Error';
import Alert from '../components/dialog/Alert';
import Confirm from '../components/dialog/Confirm';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: false
        }
    }
    componentWillMount(){

        let {dispatch, location} = this.props,
            ajax = new Ajax(),
            oSearch = search(),
            authCode = location.query.code || oSearch.code;

        // 需要用户信息的页面
        if (authCode) {

            // 注册用户,并返回该用户的相关信息
            ajax.post({
                url: '/userController/weixinLogin',
                sendData: {
                    authCode: authCode
                },
                callback: (res) => {

                    // authCode码 错误
                    if (res == '0999') {

                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb85cd746038164e4&redirect_uri=" + encodeURIComponent('http://' +
                                window.location.host + window.location.pathname + '#' + location.pathname) + "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
                        return;
                    } else {

                        dispatch(setUserData(res))
                        this.setState({
                            isLogin: true
                        })
                    }
                }
            })
        } else {
            this.setState({
                isLogin: true
            })
        }

    }
    render(){
        if (this.state.isLogin) {
            return (

                <div>
                    {this.props.children}
                    <Loading />
                    <Prompt />
                    <Error />
                    <Alert />
                    <Confirm />
                </div>
            )

        } else {
            return (<div style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', backgroundImage: 'url(./images/step.jpg)',  backgroundSize: 'contain'}}></div>)
        }


    }
};

export default connect()(App)