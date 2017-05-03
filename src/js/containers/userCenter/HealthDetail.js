import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Ajax from '../../utils/Ajax';
import Health from '../../components/health/Health';
import UserMsg from '../../components/health/UserMsg';

import {setHealthData} from '../../actions/action';

/**
 * 健康记录详情
 */
class HealthDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            diagnosisData: {}
        }
    }
    componentWillMount(){

        let {diagnosisData, params, dispatch} = this.props,
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

                // 缓存详情信息
                dispatch(setHealthData(res));
            }

        })

    }

    render(){
        let diagnosisData = this.state.diagnosisData,
            {userData} = this.props;

        return(
            <div className="bg-2e2735" style={{paddingBottom: '.2rem'}}>
                <UserMsg userData={diagnosisData} sex={userData.sex} />
                <Health userData={diagnosisData} >
                    <Link to={diagnosisData.familyRelation == 0 ? `/myhealthrecord/${diagnosisData.familyCode}` : `/familyhealthrecord/${diagnosisData.familyCode}`} className="btn btn-60">查看更多报告</Link>
                </Health>
            </div>
        )
    }
}


let init = (state) => {
    return{
        diagnosisData: state.disagnosisData,
        userData: state.userData
    }
}
export default connect(init)(HealthDetail);