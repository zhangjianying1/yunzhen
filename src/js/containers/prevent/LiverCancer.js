import React from 'react';
require('./preventItems.scss');


export default class liverCancer extends React.Component{
    render(){

        return(
            <dl className="disease-description">
                <dt className="gradient-ban">
                    <i className="icon icon-liver-disease"></i>
                    <h3>了解肝癌</h3>
                    <em>Understanding <br/> liver cancer</em>
                </dt>
                <dd>

                    <p className="des">肝癌即肝脏恶性肿瘤，可分为原发性和继发性两大类。原发性肝脏恶性肿瘤起源于肝脏的上皮或间叶组织，前者称为原发性肝癌，是我国高发的，危害极大的恶性肿瘤；后者称为肉瘤，
                        与原发性肝癌相比较较为少见。继发性或称转移性肝癌系指全身多个器官起源的恶性肿瘤侵犯至肝脏。一般多见于胃、胆道、胰腺、结直肠、卵巢、子宫、肺、乳腺等器官恶性肿瘤的肝转移。</p>

                    <img src="./images/prevent/liver-2.jpg" />

                    <p className="des">肝癌（liver cancer）是指发生于肝脏的恶性肿瘤，死亡率较高，由肝脏内的细胞所引发的癌病，称之为“原发性肝癌”，由身体其他器官的癌症转移到肝脏而形成的肝脏恶性肿瘤，
                        称为继发性肝癌，也称“转移性肝癌”。原发性肝癌根据组织学分类可以分为“肝细胞型”、“胆管细胞型”和“混合型”。初期症状并不明显，晚期主要表现为肝痛、乏力、消瘦、黄疸、腹水等症状。
                        中国是乙肝大国，我国的肝癌多在乙肝肝硬化的基础上发展而来，丙肝病人也在逐渐增加，乙肝后也会发展为肝癌。</p>
                </dd>
            </dl>
        )
    }
}