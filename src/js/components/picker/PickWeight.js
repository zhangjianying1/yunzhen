import React from 'react';
import Picker from './Picker';

/**
 * 身高
 */
export default class PickWeight extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.val,
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
        }).join('.');
        this.props.setValue(transVal);
    }

    render(){
        let weightIntArr = [];

        for (let i = 5; i < 200; i ++) {
            weightIntArr[i-5] = i;
        }
        let tallData = [weightIntArr, ['.0kg', '.1kg', '.2kg', '.3kg', '.4kg', '.5kg', '.6kg', '.7kg', '.8kg', '.9kg']],
            value;



        return(
            <div onClick={() => this.togglePicker()}>
                <div className="input-box">
                    <label>体重 <b className="font-english">Weight</b></label>
                    <div className="input">
                        <div className="select">
                            {this.props.val ? this.props.val + 'kg' : '请选择'}
                        </div>
                    </div>
                </div>
                {
                    this.state.isShow ?
                        <Picker value={this.props.val ? this.props.val : '65.0kg'} title="选择体重" data={tallData} isShow={this.state.isShow }
                                callback={(val) => this.setValue(val)} closeHandle={() => this.togglePicker()}/>
                        :
                        null
                }

            </div>
        );
    }
}