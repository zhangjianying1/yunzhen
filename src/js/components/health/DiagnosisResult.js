import React from 'react';
require('./diagnosisResult.scss');
/**
 * 自我诊断结果
 */
class DiagnosisResult extends React.Component{

    render(){
        let {healthData} = this.props;

        let showList = function(str){

            if (!str) return [];
            return str.split(';');

        }

        return (
        <ul className="autodiagnosis-list">



                <li className={!healthData.breathResult ? 'disabled' : null}>
                    <i className="icon icon-breath"></i>

                    <p className="system-name">呼吸系统<br/><b className="font-english fs-12">Respiratory system</b></p>
                    <div className="disease-result">
                        <div className="show-result">
                            {
                                showList(healthData.breathResult).map(function(val, index){

                                    if (!val) return null;
                                    return (<p key={index}>{val}</p>)
                                })
                            }
                        </div>
                    </div>
                </li>
                    <li className={!healthData.loopResult ? 'disabled' : null}>
                        <i className="icon icon-loop"></i>

                        <p className="system-name">循环系统<br/><b className="font-english fs-12">Circulatory
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.loopResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>
                    <li className={!healthData.digestResult ? 'disabled' : null}>
                        <i className="icon icon-digestive"></i>

                        <p className="system-name">消化系统<br/><b className="font-english fs-12">Digestive
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.digestResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>
                    <li className={!healthData.urinaryResult ? 'disabled' : null}>
                        <i className="icon icon-urinary"></i>

                        <p className="system-name">泌尿系统<br/><b className="font-english fs-12">Urinary
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.urinaryResult).map(function (val, index) {
                                        if (!al) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>

                    <li className={!healthData.immuneResult ? 'disabled' : null}>
                        <i className="icon icon-immune"></i>

                        <p className="system-name">免疫系统<br/><b className="font-english fs-12">Immune
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.immuneResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>

                    <li className={!healthData.endocrineResult ? 'disabled' : null}>
                        <i className="icon icon-metabolism"></i>

                        <p className="system-name">代谢与内分泌系统<br/><b className="font-english fs-12">Metabolism
                            and endocrine system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.endocrineResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>

                    <li className={!healthData.nerveResult ? 'disabled' : null}>
                        <i className="icon icon-nervous"></i>

                        <p className="system-name">神经系统<br/><b className="font-english fs-12">Nervous
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.nerveResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>
                    <li className={!healthData.sportResult ? 'disabled' : null}>
                        <i className="icon icon-locomotor"></i>

                        <p className="system-name">运动系统<br/><b className="font-english fs-12">Locomotor
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.sportResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>
                    <li className={!healthData.senseResult ? 'disabled' : null}>
                        <i className="icon icon-sense"></i>

                        <p className="system-name">感官系统<br/><b className="font-english fs-12">Sensory
                            system</b></p>

                        <div className="disease-result">
                            <div className="show-result">
                                {
                                    showList(healthData.senseResult).map(function (val, index) {
                                        if (!val) return null;
                                        return (<p key={index}>{val}</p>)
                                    })
                                }
                            </div>
                        </div>
                    </li>

        </ul>


            )


    }
}

DiagnosisResult.propTypes = {
    healthData: React.PropTypes.object.isRequired
}
export default DiagnosisResult;