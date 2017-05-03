import React from 'react';
import {connect} from 'react-redux';
import Ajax from '../../utils/Ajax';
import UserInput from '../../components/userInput/UserInput';
import {setPrompt} from '../../actions/action';
import {transBloodNum, getGender} from '../../utils/getRelation';


/**
 * 添加用户
 */
class InputUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            familyData: {}
        }
        this.ajax = new Ajax(this.props);
    }
    setValue(label, val, msg){
        this.state.familyData[label] = val;
        // 需要随时更新
        if (label == 'height' || label == 'weight' || label== 'sex' || label == 'blood' || label == 'birthday') {
            this.setState(this.state);
        }
    }
    componentWillMount(){

        let {params} = this.props,
            familyRelation = params.familyRelation,
            myGender = params.gender;

        this.setState({
            familyData: {
                familyRelation: familyRelation,
                sex: getGender(myGender, familyRelation),
                myGender: myGender
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
    subFN(){
        let familyData = this.state.familyData,
            {params, dispatch} = this.props;

        if (!familyData.realName) {
            dispatch(setPrompt({msg: '真实姓名不能为空', isShow: true}));
            return;
        } else if (familyData.sex != 1 && familyData.sex != 0) {
            dispatch(setPrompt({msg: '真实姓名不能为空', isShow: true}));
            return;
        }

        this.ajax.post({
            url: '/userController/familyEdit',
            sendData: {
                familyRelation: params.familyRelation,
                mobile: familyData.mobile,
                realName: familyData.realName,
                sex: familyData.sex,
                birthday: familyData.birthday,
                blood: transBloodNum(familyData.blood),
                illHistory: familyData.illHistory,
                height: parseFloat(familyData.height) || 1,
                weight: parseFloat(familyData.weight) || 1
            },
            callback: (res) => {
                this.context.router.push('/carefamily');
            }
        })

    }
}
InputUser.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export default connect()(InputUser);