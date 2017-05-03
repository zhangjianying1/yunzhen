import React from 'react';
import {connect} from 'react-redux';
import Ajax from '../../utils/Ajax';
import {extend} from '../../utils/object';
import {setPrompt} from '../../actions/action';
import UserInput from '../../components/userInput/UserInput';
import {transBloodNum} from '../../utils/getRelation';

/**
 * 编辑用户信息
 */
class EditorUser extends React.Component{
    constructor(props){
        "use strict";
        super(props);
        this.state = {
            familyData: {}
        }
        this.ajax = new Ajax(this.props);
    }
    componentWillMount(){

        let tempData = {},
            {familyData, params} = this.props,
            familyCode = params.familyCode,
            gender = params.gender;

        // 遍历家庭成员列表(先显示部分有的数据在请求新的数据)
        Array.isArray(familyData) && familyData.map((family) => {

            // 如果是当前params 相对应的
            if (family.familyCode == familyCode) {
                tempData = family;
            }
        })

        // 如果获取到数据
        if (tempData.familyCode) {
            this.setState({
                familyData: tempData
            })
        }

        // ajax 取全部数据
        this.ajax.post({
            url: '/userController/familyQuery',
            sendData: {familyCode: familyCode},
            callback: (res) => {
                res.myGender = gender;
                this.setState({
                    familyData: res
                })
            }

        })


    }
    render(){
        return(
            <UserInput data={this.state.familyData} setValue={(label, val, msg) => this.setValue(label, val, msg)}>
                <section className="prefect-btn--sub">
                    <button className="icon" onClick={() => this.subFN()}>提交</button>
                    <h3 className="c-white mt2">提交</h3>
                </section>
            </UserInput>
        )
    }
    setValue(label, val, msg){
        this.state.familyData[label] = val;

        // 需要随时更新
        if (label == 'height' || label == 'weight' || label== 'sex' || label == 'blood' || label == 'birthday') {
            this.setState(this.state);
        }
    }
    subFN(){
        let familyData = this.state.familyData,
            {params, dispatch, location} = this.props;


        if (!familyData.realName) {
            dispatch(setPrompt({msg: '真实姓名不能为空', isShow: true}));
        } else {

            this.ajax.post({
                url: '/userController/familyEdit',
                sendData: {
                    familyCode: familyData.familyCode,
                    realName: familyData.realName,
                    sex: familyData.sex,
                    birthday: familyData.birthday,
                    blood: transBloodNum(familyData.blood),
                    illHistory: familyData.illHistory,
                    height: parseFloat(familyData.height) || 1,
                    weight: parseFloat(familyData.weight) || 1
                },
                callback: (data) => {

                    let backUrl = location.query.backurl;

                    // 返回之前的页面
                    if (backUrl) {
                        this.context.router.push(backUrl.substring(1));
                    } else {
                        this.context.router.push('/carefamily');
                    }
                }
            })
        }

    }
}
EditorUser.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const init = (state) => {
    return {
        familyData: state.familyData
    }
}
export default connect(init)(EditorUser);