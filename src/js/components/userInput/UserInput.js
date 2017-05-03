import React from 'react';

import BaseMsg from './BaseMsg';
import HealthMsg from './HealthMsg';
import BodyMsg from './BodyMsg';
import {getRelationName} from '../../utils/getRelation';
require('./userInput.scss')
/**
 * 个人信息录入
 */
class UserInput extends React.Component{

    setValue(label, val, msg){
        this.props.setValue(label, val, msg);
    }
    render(){
        const {data} = this.props,
            listData = [
                {
                    tit: '真实姓名',
                    englishTit: 'Real name',
                    type: 'text',
                    name: 'realName',
                    placeholder: '请输入真实姓名',
                    isRequired: true
                }
            ]

        return(
            <div className="prefect">
                <section className="user-show display-box content-box-p20">
                    <div className="icon user-photo"></div>
                    <div className="user-msg">
                        <h2 className="fs-16 c-white">{getRelationName(data.myGender, data.familyRelation)}</h2>
                    </div>
                </section>
                <p style={{lineHeight: '.2rem', background: '#', fontSize: '.1rem', textAlign: 'center'}}>为保证报告的准确性, 请您准确、完整填写; <b className="c-red"> * </b>为必填项</p>
                <BaseMsg data={data} listData={listData} setValue={(label, val, msg) => this.setValue(label, val, msg)}/>
                <HealthMsg disabled="disabled" data={data} setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                <BodyMsg data={data} setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                {this.props.children}
            </div>
        )
    }

}




export default UserInput;