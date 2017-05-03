import React from 'react';
import {connect} from 'react-redux';
import {setError} from '../../actions/action';

class Prompt extends React.Component{

    componentWillReceiveProps(nextProps){

        if (nextProps.error.prompt == true) {
            let {dispatch} = nextProps;
            setTimeout(() => {
                dispatch(setError({prompt: false, msg: 'fdfd'}))
            }, 500)
        }
    }
    render(){
        let {error} = this.props;
        return (
            <div style={{display: error.prompt ? 'block' : 'none'}}>
                <div className="view-error" style={{
                    padding: '0 .1rem',
                    position: 'fixed', 'zIndex': 99,
                    background: 'rgba(0,0,0,.6)', 'fontSize': '.14rem',
                    'lineHeight': '.3rem',
                    left: '50%',
                    top: '50%',
                    borderRadius: '.1rem',
                    color: '#fff',
                    'WebkitTransform': 'translate(-50%, -50%)',
                    transform: 'translate(-50%, -50%)',
                    'whiteSpace': 'nowrap'
                }}>{error.msg}</div>

            </div>
            )
    }
}
let init = (state) => {
    "use strict";
    return{
        error: state.error
    }
}
export default connect(init)(Prompt)