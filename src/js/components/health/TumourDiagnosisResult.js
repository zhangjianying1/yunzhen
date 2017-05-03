import React from 'react';
import {Link} from 'react-router';
import BodyDetail from '../../components/health/BodyDetail';
import ShowBody from './ShowBody';
require('./tumourDiagnosisResult.scss');
/**
 * 身体详情
 */
class TumourDiagnosisResult extends React.Component{


    render(){
        let healthData = this.props.healthData || {},
            oDisease = {};

        healthData.verdict = healthData.verdict ? healthData.verdict : healthData.diagnosisVerdict;

        (function(){
            
            let diseaseArr = (healthData.verdict && healthData.verdict.split(';')) || [healthData.verdict];


            Array.isArray(diseaseArr) && diseaseArr.forEach(function(dis){

                if (!dis) return;

                let segmentation = dis.indexOf(':'),
                    key = dis.substring(0, segmentation),
                    value = dis.substring(segmentation+1);

                oDisease[key] = value;
            })
        }());


        return(
        <section className="health">

            <BodyDetail healthData={healthData}/>

            <div className="diagnosis-detail">


                {
                    healthData.diagnosisStatus == 2 ?
                        <ShowBody sex={healthData.sex} oDisease={oDisease} />
                    :
                    <div className="diagnosis-nothing">
                        <i className="icon icon-diagnosis-nothing"></i>
                        <p className="quick-diagnosis">
                            {
                                healthData.diagnosisStatus == 4 ?
                                    <Link to={`/tumourscreening/${healthData.familyCode}`}>您提交是照片不满足筛查的要求，<br/>无法做出诊断<b className="c-897fe6">请重新提交</b></Link>
                                    :
                                    healthData.diagnosisTime
                                        ?
                                        <span>您最近的一次筛查申请尚未出结论<br/>请您耐心等待</span>
                                        :
                                        <Link to={`/tumourscreening/${healthData.familyCode}`}>您尚未提交过筛查报告，立刻去 <b className="c-897fe6">提交</b></Link>

                            }
                        </p>
                    </div>
                }
                <dl className="diagnosis-result">
                    <dt>肿瘤体质与癌症诊断报告</dt>
                    <dd>
                        <ul className="diagnosis-list">
                            <li className={oDisease['001'] > 0 ? 'active' : ''}>
                                <i className="icon tumour"></i>
                                <p>肿瘤体质</p>
                                <p className="font-english fs-12">Tumour constitution</p>
                                <div className="disease-result">
                                    <i className="icon-circal"></i>
                                    <p>
                                        {
                                            oDisease['001'] > 0 ? oDisease['001'] + ' 倍风险' :  healthData.verdict ? <b className="c-green">正常</b> : ''
                                        }
                                    </p>
                                </div>
                            </li>
                            <li className={oDisease['002'] > 0? 'active' : ''}>
                                <i className="icon liver"></i>
                                <p>肝癌</p>
                                <p className="font-english fs-12">Liver cancer</p>
                                <div className="disease-result">
                                    <i className="icon-circal"></i>
                                    <p>
                                        {
                                            oDisease['002'] > 0 ? oDisease['002'] + ' 倍风险' :  healthData.verdict ? <b className="c-green">正常</b> : ''
                                        }
                                    </p>
                                </div>
                            </li>
                            <li className={oDisease['003'] > 0 ? 'active' : ''}>
                                <i className="icon lungs"></i>
                                <p>肺癌</p>
                                <p className="font-english fs-12">Lung cancer</p>
                                <div className="disease-result">
                                    <i className="icon-circal"></i>
                                    <p>
                                        {
                                            oDisease['003'] > 0 ? oDisease['003'] + ' 倍风险' : healthData.verdict ? <b className="c-green">正常</b> : ''
                                        }
                                    </p>
                                </div>
                            </li>
                            <li className={oDisease['004'] > 0 ? 'active' : ''}>
                                <i className="icon stomach"></i>
                                <p>胃癌</p>
                                <p className="font-english fs-12">Gastric cancer</p>
                                <div className="disease-result">
                                    <i className="icon-circal"></i>
                                    <p className="c-737373">
                                        {
                                            oDisease['004'] > 0? oDisease['004'] + ' 倍风险' : healthData.verdict ? <b className="c-green">正常</b> : ''
                                        }
                                    </p>
                                </div>
                            </li>
                            {
                                healthData.sex != 0 ?
                                    <li className={oDisease['005'] > 0 ? 'active' : ''}>
                                        <i className="icon cervical"></i>
                                        <p>宫颈癌</p>
                                        <p className="font-english fs-12">Cervical cancer</p>
                                        <div className="disease-result">
                                            <i className="icon icon-circal"></i>
                                            <p>
                                                {
                                                    oDisease['005'] > 0? oDisease['005'] + ' 倍风险' : healthData.verdict ? <b className="c-green">正常</b> : ''
                                                }
                                            </p>
                                        </div>
                                    </li>
                                    :
                                    null
                            }


                            <li className={oDisease['006'] > 0 ? 'active' : ''}>
                                <i className="icon breast"></i>

                                <p>乳腺癌</p>

                                <p className="font-english fs-12">Breast cancer</p>

                                <div className="disease-result">
                                    <i className="icon-circal"></i>

                                    <p>
                                        {
                                            oDisease['006'] > 0 ? oDisease['006'] + ' 倍风险' : healthData.verdict ?
                                                <b className="c-green">正常</b> : ''
                                        }
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </dd>
                    <dd>
                        <div className="prompt-risk">
                            <div className="">注:</div>
                            <div>
                                <p>肿瘤体质与癌症诊断报告的结论分为5倍、10倍、20倍、30倍、50倍等5个风险等级,等级的数值越大,表示病情越严重</p>
                            </div>
                        </div>
                    </dd>
                </dl>
                {this.props.children}
            </div>

        </section>



        )
    }
}


export default TumourDiagnosisResult;