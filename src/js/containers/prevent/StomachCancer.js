import React from 'react';
import PreventImg from '../../components/scrollload/PreventImg';
require('./preventItems.scss');

export default class StomachCancer extends React.Component{
    render(){
        "use strict";
        return(
            <dl className="disease-description">
                <dt className="gradient-ban">
                    <i className="icon icon-stomach-disease"></i>
                    <h3>了解胃癌</h3>
                    <em>Understanding <br/> gastric cancer</em>
                </dt>
                <dd>
                    <PreventImg>
                        <p className="des">胃癌是发生在胃部黏膜的癌症。早期的症状包括胃灼热（英语：heartburn），上腹疼痛，恶心及食欲不振。晚期的症状包括体重减轻，黄疸，呕吐，难以吞咽，粪便中有血等症状。
                        癌细胞会扩散到其他部位，特别是肝，肺，腹膜及淋巴结等部位。 </p>
                        <img id="./images/prevent/stomach-2.jpg" />
                        <p className="des">最常见的原因是因为感染幽门螺旋杆菌，将近六成的胃部肿瘤都与感染这种细菌有关。有某些种的幽门螺旋杆菌较为其他种来的危险。
                        其他常见的理由像是食用腌渍蔬菜（英语：Pickling）与抽烟。大约有10%的病例与家族遗传有关，大概有1%~3%的的案例是因为源自双亲的基因性疾病，像是遗传性弥漫性胃癌（英语：Hereditary diffuse gastric cancer）。
                        大多数的胃部肿瘤都是恶 性胃癌，大致上又可再分为几下列几种：淋巴瘤与间质瘤也可能在胃里形成。大多时候，胃癌会经年累月地持续恶化。
                            </p>
                        <img id="./images/prevent/stomach-3.jpg" />

                        <p className="des">
                            大多经由胃镜采检样本来做诊断，确诊后才会再经由医学影像，确认是否转移到其他地方。
                        日本与韩国两国胃癌的比率较高，会进行胃癌筛检（英语：Cancer_screening）来发现疾病。 地中海式饮食（英语：Mediterranean diet）和戒烟都能降低罹患胃癌的风险。有研究显示，治疗胃幽门杆菌也有可能可以降低未来罹患胃癌的风险。
                        如果胃癌能够早期治疗，多数能够痊愈。治疗方式包括：外科手术、化学治疗、放射线治疗以及标靶治疗。若到了疾病的末期，则可以考虑缓和疗法。胃癌的治疗成效不佳，全球平均的五年存活率在10%以下。
                        这主要是因为多数患者都在疾病已相当严重时才发现罹癌。在美国，五年存活率为28%，而在韩国五年存活率可达65%，致力于胃癌筛检可能是存活率较高的原因之一。
                        全世界中，胃癌是癌症致病原因第五名，并且在癌症致死率排名中为第三名，分别占7%与9%的个案数。在2012年中，有 950,000人发病，且723,000 人死亡。
                        在1930年代以前，胃癌是世界许多地区（包含美国和英国）最常见的癌症死因，但后来各个地区的胃癌死亡率皆已下降一般认为和发明冰箱，因此人们使用盐渍法来保存食物的比例降低有关。
                        胃癌最普遍发生于东亚以及东欧地区，并且男性发病的概率是女性的两倍。</p>

                        <img id="./images/prevent/stomach-4.jpg" />

                        <p>胃癌在我国各种恶性肿瘤中居首位，胃癌发病有明显的地域性差别，在我国的西北与东部沿海地区胃癌发病率比南方地区明显为高。好发年龄在50岁以上，男女发病率之比为2：1。
                        胃癌的预后与胃癌的病理分期、部位、组织类型、生物学行为以及治疗措施有关。</p>
                    </PreventImg>
                </dd>
            </dl>
        )
    }
}