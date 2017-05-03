import React from 'react';
import {Link} from 'react-router';

require('./bodydetail.scss');
/**
 * 身体详情
 */
class BodyDetail extends React.Component{


    render(){
        let {healthData} = this.props;
        return(
            <div className="com-body-detail">
                <div className="header-tit display-box">
                    <div className="fs-18 c-897fe6">
                        健康状况
                    </div>
                    {
                        healthData.diagnosisTime ?
                            <time className="fs-12 c-ef4972">{healthData.diagnosisTime}</time>
                            :
                            <Link to={`/tumourscreening/${healthData.familyCode}`} className="c-red fs-14">立即体检</Link>

                    }
                </div>
                <div className="body-detail display-box" >
                    <div className="flex-1">
                        <p className="c-3C3F74 fs-18">{healthData.height ? healthData.height : '-'} </p>
                        <span className="c-646464">身高(cm)</span>
                    </div>
                    <div className="flex-1">
                        <p className="c-3C3F74 fs-18">{healthData.weight ? healthData.weight : '-'} </p>
                        <span className="c-646464">体重(kg)</span>
                    </div>
                    <div className="flex-1">
                        <p className="c-646464">BMI指数: {healthData.bmi} </p>
                        <span className="c-646464">类型: {
                            healthData.bmi ?
                                (healthData.bmi >= 28) ? <b className="c-red">肥胖</b> :
                                    (healthData.bmi < 28 && healthData.bmi >= 24) ? <b className="c-orange">偏胖</b> :
                                        (healthData.bmi < 24 && healthData.bmi > 18.5) ? <b className="c-green">正常</b> :
                                            (healthData.bmi < 18.5) ? <b className="c-red">偏瘦</b> : null
                                : '-'

                        }
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}


export default BodyDetail;