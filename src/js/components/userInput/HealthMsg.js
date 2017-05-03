import React from 'react';

import Input from '../input/Input';
import GenderRadio from '../input/GenderRadio';
import Radio from '../input/Radio';
import {transBloodName} from '../../utils/getRelation';
import InputMsgBox from './InputMsgBox';

/**
 * 健康信息
 */
export default class HealthMsg extends React.Component{

    setValue(label, val, msg){
        this.props.setValue(label, val, msg);
    }
    render(){
        const {data, disabled} = this.props

        return(

            <InputMsgBox tit="健康档案">
                <div className="input-box">
                    <label><i className="important">*</i>性别 <b className="font-english">Gender</b></label>
                    <div style={{paddingTop: '.1rem', paddingBottom: '.1rem'}}>
                        <GenderRadio disabled={disabled} gender={data.sex} setGender={(val) => this.setValue('sex', val)}/>
                    </div>
                </div>
                <div className="input-box">
                    <label>血型 <b className="fong-english">Blood type</b></label>
                    <div style={{paddingTop: '.1rem', paddingBottom: '.1rem'}}>
                        <Radio
                            val={transBloodName(data.blood)}
                            radioData={['A型', 'B型', 'AB型', 'O型']}
                            setValue={(val) => this.setValue('blood', val)} />
                    </div>
                </div>
                <div className="input-box textarea-box">

                    <label>过往病史 <b className="font-english">Past medical history</b></label>
                    <div className="input">
                        <Input type="text" val={data.illHistory}
                               name="illHistory"
                               placeholder="请输入曾经得过的疾病名称,顿号隔开"
                               setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                    </div>

                </div>
            </InputMsgBox>
        )
    }
}

HealthMsg.propTypes = {
    disabled: React.PropTypes.string,
    data: React.PropTypes.object.isRequired
}