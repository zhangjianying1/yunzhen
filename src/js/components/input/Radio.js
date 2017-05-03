import React from 'react';
require('./radio.scss');

/**
 * 性别radio
 */
export default class Radio extends React.Component{


    clickHandle(val){
        this.props.setValue(val);
    }
    render(){

        return(
            <div className="radio display-box">
                {
                    this.props.radioData.map((val, index) => {
                        return(
                            <div onClick={() => this.clickHandle(val)} key={index} >
                                <i
                                   className={this.props.val == val ? 'radio-active' : 'radio-default'}>
                                </i>
                                <span className={this.props.val == val ? 'c-red' : ''} >{val}</span>
                            </div>
                        )
                    })
                }


            </div>
        )
    }
}