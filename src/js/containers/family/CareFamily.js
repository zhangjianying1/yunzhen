import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Ajax from '../../utils/Ajax';

import {setConfirm, setFamilyData} from '../../actions/action';
import {getRelationName} from '../../utils/getRelation';
import DorpDown from '../../components/dorpdown/DorpDown';
require('./careFamily.scss');
/**
 * 关心的家人
 */
class CareFamily extends React.Component{
    constructor(props){
        "use strict";
        super(props);
        this.state = {
            familyData: [],
            delId: ''
        }
        this.ajax = new Ajax(this.props)
    }
    componentWillMount(fn, context){
        let {dispatch} = this.props;

        this.ajax.post({
            url: '/userController/familyList',
            callback: (res) => {

                this.setState({
                    familyData: res.familyList
                })


                // 下拉刷新
                if (fn) fn(context);
                // 缓存数据
                dispatch(setFamilyData(res.familyList));
            }
        })
    }
    confirmHandle(id){

        const {dispatch} = this.props;
        dispatch(setConfirm({
            bBtn: true,
            msg: '确定要删除该家人吗?',
            confirmFN: this.deleteHandle.bind(this)
        }))

        this.state.delId = id;

    }
    deleteHandle(){

        this.ajax.post({
            url: '/userController/familyDel',
            sendData: {familyCode: this.state.delId},
            callback: (res) => {

                this.state.familyData.forEach((val, index) => {

                    if (val.familyCode == this.state.delId) {
                        this.state.familyData.splice(index, 1);
                        return;
                    }
                })
                this.setState(this.state);


            }
        })
    }
    followHandle(familyCode, status){
        let url = (status == 0 ? '/userController/familyFollow' : '/userController/familyCancelFollow');


        this.ajax.post({
            url: url,
            sendData: {familyCode: familyCode},
            callback: (res) => {
                this.state.familyData.map((val, index) => {

                    if (val.familyCode == familyCode) {
                        val.status = (status == 0 ? 1 : 0);
                    }
                })
                this.setState(this.state);
            }

        })
    }
    addFamily(e){

        let {userData} = this.props,
            goUrl = '/addfamily/' + userData.sex;

        if (!userData.realName || (userData.sex != 0 && userData.sex != 1) ) {
            goUrl = '/prefect';
        }

        this.context.router.push({
            pathname: goUrl,
            query: {
                backurl: window.location.hash
            }
        })
        e.preventDefault();
    }
    render(){
        let {userData} = this.props;

        return(
            <DorpDown
                title="个人中心"
                refreshFN={(fn, elem) => this.componentWillMount(fn, elem)}

                >
                <div className="care-family">
                    <div className="care-header">
                        <div className="icon icon-care">
                        </div>
                        <h2>我关心的家人</h2>
                        <i onClick={(e) => this.addFamily(e)} className="add-family">添加</i>
                    </div>
                    <div>

                        {
                            this.state.familyData.length == 0 ?
                                <p style={{lineHeight: '40px', textAlign: 'center'}}>你尚未添加您的家人数据</p>
                                :
                                this.state.familyData.map((val, index) => {

                                    return(

                                        <div key={index} className="family-information">
                                            <div className="infor-name">
                                                <h3>{getRelationName(userData.sex, val.familyRelation)}</h3>
                                                <div className="infor-control">
                                                    <button className="icon icon-del" onClick={() => this.confirmHandle(val.familyCode)}>删除</button>
                                                    <Link className="icon icon-editor" to={`editoruser/${val.familyCode}/${userData.sex}`}>修改</Link>
                                                    <i onClick={(familyCode, status) => this.followHandle(val.familyCode, val.status)} className={val.status == 0 ? 'icon icon-not-follow' : 'icon icon-follow '}></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="display-box">
                                                    <div className="infor-box">
                                                        <label>姓名</label>
                                                        <div>{val.realName}</div>
                                                    </div>
                                                    <div className="infor-box">
                                                        <label>性别</label>
                                                        <div>{val.sex == 0 ? '男' : val.sex == 1 ? '女' : ''}</div>

                                                    </div>
                                                </div>
                                                <div className="display-box">
                                                    <div className="infor-box">
                                                        <label>年龄</label>
                                                        <div>{val.age}</div>
                                                    </div>
                                                    <div className="infor-box">
                                                        <label>血型</label>
                                                        <div>{val.blood == 0 ? 'A型' : val.blood == 1 ? '  B型' : val.blood == 2 ? 'AB型' : val.blood == 3 ? 'O型' : ''}</div>
                                                    </div>
                                                </div>
                                                <div className="display-box">
                                                    <div className="infor-box">
                                                        <label>身高</label>
                                                        <div>{val.height}</div>
                                                    </div>
                                                    <div className="infor-box">
                                                        <label>体重</label>
                                                        <div>{val.weight}</div>
                                                    </div>
                                                </div>
                                                <div className="display-box">
                                                    <div className="infor-box">
                                                        <label>过往病史</label>
                                                        <div>{val.illHistory}</div>
                                                    </div>
                                                </div>
                                                <div className="go-detail">
                                                    {
                                                        val.diagnosisTime ?

                                                            <Link className="btn-bor-43" to={`/familyhealthdetail/${val.diagnosisRecordCode}`}>查看详细报告</Link>
                                                            :
                                                            <div className="btn-bor-43 disabled" >查看详细报告</div>

                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }


                    </div>

                </div>
            </DorpDown>
        )
    }
}

let init = (state) => {
    return {
        confirmData: state.confirmData,
        familyData: state.familyData,
        userData: state.userData
    }
}

CareFamily.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(init)(CareFamily);