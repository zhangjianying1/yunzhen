import React from 'react';
import {connect} from 'react-redux';
import {error} from '../../actions/action';
class Error extends React.Component{
    componentWillMount(){

    }
    componentWillReceiveProps(){
        let {dispatch} = this.props;
        setTimeout(() =>{
            dispatch(error(''))
        }, 1000)
    }
    render(){


        let {errorMsg} = this.props;
        return (
            <div>{errorMsg ?
            <div className="view-error" style={{
                padding: '0 .1rem',
                position: 'absolute', 'zIndex': 12,
                background: 'rgba(0,0,0, .9)', 'fontSize': '.16rem',
                'lineHeight': '.3rem',
                left: '50%',
                bottom: '30%',
                borderRadius: '.1rem',
                color: '#fff',
                'WebkitTransform': 'translate(-50%, -50%)',
                transform: 'translate(-50%, -50%)',
                'whiteSpace': 'nowrap'
                }}>{errorMsg}</div>
            :
            null}
            </div>
            )
    }
}
let init = (state) => {
    return {
        errorMsg: state.error
    }
}
export default connect(init)(Error);