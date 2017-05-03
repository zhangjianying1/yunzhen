import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Ajax from '../../utils/Ajax';
import {setAlert, setPrompt, setUserData} from '../../actions/action';
import PickOpation from '../../components/picker/PickOpation';
import Radio from '../../components/input/Radio';
import PopupUpload from '../../components/dialog/PopupUpload';
import {getRelationNum, getRelationName} from '../../utils/getRelation';
import Screening from './Screening';


/**
 * 筛查肿瘤 默认是本用户
 */
class TumourScreening extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            diagnosisObj: {},
            imgData: {},
            isShow: false,
            label: ''
        }

        this.ajax = new Ajax(this.props);
    }

    render(){
        let diagnosisObj = this.state.diagnosisObj;

        return(
           <Screening {...this.props} name="tumourscreening" setValue={(label, val) => this.setValue(label, val)}>

                <div className="upload-pic">
                    <div >
                        <h3><em className="c-red">*</em>右耳</h3>
                        <div className="show-pic icon-right-ear" onClick={() => this.showPopup('rightEarImg')}>
                            {
                                this.state.imgData.rightEarImg ? <img src={this.state.imgData.rightEarImg} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.rightEarImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('rightEarImg')}>删除</i>
                    </div>
                    <div >
                        <h3><em className="c-red">*</em>左耳</h3>
                        <div className="show-pic icon-left-ear" onClick={() => this.showPopup('leftEarImg')}>
                            {
                                this.state.imgData.leftEarImg ? <img src={this.state.imgData.leftEarImg} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.leftEarImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('leftEarImg')}>删除</i>
                    </div>

                </div>
               <div className="diagnosis-btn--sub mt--10">
                   <dl className="prompt">
                       <dt>注:</dt>
                       <dd>
                           为了更准确的诊断,请上传能清晰识别的原图照片
                           <p><em className="c-red important-prompt">*</em>标记的项目为必填项</p>
                       </dd>
                   </dl>

                   <button onClick={() => this.subFN()} className="btn btn">提交</button>

               </div>
               <PopupUpload isShow={this.state.isShow} preventImg={(val) => this.preventImg(val)} uploadImg={(val) => this.uploadImg(val)} closeHandle={() => this.showPopup()} />
            </Screening>
        )
    }
    // 删除图片
    delHandle(label){
        // 删除图片
        this.state.imgData[label] = '';

        // 删除图片的serverid
        this.state.diagnosisObj[label] =  '';

        this.setState(this.state);
    }

    // 上传图片
    uploadImg(val){

        this.state.diagnosisObj[this.state.label] = val;

    }
    // 预览图片
    preventImg(val){
        this.state.imgData[this.state.label] = val;
        this.setState(this.state);
    }
    // 获取子组件的数据
    setValue(label, val){

        if (typeof label != 'string') {
            val = label;
            label = 'diagnosisObj';
            // 更新组件的信息
            this.state[label] = val;
            this.state.imgData = {};
        } else {
            this.state.diagnosisObj[label] = val;
        }

        this.setState(this.state)
    }
    // 显示上传图片弹层
    showPopup(val){

        this.state.isShow = !this.state.isShow;

        if (val) {
            this.state.label = val;
        }
        this.setState(this.state);
    }
    subFN(){
        let {diagnosisObj} = this.state,
            {dispatch, userData} = this.props;


        if (!diagnosisObj.rightEarImg) {
            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">右耳</b>照片'}))
        } else if (!diagnosisObj.leftEarImg) {
            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">左耳</b>照片'}))
        } else {
            this.ajax.post({
                url: '/userController/tumourDiagnosis',
                sendData: {
                    familyCode: diagnosisObj.familyCode,
                    rightEarImg: diagnosisObj.rightEarImg,
                    leftEarImg: diagnosisObj.leftEarImg,
                    height: parseFloat(diagnosisObj.height),
                    weight: parseFloat(diagnosisObj.weight)
                },
                callback: () => {

                    dispatch(setAlert({
                        msg: '您已经成功提交筛查申请,<br/>请到 <a style="display: inline-block" class="c-red" href="' +
                            (diagnosisObj.familyRelation == 0 ? '#/usercenter' : '#/familys') + '">' + (diagnosisObj.familyRelation == 0 ? '个人中心' : '家庭中心') + '</a> 查看诊断结果',
                        isShow: true,
                        fn: () => {
                            this.context.router.push(diagnosisObj.familyRelation == 0 ? '/usercenter' : '/familys');
                        }
                    }))

                }
            })
        }

    }
}
TumourScreening.contextTypes = {
    router: React.PropTypes.object.isRequired
};
let init = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(init)(TumourScreening);