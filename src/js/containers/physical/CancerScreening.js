import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Ajax from '../../utils/Ajax';
import CheckBox from '../../components/input/CheckBox';
import PopupUpload from '../../components/dialog/PopupUpload';
import {setPrompt, setConfirm} from '../../actions/action';
import {extend} from '../../utils/object';
import Screening from './Screening';


/**
 * 筛查肿瘤 默认是本用户
 */
class CancerScreening extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            diagnosisObj: {
                faceChange: '否'
            },
            imgData: {},
            label: '',
            isShow: false
        }

        this.ajax = new Ajax(this.props);
    }


    render(){
        let diagnosisObj = this.state.diagnosisObj;

        return(
            <Screening {...this.props} name="cancerscreening" setValue={(label, val) => this.setValue(label, val)}>

                <div className="upload-pic">
                    <div>
                        <h3><em className="c-red">*</em>右耳</h3>
                        <div className="show-pic icon-right-ear" onClick={() => this.showPopup('rightEarImg')}>
                            {
                                this.state.imgData.rightEarImg ? <img src={this.state.imgData.rightEarImg} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.rightEarImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('rightEarImg')}>删除</i>
                    </div>
                    <div>
                        <h3>右耳右20度</h3>
                        <div className="show-pic icon-right-ear" onClick={() => this.showPopup('rightEarRight20Img')}>
                            {
                                this.state.imgData.rightEarRight20Img ? <img src={this.state.imgData.rightEarRight20Img} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.rightEarRight20Img ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('rightEarRight20Img')}>删除</i>
                    </div >
                    <div>
                        <h3>右耳左20度</h3>
                        <div className="show-pic icon-right-ear" onClick={() => this.showPopup('rightEarLeft20Img')}>
                            {
                                this.state.imgData.rightEarLeft20Img ? <img src={this.state.imgData.rightEarLeft20Img} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.rightEarLeft20Img ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('rightEarLeft20Img')}>删除</i>
                    </div>
                </div>
                <div className="upload-pic">
                    <div>
                        <h3><em className="c-red">*</em>左耳</h3>
                        <div className="show-pic icon-left-ear" onClick={() => this.showPopup('leftEarImg')}>
                            {
                                this.state.imgData.leftEarImg ? <img src={this.state.imgData.leftEarImg} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.leftEarImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('leftEarImg')}>删除</i>
                    </div>
                    <div>
                        <h3>左耳右20度</h3>
                        <div className="show-pic icon-left-ear"  onClick={() => this.showPopup('leftEarRight20Img')}>
                            {
                                this.state.imgData.leftEarRight20Img ? <img src={this.state.imgData.leftEarRight20Img} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.leftEarRight20Img ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('leftEarRight20Img')}>删除</i>
                    </div>
                    <div>
                        <h3>左耳左20度</h3>
                        <div className="show-pic icon-left-ear"  onClick={() => this.showPopup('leftEarLeft20Img')}>
                            {
                                this.state.imgData.leftEarLeft20Img ? <img src={this.state.imgData.leftEarLeft20Img} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.leftEarLeft20Img ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('leftEarLeft20Img')}>删除</i>
                    </div>
                </div>
                <div className="upload-pic">
                    <div >
                        <h3><em className="c-red">*</em>左手正面</h3>
                        <div className="show-pic icon-left-hand" onClick={() => this.showPopup('leftHandImg')}>
                            {
                                this.state.imgData.leftHandImg ? <img src={this.state.imgData.leftHandImg} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.leftHandImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('leftHandImg')}>删除</i>
                    </div>
                    <div >
                        <h3><em className="c-red">*</em>右手正面</h3>
                        <div className="show-pic icon-right-hand" onClick={() => this.showPopup('rightHandImg')}>
                            {
                                this.state.imgData.rightHandImg ? <img src={this.state.imgData.rightHandImg} /> : null
                            }
                        </div>
                        <i className={this.state.imgData.rightHandImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('rightHandImg')}>删除</i>
                    </div>

                </div>
                <div className="upload-pic">
                    <div >
                        <h3><em className="c-red">*</em>脸部正面</h3>
                        <div className="show-pic icon-face" onClick={() => this.showPopup('faceImg')}>
                            {
                                this.state.imgData.faceImg ? <img src={this.state.imgData.faceImg} /> : null
                            }

                        </div>
                        <i className={this.state.imgData.faceImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('faceImg')}>删除</i>
                    </div>
                    <div >
                        <h3><em className="c-red">*</em>舌苔</h3>
                        <div className="show-pic icon-fur" onClick={() => this.showPopup('furImg')}>
                            {
                                this.state.imgData.furImg ? <img src={this.state.imgData.furImg} /> : null
                            }

                        </div>
                        <i className={this.state.imgData.furImg ? 'icon icon-del-pic-active' : 'icon icon-del-pic-disabled'} onClick={() => this.delHandle('furImg')}>删除</i>
                    </div>


                </div>
                <div className="special">
                    <strong><em className="c-red important-prompt">*</em>脸部是否做过调整</strong>
                    <CheckBox
                        className="special-checkbox"
                        val={diagnosisObj.faceChange}
                        checkData={[{val: '否'}, '祛斑', '祛痘', '祛痣', '脸部整形']}
                        setValue={(val) => this.setValue('faceChange', val)} />
                </div>
                <div className="diagnosis-btn--sub">
                    <dl className="prompt">
                        <dt>注:</dt>
                        <dd>
                            为了更准确的诊断,请上传能清晰识别的原图照片
                            <p><em className="c-red important-prompt">*</em>标记的项目为必填项</p>
                        </dd>
                    </dl>

                    <button onClick={() => this.subFN()} className="btn btn">提交</button>


                </div>

                <PopupUpload isShow={this.state.isShow} preventImg={(val) => this.preventImg(val)} uploadImg={(val) => this.uploadImg(val)} closeHandle={() => this.showPopup()} label={this.state.label} />
            </Screening>
        )
    }
    // 删除图像
    delHandle(label){
        // 删除图像
        this.state.imgData[label] = '';

        // 删除图像的serverid
        this.state.diagnosisObj[label] =  '';

        this.setState(this.state);
    }

    // 上传图像
    uploadImg(val){
        this.state.diagnosisObj[this.state.label] = val;

    }
    // 预览图像
    preventImg(val){
        this.state.imgData[this.state.label] = val;
        this.setState(this.state);
    }
    // 获取子组件的数据
    setValue(label, val){

        if (typeof label != 'string') {
            val = label;
            label = 'diagnosisObj';
            extend(this.state[label], val);
            this.state.imgData = {};
        } else {
            this.state.diagnosisObj[label] = val;
        }
        this.setState(this.state);
    }
    // 显示上传图像弹层
    showPopup(val){
        this.state.isShow = !this.state.isShow;

        if (val) {
            this.state.label = val;
        }
        this.setState(this.state);
    }
    subFN(){
        let {diagnosisObj} = this.state,
            {dispatch} =  this.props;

        if (!diagnosisObj.rightEarImg) {

            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">右耳</b>照片'}));
        } else if (!diagnosisObj.leftEarImg){

            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">左耳</b>照片'}));

        } else if (!diagnosisObj.leftHandImg){

            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">左手正面</b>照片'}));

        } else if (!diagnosisObj.rightHandImg){

            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">右手正面</b>照片'}));

        } else if (!diagnosisObj.faceImg){

            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">脸部正面</b>照片'}));

        }  else if (!diagnosisObj.furImg){

            dispatch(setPrompt({isShow: true, msg: '您尚未提交<b class="c-red">舌苔</b>照片'}));

        } else if (!diagnosisObj.faceChange){

            dispatch(setPrompt({isShow: true, msg: '脸部做过调整项不能为空'}));

        } else {

            this.ajax.post({
                url: '/userController/cancerDiagnosis',
                sendData: {
                    familyCode: diagnosisObj.familyCode,
                    rightEarImg: diagnosisObj.rightEarImg,
                    rightEarRight20Img: diagnosisObj.rightEarRight20Img,
                    rightEarLeft20Img: diagnosisObj.rightEarLeft20Img,
                    leftEarImg: diagnosisObj.leftEarImg,
                    leftEarRight20Img: diagnosisObj.leftEarRight20Img,
                    leftEarLeft20Img: diagnosisObj.leftEarLeft20Img,
                    leftHandImg: diagnosisObj.leftHandImg,
                    rightHandImg: diagnosisObj.rightHandImg,
                    faceImg: diagnosisObj.faceImg,
                    furImg: diagnosisObj.furImg,
                    faceChange: diagnosisObj.faceChange,
                    height: parseFloat(diagnosisObj.height),
                    weight: parseFloat(diagnosisObj.weight)
                },
                callback: (res) => {

                    dispatch(setConfirm({
                        msg: '您已成功提交筛查申请，<br/>请到 <a class="c-red" style="display: inline-block" href="' +
                        (diagnosisObj.familyRelation == 0 ? '#/usercenter' : '#/familys') + '">' +
                        (diagnosisObj.familyRelation == 0 ? '个人中心' : '家庭中心') + '</a> 查看诊断结果',
                        strongTips: '<p class="c-red">为使您的健康诊断报告更加精确，<br/>强烈建议您参与完成一份自述症状的问卷!</p>',
                        bBtn: true,
                        leftBtnText: '下次再说',
                        rightBtnText: '立即参与',
                        cancelFN: () => {
                            this.context.router.push('/usercenter/')
                        },
                        confirmFN: () => {
                            this.context.router.push('/autodiagnosis/' + diagnosisObj.familyCode + '/' + res.recordCode + '/' + diagnosisObj.familyRelation);
                        }
                    }))
                }
            })


        }
        
    }
}
CancerScreening.contextTypes = {
    router: React.PropTypes.object.isRequired
};

let init = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(init)(CancerScreening);