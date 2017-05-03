import React from 'react';
require('./preventItems.scss');

export default class CersicalCancer extends React.Component{
    render(){
        "use strict";
        return(
            <dl className="disease-description">
                <dt className="gradient-ban">
                    <i className="icon icon-cervical-disease"></i>
                    <h3>了解宫颈癌</h3>
                    <em>Understanding <br/> cervical cancer</em>
                </dt>
                <dd>



                    <p className="des">宫颈癌是女性常见恶性肿瘤之一，发病原因目前尚不清楚，早婚、早育、多产及性生活紊乱的妇女有较高的患病率。初期没有任何症状，后期可出现异常阴道流血。不但在女性生殖器官癌瘤中占首位，而且是女性各种恶性肿瘤中最多见的癌瘤，但其发病率有明显的地区差异。目前治疗方案以手术和放射治疗为主，亦可采用中西医综合治疗，但中晚期患者治愈率很低。作为女性要洁身自爱，加强卫生保健，注意按时妇科普查，发现症状苗头，及时就医。</p>


                    <img src="./images/prevent/cervical.jpg" />
                    <p className="des">宫颈癌是最常见的妇科恶性肿瘤。原位癌高发年龄为30～35岁，浸润癌为45～55岁，近年来其发病有年轻化的趋势。近几十年宫颈细胞学筛查的普遍应用，使宫颈癌和癌前病变得以早期发现和治疗，宫颈癌的发病率和死亡率已有明显下降。</p>
                    </dd>
            </dl>
        )
    }
}