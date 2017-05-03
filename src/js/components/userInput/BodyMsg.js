import React from 'react';


import PickTall from '../picker/PickTall';
import PickWeight from '../picker/PickWeight';
import InputMsgBox from './InputMsgBox';

/**
   身体信息
 */
export default class BodyMsg extends React.Component{

    setValue(label, val, msg){
        this.props.setValue(label, val, msg);
    }
    render(){
        const {data} = this.props

        return(

            <InputMsgBox tit="身高体重">
                <PickTall val={data.height}
                          setValue={(val) => this.setValue('height', val)} />
                <PickWeight val={data.weight}
                            setValue={(val) => this.setValue('weight', val)} />

            </InputMsgBox>
        )
    }
}