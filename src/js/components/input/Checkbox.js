import React from 'react';
import {isObject} from '../../utils/object';
require('./radioBorder.scss');

/**
 * 性别radio
 */
export default class Checkbox extends React.Component{

    constructor(props){
        "use strict";
        super(props);
        let checkData = props.checkData,
            result = []

        // 获取默认值
        checkData.forEach(function(val,i){
            let value = typeof val == 'string' ? val : val.val;

            if (value == props.val) {
                result[i] = val
            } else {
                result[i] = ''
            }

        })

        this.state = {
            val: result
        }
    }
    clickHandle(index, val){


        if (this.state.val[index]) {
            this.state.val[index] = '';
        } else {

            //是对象 特殊对待 (其他都清空)
            if (isObject(val)) {
                this.state.val = cleanArray(this.state.val, true);

            } else {
                this.state.val = cleanArray(this.state.val);
            }

            this.state.val[index] = val;
        }


        // 过滤数组获取数据
        let result = this.state.val.map(function(val){

            if (isObject(val)) {
                return val.val;
            }
            return val;

        }).filter(function(val){

            return val != '';
        })


        this.props.setValue(result.join(','));

        /**
         * 清除数组
         * @param arr
         * @param true  全部清空
         * @returns {*}
         */
        function cleanArray(arr, flag){
            return arr.map(function(val){
                if (flag) {
                    return '';
                }
                if (isObject(val)) {
                    return '';
                } else {
                    return val
                }
            })
        }
    }
    render(){
        let className = this.props.className ? this.props.className + ' radio-border' : 'radio-border';
        return(
            <div className={className}>
                <div className="radio-border-label">{this.props.title}</div>
                <div className="radio-border-body">
                {
                    this.props.checkData.map((val, index) => {
                        return(
                            <div onClick={() => this.clickHandle(index, val)} key={index} className={this.state.val[index] ? 'tab-radio-active' : 'tab-radio-default'} >


                                    {
                                        isObject(val) ? val.val : val
                                    }

                            </div>
                        )
                    })
                }

                </div>
            </div>
        )
    }
}

Checkbox.propTypes = {
    checkData: React.PropTypes.array.isRequired
}