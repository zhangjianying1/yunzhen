import React from 'react';
import {connect} from 'react-redux';

import GenderRadio from '../../components/input/GenderRadio';
import Input from '../../components/input/Input';
import Radio from '../../components/input/Radio';
import Textarea from '../../components/input/Textarea';
import PickTall from '../../components/picker/PickTall';
import PickWeight from '../../components/picker/PickWeight';
import Calendar from '../../components/picker/Calendar';
import {getRelationName, transBloodName} from '../../utils/getRelation';
require('./userInput.scss');

/**
 * 个人信息录入
 */
class UserInput extends React.Component{
    constructor(props){
        super(props);
    }


    setValue(label, val, msg){
        this.props.setValue(label, val, msg);
    }
    render(){
        const {data} = this.props

        return(
            <div className="bg-26202c">
                <section className="user-show display-box content-box-p20">
                    <div className="icon user-photo">

                    </div>
                    <div className="user-msg">
                        <h2 className="fs-16 c-white">{getRelationName(data.sex, data.familyRelation)}</h2>
                    </div>
                </section>
                <section className="input-user-msg">

                    <h3 className="header-lh-3">基本资料</h3>
                    <div className="input-body">
                        <div className="input-box">
                            <label className="c-9B99DF">真实姓名 <b className="font-english">Real name</b></label>
                            <div className="input">
                                <Input type="text" val={data.realName}
                                       name="realName"
                                       placeholder="请输入真实姓名"
                                       setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                            </div>
                        </div>
                        <div className="input-box">
                            <Calendar val={data.birthday}
                                        setValue={(val) => this.setValue('birthday', val)}>

                            </Calendar>
                        </div>
                    </div>

                </section>
                <section className="input-user-msg">

                    <h3 className="header-lh-3">健康档案<i className="important">*</i></h3>
                    <div className="input-body">
                        <div className="input-radio">
                            <label>性别 <i className="font-english">Gender</i></label>
                            <div>
                                <GenderRadio gender={data.sex} setGender={(val) => this.setValue('sex', val)}/>
                            </div>
                        </div>
                        <div className="input-radio">
                            <label>血型 <b className="fong-english">Blood type</b></label>
                            <div>
                                <Radio
                                    val={transBloodName(data.blood)}
                                    radioData={['A型', 'B型', 'AB型', 'O型']}
                                    setValue={(val) => this.setValue('blood', val)} />
                            </div>
                        </div>
                        <div className="textara-box">

                            <label>过往病史 <b className="font-english">Past medical history</b></label>
                            <div className="input">
                                <Input type="text" val={data.illHistory}
                                       name="illHistory"
                                       placeholder="请输入曾经得过的疾病名称,顿号隔开"
                                       setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                            </div>

                        </div>
                    </div>
                </section>
                <section className="input-user-msg">
                    <h3 className="header-lh-3">身体体型 <i className="important">*</i></h3>

                    <div className="input-body">
                        <PickTall val={data.height}
                                  setValue={(val) => this.setValue('height', val)} />
                        <PickWeight val={data.weight}
                                    setValue={(val) => this.setValue('weight', val)} />
                    </div>
                </section>
                {this.props.children}
            </div>
        )
    }

}




export default connect()(UserInput);