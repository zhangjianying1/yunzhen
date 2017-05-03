import React from 'react';
import {connect} from 'react-redux';
import Ajax from '../../utils/Ajax';
import Health from '../../components/health/Health';
import {getRelationName} from '../../utils/getRelation';
require('./diagnosisDetail.scss');
/**
 * 健康记录详情
 */
class DiagnosisDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            diagnosisData: {}
        }
    }
    componentWillMount(){

        let {diagnosisData, params} = this.props,
            ajax = new Ajax(this.props);


        // 取缓存数据
        if (Array.isArray(diagnosisData)) {

            diagnosisData.forEach((diagnosis) => {

                if (diagnosis.recordCode == params.id) {
                    this.setState({
                        diagnosisData: diagnosis
                    })
                    return;
                }
            })

        }

        // 查找并更新数据
        ajax.post({
            url: '/userController/detailDiagnosis',
            sendData: {
                recordCode: params.id
            },
            callback: (res) => {

                this.setState({
                    diagnosisData: res
                })
            }

        })

    }
    callback(res){

        this.setState({
            healthData: res
        })

    }
    render(){
        let diagnosisData = this.state.diagnosisData;

        return(
            <div className="health-detail">

                <div>
                    {
                        (diagnosisData.familyRelation != 0) ?
                            <div className="family-name">
                                <i className={diagnosisData.sex == 0 ? 'icon icon-family-man' : 'icon icon-family-woman'}></i>
                                {getRelationName(diagnosisData.sex, diagnosisData.familyRelation)} {diagnosisData.realName}
                            </div>
                            :
                            null
                    }


                    <Health userData={diagnosisData} notWholeBody={true}/>

                </div>
            </div>
        )
    }
}
let init = (state) => {
    return{
        diagnosisData: state.disagnosisData
    }
}
export default connect(init)(DiagnosisDetail);