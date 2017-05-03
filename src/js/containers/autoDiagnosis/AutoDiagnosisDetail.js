import React from 'react';
import {connect} from 'react-redux';
import Ajax from '../../utils/Ajax';
import WholeBodyDiagnosisResult from '../../components/health/WholeBodyDiagnosisResult';
import BodyDetail from '../../components/health/BodyDetail';

import {getRelationName} from '../../utils/getRelation';


require('../usercenter/userCenter.scss');

/**
 * 自检健康记录详情
 */
class AutoDiagnosisDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            diagnosisData: {}
        }
    }
    componentWillMount(){

        let {wholeBodyDiagnosisData, params} = this.props,
            ajax = new Ajax(this.props);


        // 取缓存数据
        if (Array.isArray(wholeBodyDiagnosisData)) {

            wholeBodyDiagnosisData.forEach((diagnosis) => {

                if (diagnosis.questionCode == params.id) {
                    this.setState({
                        diagnosisData: diagnosis
                    })
                    return;
                }
            })

        }

        // 查找并更新数据
        ajax.post({
            url: '/userController/detailSelfDiagnosis',
            sendData: {
                questionCode: params.id
            },
            callback: (res) => {

                this.setState({
                    diagnosisData: res
                })
            }

        })

    }
    render(){
        let diagnosisData = this.state.diagnosisData;

        return(
            <div className="health-detail">

                <div>
                    {
                        (diagnosisData.familyCode != 0) ?
                            <div className="family-name">
                                <i className={diagnosisData.sex == 0 ? 'icon icon-family-man' : 'icon icon-family-woman'}></i>
                                {getRelationName(diagnosisData.sex, diagnosisData.familyRelation)} {diagnosisData.realName}
                            </div>
                            :
                            null
                    }


                    <div className="user-diagnosis">
                        <section className="health">

                            <BodyDetail healthData={diagnosisData}/>

                            <WholeBodyDiagnosisResult healthData={diagnosisData} />

                        </section>
                    </div>

                </div>
            </div>
        )
    }
}
let init = (state) => {
    return{
        wholeBodyDiagnosisData: state.wholeBodyDiagnosisData
    }
}
export default connect(init)(AutoDiagnosisDetail);