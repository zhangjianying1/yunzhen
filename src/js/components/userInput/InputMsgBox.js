import React from 'react';

import Input from '../input/Input';

import Calendar from '../picker/Calendar';

require('./inputMsgBox.scss');

/**
 * 信息框
 */
export default class InputMsgBox extends React.Component{
    render(){
        return(

            <section className="input-user-msg">

                <h3 className="header-lh-3">{this.props.tit}</h3>
                <div className="input-body">
                    {this.props.children}
                </div>

            </section>
        )
    }
}

