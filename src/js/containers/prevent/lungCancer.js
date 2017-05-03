import React from 'react';

require('./preventItems.scss');

export default class lungCancer extends React.Component{
    render(){

        return(
            <dl className="disease-description">
                <dt className="gradient-ban">
                    <i className="icon icon-lung-disease"></i>
                    <h3>了解肺癌</h3>
                    <em>Understanding <br/> lung cancer</em>
                </dt>
                <dd>

                    <p className="des">肺癌是发病率和死亡率增长最快，对人群健康和生命威胁最大的恶性肿瘤之一。近50年来许多国家都报道肺癌的发病率和死亡率均明显增高，
                    男性肺癌发病率和死亡率均占所有恶性肿瘤的第一位，女性发病率占第二位，死亡率占第二位。肺癌的病因至今尚不完全明确，大量资料表明，
                    长期大量吸烟与肺癌的发生有非常密切的关系。已有的研究证明：长期大量吸烟者患肺癌的概率是不吸烟者的10～20倍，开始吸烟的年龄越小，
                    患肺癌的几率越高。此外，吸烟不仅直接影响本人的身体健康，还对周围人群的健康产生不良影响，导致被动吸烟者肺癌患病率明显增加。
                    城市居民肺癌的发病率比农村高，这可能与城市大气污染和烟尘中含有致癌物质有关。因此应该提倡不吸烟，并加强城市环境卫生工作。</p>

                    <img src="./images/prevent/lung-2.jpg" />

                    <p className="des">肺癌（英语：Lung cancer）是一种肺部的恶性肿瘤，特征为肺部组织中的细胞不受控制地生长。如果不进行治疗，
                    那么肿瘤细胞会通过癌症转移的形式扩散至其他肺部组织或身体的其他部分。大多数始发于肺部的癌症，常称其为原发性肺癌，
                    发生于上皮组织细胞。肺癌主要分为小细胞肺癌（英语：small-cell lung carcinoma）（SCLC）和非小细胞肺癌（英语：non-small-cell lung carcinoma）（NSCLC）。
                    肺癌最常见的临床症状有咳嗽（包括咳血），体重减轻，气短和胸痛。 大多数（80-90%）肺癌患者患病的原因为长期吸入烟草烟雾，然而大约10-15%的患者从不吸烟，
                    这部分人患上肺癌往往是由于遗传因素和吸入空气污染物共同导致，污染物包括氡气、石棉或其它形式的空气污染，包括二手烟。肺癌在胸片（英语：Chest radiograph）或CT扫描中可见
                    ，并可通过支气管镜（英语：Bronchoscopy）或CT引导下进行活检确诊。 肺癌的治疗和长期疗效取决于取决于类型、阶段（转移的程度）和患者的整体健康状况。常见的治疗手段包括手术、化疗和放疗。
                    非小细胞肺癌（NSCLC）有时采用手术治疗，
                    而小细胞肺癌（SCLC）通常对化疗和放疗的反应明显。总体而言，在美国确诊为肺癌的人中有16.8%存活时间超过5年，而这个比例在发展中国家则较低。世界上所有死于癌症的人中，占比最大的为肺癌，并且每年约有156万人死于肺癌，如2012年。</p>
                </dd>
            </dl>
        )
    }
}