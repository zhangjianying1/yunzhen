import React from 'react';
import Picker from './Picker';

/**
 * 身高
 */
export default class PickTall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow: false
        }
    }
    togglePicker(){
        this.setState({
            isShow: !this.state.isShow
        })
    }
    setValue(val){
        let transVal = val.map(function(v){
            return parseInt(v);
        }).join('.')
        this.props.setValue(transVal);
    }
    render(){
        let tallIntArr = [];

        for (let i = 30; i < 240; i ++) {
            tallIntArr[i-30] = i;
        }

        let tallData = [tallIntArr, ['.0cm', '.1cm', '.2cm', '.3cm', '.4cm', '.5cm', '.6cm', '.7cm', '.8cm', '.9cm']];


        return(
            <div onClick={() => this.togglePicker()}>
                <div className="input-box">
                    <label>身高 <b className="font-english">Height</b></label>

                    <div className="input">
                        <div className="select">
                            {this.props.val ? this.props.val + 'cm' : '请选择'}
                        </div>
                    </div>
                </div>
                {
                    this.state.isShow ?
                        <Picker value={this.props.val ? this.props.val : '170.0cm'}  title="选择身高" data={tallData} isShow={this.state.isShow }
                                callback={(val) => this.setValue(val)} closeHandle={() => this.togglePicker()}/>
                        :
                        null
                }
            </div>
        );
    }
}