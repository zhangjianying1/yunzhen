import React from 'react';
import {connect} from 'react-redux';
import {confirm} from '../../actions/action'
require('./dialog.scss');

class ConfirmAddress extends React.Component {
    close(){

        if (this.props.setConfirmAddress) {
            this.props.setConfirmAddress(false);
        }
    }
    btnLeftFN(e) {
        if (this.props.btnLeftFN) {
            this.props.btnLeftFN();
        }
        this.close();
        e.preventDefault();
    }


    btnRightFN(e){

        if (this.props.btnRightFN) {
            this.props.btnRightFN();
        }
        this.close();
        e.preventDefault();
    }
    render (){
        const propData = this.props;

        return (

            <div className="view" style={{display: propData.isShow ? 'block' : 'none'}} >
                <div className="mark" onClick={() => this.close()}></div>
                <div className="view-cont view-confirm">
                <div className="view-confirm-header">
                    <h2>{propData.title}</h2>
                </div>
                <div className="view-confirm-body">{propData.children}</div>
                <div className="view-confirm-footer">
                <a onClick={(e) => this.btnLeftFN(e)} className="view-confirm-cancel">{propData.btnLeftText}</a><a onClick={(e) => this.btnRightFN(e)} className="view-confirm-appect">{propData.btnRightText}</a></div>
                </div>
            </div>
            )
    }
}


ConfirmAddress.propTypes = {
    title: React.PropTypes.string,
    btnLeftText: React.PropTypes.string,
    btnRightText: React.PropTypes.string
}

export default ConfirmAddress;