import React from 'react';
import {showLoading} from '../../actions/action'
import {connect} from 'react-redux';

class Loading extends React.Component{
    render(){
        const {loading} = this.props;
        let toggleDisplay = () => {
            return {display: loading ? 'block' : 'none'}
        }
        return (

            <div className="global-loading" style={toggleDisplay()}></div>
            )
    }
}
let init = function (state) {
    return {
        loading: state.loading
    }
}


export default connect(init)(Loading);