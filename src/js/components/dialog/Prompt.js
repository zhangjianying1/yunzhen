import React from 'react';
import {connect} from 'react-redux';
import {setPrompt} from '../../actions/action';
require('./dialog.scss');
class Prompt extends React.Component{

    componentWillReceiveProps(nextProps){

        if (nextProps.prompt.isShow == true) {
            let {dispatch} = nextProps;
            setTimeout(() => {
                dispatch(setPrompt({isShow: false, msg: ''}))
            }, 500)
        }
    }
    render(){
        let {prompt} = this.props;
        return (

            <div style={{display: prompt.isShow ? 'block' : 'none'}}>
                <div className="dialog">
                    <div className="dialog-alert">

                        <section className="msg" >
                            <i className="icon-warn"></i>
                            <div className="msg-success" dangerouslySetInnerHTML={{__html: prompt.msg}}></div>
                        </section>

                    </div>
                </div>
            </div>

            )
    }
}
let init = (state) => {
    "use strict";
    return{
        prompt: state.prompt
    }
}
export default connect(init)(Prompt)