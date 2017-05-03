import React from 'react';
import Ajax from '../../utils/Ajax';
import {connect} from 'react-redux';
import BaseMsg from '../../components/userInput/BaseMsg';
import HealthMsg from '../../components/userInput/HealthMsg';
import BodyMsg from '../../components/userInput/BodyMsg';
import {setUserData, setPrompt} from '../../actions/action';
import {transBloodName, transBloodNum} from '../../utils/getRelation';

require('./prefect.scss');

/**
 * 完善个人信息
 */
class Prefect extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userMsg: props.userData || {}
        }

    }
    setValue(label, val, msg){

        this.state.userMsg[label] = val;

        // 需要随时更新
        if (label == 'height' || label == 'weight' || label== 'sex' || label == 'blood' || label == 'birthday') {
            this.setState(this.state);
        }
    }
    
    render(){
        let userMsg = this.state.userMsg,
            {userData} = this.props,
            listData = [
                {
                    tit: '真实姓名',
                    englishTit: 'Real name',
                    type: 'text',
                    name: 'realName',
                    placeholder: '请输入真实姓名',
                    isRequired: true
                },
                {
                    tit: '手机号码',
                    englishTit: 'Phone number',
                    type: 'tel',
                    name: 'mobile',
                    placeholder: '请输入手机号码',
                    isRequired: false
                },
                {
                    tit: '身份证号',
                    englishTit: 'ID number',
                    type: 'tel',
                    name: 'cardCode',
                    placeholder: '请输入身份证号码',
                    isRequired: false
                }
            ],
            disabled =  (userData.sex == 0 || userData.sex == 1) ? 'disabled' : true;


        return(
            <div className="prefect">
                <section className="user-show display-box content-box-p20">
                    <div className="user-photo">
                        <img src={userMsg.headImgUrl} />
                    </div>
                    <div className="user-msg">
                        <h2 className="fs-16 c-white">{userMsg.nickName}</h2>
                        <p className="fs-14 c-white">ID: {userMsg.memberCode}</p>
                    </div>
                </section>
                <p style={{lineHeight: '.2rem', fontSize: '.1rem', textAlign: 'center'}}>为保证报告的准确性, 请您准确、完整填写; <b className="c-red"> * </b>为必填项</p>

                <BaseMsg data={userMsg} listData={listData} setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                <HealthMsg disabled={disabled} data={userMsg} setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                <BodyMsg data={userMsg} setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                <section className="prefect-btn--sub">
                    <button className="icon" onClick={() => this.subFN()}>提交</button>
                </section>

            </div>
        )
    }
    subFN(){
        let ajax = new Ajax(this.props),
            {dispatch, location} = this.props,
            userMsg = this.state.userMsg;

        if (!userMsg.realName) {
            dispatch(setPrompt({isShow: true, msg: '真实姓名不能为空'}));
            return;
        } else if (userMsg.sex != 1 && userMsg.sex != 0) {
            dispatch(setPrompt({isShow: true, msg: '性别不能为空'}));
            return;
        }

        // 血型转换为数字标识
        if (userMsg.blood)  userMsg.blood = transBloodNum(userMsg.blood);

        ajax.post({
            url: '/userController/memberEdit',
            sendData: {
                mobile: userMsg.mobile,
                realName: userMsg.realName,
                cardCode: userMsg.cardCode,
                sex: userMsg.sex,
                birthday: userMsg.birthday,
                blood: userMsg.blood,
                illHistory: userMsg.illHistory,
                height: parseFloat(userMsg.height) || 0,
                weight: parseFloat(userMsg.weight) || 0
            },
            callback: (res) => {
                let backUrl = location.query.backurl;

                // 返回之前的页面
                if (backUrl) {

                    this.context.router.push(backUrl.substring(1));
                } else {

                    // 跳转到用户中心
                    this.context.router.push('/usercenter');
                }


            }
        })


    }
}

Prefect.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const init = (state) => {

    return {
        userData: state.userData
    }
}
export default connect(init)(Prefect);