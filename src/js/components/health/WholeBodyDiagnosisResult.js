import React from 'react';
import {Link} from 'react-router';
import DiagnosisResult from './DiagnosisResult';
require('./wholeBodyDiagnosisResult.scss');

/**
 * 自我诊断
 */
class WholeBodyDiagnosisResult extends React.Component{

    render(){
        let {healthData, children} = this.props;

        return (
            <section className="health" >

                <div className="diagnosis-detail">
                    <dl className="diagnosis-result">
                        <dt>全身健康诊断报告</dt>
                        <dd>
                            <DiagnosisResult healthData={healthData} />

                            <div className="expert-prompt">
                                <h3 className="prompt-tit">专家意见:</h3>
                                <div className="prompt-msg">
                                    {healthData.exportVerdict}
                                </div>
                            </div>
                            {children}

                        </dd>
                    </dl>
                </div>
            </section>
        )

    }
}

export default WholeBodyDiagnosisResult;