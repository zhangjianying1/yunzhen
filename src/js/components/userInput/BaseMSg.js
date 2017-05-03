import React from 'react';

import Input from '../input/Input';

import Calendar from '../picker/Calendar';
import InputMsgBox from './InputMsgBox';

/**
 * 基本信息
 */
export default class BaseMsg extends React.Component{

    setValue(label, val, msg){
        this.props.setValue(label, val, msg);
    }
    render(){
        const {data, listData} = this.props

        return(

            <InputMsgBox tit="基本资料">
                {
                    listData.map((val, index) => {
                        return (
                            <div className="input-box" key={index}>
                                <label className="c-9B99DF">
                                    {val.isRequired ? <i className="important">*</i> : ''}
                                    {val.tit} <b className="font-english">{val.englishTit}</b></label>
                                <div className="input">
                                    <Input type={val.type} val={data[val.name]}
                                           name={val.name}
                                           placeholder={val.placeholder}
                                           setValue={(label, val, msg) => this.setValue(label, val, msg)} />
                                </div>
                            </div>
                        )
                    })
                }


                <Calendar val={data.birthday}
                          setValue={(val) => this.setValue('birthday', val)}>

                </Calendar>

            </InputMsgBox>
        )
    }
}

BaseMsg.propTypes = {
    listData: React.PropTypes.arrayOf(React.PropTypes.object)
}