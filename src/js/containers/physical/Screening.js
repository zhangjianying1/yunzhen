import React from 'react';
import {Link} from 'react-router';
import Ajax from '../../utils/Ajax';
import PickOpation from '../../components/picker/PickOpation';
import Radio from '../../components/input/Radio';
import PopupUpload from '../../components/dialog/PopupUpload';
import {getRelationNum, getRelationName} from '../../utils/getRelation';
import PickTall from '../../components/picker/PickTall';
import PickWeight from '../../components/picker/PickWeight';
import {extend} from '../../utils/object';
import {setFamilyData} from '../../actions/action';
require('./diagnosis.scss');

/**
 * 筛查
 */
class Screening extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            diagnosisObj: {},
            familyData: [],
            objectArray: [],
            object: '请选择'
        }

        this.ajax = new Ajax(this.props);
    }
    // name 查询条件, 如果有就按照这个查询
    componentWillMount(){

        let {params, userData, dispatch} = this.props,
            familyCode = params && params.id;

        // 判断用户是否已经完善过信息(判断用户真实姓名和性别)(用户要添加家人必须要完成自己的个人资料,所以不考虑家人进入筛查页的时候)
        //if (!userData.realName || (userData.sex != 0 && userData.sex != 1)) {
        //
        //    this.context.router.push({pathname: '/prefect',  query: {backurl: document.location.hash}})
        //    return;
        //}


        // 是用户自己检测(用户自己默认的code是 "1")
        if (familyCode == 1 || !familyCode) familyCode = userData.familyCode;

        //获取家人信息
        this.ajax.post({
            url: '/userController/familyAll',
            callback: (res) => {

                this.state.familyData = res.familyList;
                this.setSelectOpations(this.state.familyData, userData.sex);
                this.queryUserData(this.state.familyData , familyCode);
            }
        })




    }
    setSelectOpations(familyData, gender){
        familyData.map((family, index) => {

            this.state.objectArray[index] = getRelationName(gender, family.familyRelation) + ' ' + family.realName;
        })
        this.setState({
            objectArray: this.state.objectArray
        })

    }
    queryUserData(familyData, familyCode){

        let {userData} = this.props;

        familyData.forEach((family) => {

            if (family.familyCode == familyCode || family.realName == familyCode) {


                this.setState({
                    diagnosisObj: family,
                    object: getRelationName(userData.sex, family.familyRelation) + ' ' + family.realName
                })

                // 更新父组件的userData
                this.props.setValue(family);
                return;
            }
        })
    }

    render(){
        let diagnosisObj = this.state.diagnosisObj,
            {userData} = this.props;

        return(
            <div className="bg-2e2735">

                <div className="diagnosis-object">
                    <img src="./images/icon-photo.png" />
                    <div className="flex-1" >
                        <label>诊断对象</label>
                        <PickOpation
                            val={this.state.object}
                            title="选择家人"
                            data={[this.state.objectArray]}
                            setValue={(val) => this.changeHandle(val)}
                            >
                            <div className="c-select">
                                <b className="c-select-tit">{this.state.object}</b>
                                <i className="c-select-dorp"></i>
                            </div>
                        </PickOpation>
                    </div>
                </div>

                <div className="information bg-26202c content-box-p20 mt15">
                    <div className="infor-name">
                        <h3><em className="fs-18">个人资料</em><em className="ml-10 font-english">Personal Info</em></h3>
                        <Link className="icon icon-editor" to={diagnosisObj.familyRelation > 0 ? `editoruser/${diagnosisObj.familyCode}/${userData.sex}` : '/prefect'}
                              query={{backurl: '/' + this.props.name + '/' + diagnosisObj.familyCode}}>修改</Link>
                    </div>

                    <div>
                        <div className="display-box">
                            <div className="infor-box">
                                <label>姓名</label>
                                <div>{diagnosisObj.realName}</div>
                            </div>
                            <div className="infor-box">
                                <label>性别</label>
                                <div>{diagnosisObj.sex == 0 ? '男' : diagnosisObj.sex == 1 ? '女' : ''}</div>

                            </div>
                        </div>
                        <div className="display-box">
                            <div className="infor-box">
                                <label>年龄</label>
                                <div>{diagnosisObj.age}</div>
                            </div>
                            <div className="infor-box">
                                <label>血型</label>
                                <div>{diagnosisObj.blood == 0 ? 'A型' : diagnosisObj.blood == 1 ? '  B型' : diagnosisObj.blood == 2 ? 'AB型' : diagnosisObj.blood == 3 ? 'O型' : ''}</div>
                            </div>
                        </div>
                        <div className="display-box">
                            <div className="infor-box">
                                <label>过往病史</label>
                                <div>{diagnosisObj.illHistory}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="information bg-26202c content-box-p20 mt15">
                    <div className="infor-name">
                        <h3><em className="fs-18">身高 & 体重</em><em className="ml-10 font-english">Height & Weight</em></h3>
                    </div>
                    <div className="input-body">
                        <PickTall val={diagnosisObj.height}
                                  setValue={(val) => this.setValue('height', val)} />
                        <PickWeight val={diagnosisObj.weight}
                                    setValue={(val) => this.setValue('weight', val)} />
                    </div>

                </div>
                <div className="information bg-26202c content-box-p20 mt15">
                    <div className="infor-name">
                        <h3><em className="fs-18">图片上传</em><em className="ml-10 font-english">Picture upload</em></h3>
                    </div>

                    {this.props.children}


                </div>

            </div>
        )
    }
    changeHandle(val) {
        let params = [0, val];

        if (val.indexOf(' ') > -1) {
            params = val.split(' ');
        }

        this.queryUserData(this.state.familyData, params[1])
    }
    setValue(label, val){

        this.state.diagnosisObj[label] = val;
        this.setState(this.state);


        // 更新父组件的userData
        this.props.setValue(label, val);


    }


}
Screening.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Screening;