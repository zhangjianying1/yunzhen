import React from 'react';
require('./radioBorder.scss');

/**
 * 性别radio
 */
export default class RadioBorder extends React.Component{


    clickHandle(val){
        this.props.setValue(val);
    }
    render(){
        let className = this.props.className ? this.props.className + ' radio-border' : 'radio-border';

        return(
            <div className={className}>
                <div className="radio-border-label" dangerouslySetInnerHTML={{__html: this.props.title}}></div>
                <div className="radio-border-body">
                {
                    this.props.radioData.map((val, index) => {
                        return(
                            <div onClick={() => this.clickHandle(val)} key={index} className={this.props.val == val ? 'tab-radio-active' : 'tab-radio-default'}>
                              {val}
                            </div>
                        )
                    })
                }
                </div>

            </div>
        )
    }
}