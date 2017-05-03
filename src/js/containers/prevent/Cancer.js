import React from 'react';
import PreventImg from '../../components/scrollload/PreventImg';
require('./preventItems.scss');

export default class Cancer extends React.Component{
    render(){
        "use strict";
        return(
            <PreventImg>
                <dl className="disease-description">
                    <dt>
                        <img id="./images/prevent/cancer.jpg" />
                    </dt>
                    <dd className="des">


                        <p>癌症（cancer）是医学术语，癌症分类主要以肿瘤来源组织的细胞类型和其生物学行为作为依据，可分为良性肿瘤和恶性肿瘤，
                            其为最常见的恶性肿瘤，亦有人将癌症和恶性肿瘤混合使用，中医学中称为岩，由控制细胞生长增殖机制失常而引起的疾病。癌症病变的基本单位是癌细胞，癌细胞除了生长失控外，
                            还会局部侵入周遭正常组织甚至经由体内循环系统或淋巴系统转移到身体其他部分。分子生物学的研究已经发现2.5万多种与癌症相关的基因变异，这个数字还在增加。</p>


                    </dd>
                    <dd>
                        <img id="./images/prevent/cancer-2.jpg" />
                    </dd>
                    <dd className="des">

                        <p>在医学上，癌是指起源于上皮组织的恶性肿瘤，是恶性肿瘤中最常见的一类。相对应的，起源于间叶组织的恶性肿瘤统称为肉瘤。
                            有少数恶性肿瘤不按上述原则命名，如肾母细胞瘤、恶性畸胎瘤等。一般人们所说的“癌症”习惯上泛指所有恶性肿瘤。
                        </p>
                    </dd>
                    <dd>
                        <img id="./images/prevent/cancer-3.jpg" />
                    </dd>
                    <dd className="des">
                        <p>肿瘤是机体在各种致瘤因素作用下，局部组织的细胞在基因水平上失去对其生长的正常调控导致异常增生与分化而形成的新生物。
                            新生物一旦形成，不因病因消除而停止生长，他的生长不受正常机体生理调节，而是破坏正常组织与器官，这一点在恶性肿瘤尤其明显。
                            与良性肿瘤相比，恶性肿瘤生长速度快，呈浸润性生长，易发生出血、坏死、溃疡等，并常有远处转移，造成人体消瘦、无力、贫血、食欲不振、发热以及严重的脏器功能受损等，最终造成患者死亡。</p>


                    </dd>
                </dl>
                </PreventImg>
        )
    }
}