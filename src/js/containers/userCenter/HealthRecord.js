import React from 'react';
import ReactDOM from 'react-dom';
import DorpDown from '../../components/dorpdown/DorpDown';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {setDiagnosisData} from '../../actions/action';
import {getRelationName} from '../../utils/getRelation';
require('./healthRecord.scss');

/**
 * 健康记录
 */
class HealthRecord extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            diagnosisList: [],
            relationName: '',
            activeLabel: 'diagnosisList'
        }
    }

    /**
     * 获取数据
     * @param data 返回的数据
     * @param falg  为真是追加数据, 假是刷新
     */
    getData(data, falg){

        let tempData = this.state.diagnosisList,
            result = data.diagnosisList,
            {dispatch} = this.props;


        if (falg) {
            tempData = tempData.concat(result);
        } else {
            tempData = result;
        }

        this.setState({
            diagnosisList: tempData
        });

        // 缓存记录
        dispatch(setDiagnosisData(tempData));

    }
    sliceTime(str){
        return str && str.substring(5, 10);
    }
    componentWillMount(){
        let {dispatch, healthData, params, userData} = this.props;

        //  要查询人不是用户本人
        if (userData.familyCode != params.id) {


                this.setState({
                    relationName: getRelationName(userData.sex, healthData.familyRelation) + ' ' + healthData.realName
                })


        } else {
            this.setState({
                relationName: userData.nickName
            })
        }

    }
    componentDidMount(){
        let user = ReactDOM.findDOMNode(this.refs.user);
        let record = ReactDOM.findDOMNode(this.refs.record);
        record.style.minHeight = (document.body.clientHeight - user.offsetHeight) + 'px';
    }
    render(){
        let {relationName, diagnosisList} = this.state,
            {params, userData, healthData} = this.props,
            getVerdict = function(verdict){
                let diseaseArr = (verdict && verdict.split(';')) || [verdict],
                    oDisease = {},
                    result = '';


                Array.isArray(diseaseArr) && diseaseArr.forEach(function(dis){

                    if (!dis) return;

                    let segmentation = dis.indexOf(':'),
                        key = dis.substring(0, segmentation),
                        value = dis.substring(segmentation+1);

                    oDisease[key] = value;
                })

                for (let i in oDisease) {


                    switch (i) {
                        case '001' :
                            result += '肿瘤体质:' + oDisease[i] + '倍风险; ';
                            break;
                        case '002':
                            result += '肝癌:' + oDisease[i] + '倍风险; ';
                            break;
                        case '003':
                            result += '肺癌:' + oDisease[i] + '倍风险; ';
                            break;
                        case '004':
                            result += '胃癌:' + oDisease[i] + '倍风险; ';
                            break;
                        case '005':
                            result += '宫颈癌:' + oDisease[i] + '倍风险; ';
                            break;
                        case '006':
                            result += '乳腺癌:' + oDisease[i] + '倍风险; ';
                            break;

                        // default
                    }
                }

                return result;

            }






        return(
            <DorpDown
                title="我的健康记录"
                sendData={{familyCode: params.id}} urls={{diagnosisList: '/userController/listDiagnosis'}}
                initFN={(data , flag) => this.getData(data , flag)}
                activeLabel={this.state.activeLabel}
                >
                <section className="health-user" ref="user">
                    <img src="./images/icon-photo.png" />
                    <p>
                        {relationName}
                    </p>
                </section>
                <section className="health-record" ref="record">
                    {
                        diagnosisList.map((val, index) => {
                            return(
                                <div key={index} className="health-record-box">
                                    <Link to={(relationName == userData.nickName) ? `/myhealthdetail/${val.recordCode}` : `/familyhealthdetail/${val.recordCode}`} className="icon-more react">
                                        <time className="c-999">{this.sliceTime(val.diagnosisTime)}</time>
                                        <div className="body-detail c-333">
                                            <strong>身高: {val.height}cm</strong>
                                            <strong className="ml-22">体重: {val.weight}kg</strong>
                                        </div>
                                        <div className="record-status">
                                            {(val.diagnosisStatus == 0 || val.diagnosisStatus == 1 || val.diagnosisStatus == 3) ? <div style={{paddingTop: '.12rem', paddingBottom: '.04rem'}}>诊断中</div> :  null}

                                            {val.diagnosisStatus == 4 ? <div>失败<br/>您提交的照片不满足筛查要求, 无法做出诊断</div> : null}
                                        </div>
                                        <p className="health-verdict">{getVerdict(val.verdict)}</p>

                                    </Link>
                                </div>
                            )
                        })
                    }
                </section>
            </DorpDown>
        )
    }
}

let init = (state) => {
    return {
        userData: state.userData,
        healthData: state.healthData
    }
}
export default connect(init)(HealthRecord);