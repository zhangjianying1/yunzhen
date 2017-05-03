import React from 'react';
require('./radio.scss');

/**
 * 性别radio
 */
export default class GenderRadio extends React.Component{


    clickHandle(val){

        // 如果禁用
        if (this.props.disabled == 'disabled') return;
        this.props.setGender(val);
    }
    render(){

        return(
            <div className="gender-radio display-box">
                <div onClick={() => this.clickHandle('0')} >
                    <i className={this.props.gender == '0' ? 'icon icon-man-active' : 'icon icon-man-default'}></i>
                    <span className={this.props.gender == '0' ? 'c-red' : ''} >男</span>
                    </div>
                <div onClick={() => this.clickHandle('1')} >
                    <i className={this.props.gender == '1' ? 'icon icon-woman-active' : 'icon icon-woman-default'}></i>
                    <span className={this.props.gender == '1' ? 'c-red' : ''}>女</span>
                </div>
            </div>
        )
    }
}