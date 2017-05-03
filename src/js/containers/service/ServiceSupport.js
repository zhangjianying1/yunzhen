import React from 'react';
require('./service.scss');

export default class ServiceSupport extends React.Component{
    render(){

        return(
            <dl className="content-box-p15 bg-white">
                <dt className="logo"><img src="./images/yunzhen-logo.png" /></dt>
                <dd>
                    <div className="service-content">
                        <p>用户邮箱  </p>
                        <p>商务对接  </p>
                        <p>400-400-400     </p>
                    </div>
                </dd>
                <dd>
                    <p className="service-tenet">
                        我们在中国区的线下支持由中国为不数多的外资涉外全科－北京仁泰国际医疗提供医疗服务顾问支持，仁泰国际医疗拥有8年的涉外高端医疗运营经验，医疗质量标兵，世界500强共同选择.
                    </p>
                </dd>
                <dd className="service-channel">
                    <p><a tel="010－6502 0746" className="c-999">咨询电话：<i className="c-blue">010－6502 0746</i></a></p>
                    <p className="fs-12">服务支持: <i>www.reghm.com</i></p>
                </dd>
            </dl>
        )
    }
}