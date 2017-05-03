import React from 'react';
import Picker from './Picker';

/**
 * 身高
 */
export default class PickOpation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow: false
        }
    }
    togglePicker(){
        "use strict";
        this.setState({
            isShow: !this.state.isShow
        })
    }
    setValue(val){
        let tempVal = val[0];

        if (tempVal == '请选择') {
            tempVal = this.props.data[0][0];

        }
        this.props.setValue(tempVal);
    }
    render(){




        return(
            <div onClick={() => this.togglePicker()}>
                {this.props.children}
                {
                    this.state.isShow ?
                        <Picker value={this.props.val} title={this.props.title} data={this.props.data} isShow={this.state.isShow }
                                callback={(val) => this.setValue(val)} closeHandle={() => this.togglePicker()}/>
                        :
                        null
                }
            </div>
        );
    }
}