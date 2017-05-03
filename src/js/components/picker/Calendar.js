import React from 'react';
import TouchScroll from './TouchScroll';

/**
 * 身高
 */
export default class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow: false,
        }
    }
    toggleTouchScroll(){

        this.setState({
            isShow: !this.state.isShow
        })
    }
    setValue(valArr){

        valArr = valArr.map(function(val){

            if (val < 10) {
                return '0' + val;
            }
            return val;
        })
        let transVal = valArr.join('-');

        this.props.setValue(transVal)
    }

    render(){

        let birthday = this.props.val;

        return(
            <div onClick={() => this.toggleTouchScroll()} className="input-box">
                <label className="c-9B99DF">出生日期 <b className="font-english">Date of Birth</b></label>
                <div className="input">
                    <div className={birthday ? 'select' : 'select default'}>{birthday ? birthday : '请选择'}</div>
                </div>
                {
                    this.state.isShow ?
                        <TouchScroll value={birthday ? birthday : '1990-01-01'} title="选择出生日期"  isShow={this.state.isShow }
                                callback={(val) => this.setValue(val)} closeHandle={() => this.toggleTouchScroll()}/>
                        :
                        null
                }
            </div>
        );
    }
}