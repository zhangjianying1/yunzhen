import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {setConfirm} from '../../actions/action';
require('./dialog.scss');

/**
 * 对话框
 */
class Confirm extends React.Component {
    componentDidMount(){
        let oMove = ReactDOM.findDOMNode(this.refs.moveDisabled);

        oMove.addEventListener('touchmove', function(e){e.preventDefault}, false);
    }
    close(){
        const {dispatch} = this.props;
        dispatch(setConfirm({bBtn: false}))
    }
    cancel(e) {
        if (this.props.cancelFN) {
            this.props.cancelFN();
        }
        this.close();
        e.stopPropagation();
    }
    confirm(e){
        const {confirmData} = this.props;

        if (confirmData.confirmFN) {
            confirmData.confirmFN();
        }
        this.close();

        e.stopPropagation();
    }
    render (){
        const {confirmData, children} = this.props;

        return (


            <div ref="moveDisabled" style={{display: confirmData.bBtn ? 'block' : 'none'}} onClick={() => this.close()}>
                <div className="dialog">
                    <div className="dialog-confirm">

                        <section className="msg" >
                            <i className="icon-success"></i>
                            <div className="msg-success" dangerouslySetInnerHTML={{__html: confirmData.msg}}></div>
                            <div className="strong-tips" dangerouslySetInnerHTML={{__html: confirmData.strongTips}}></div>
                        </section>
                        <footer>
                            <a href="javascript:;" className="react" onClick={(e) => this.cancel(e)}>{confirmData.leftBtnText ? confirmData.leftBtnText : '取消'}</a>
                            <a href="javascript:;" className="react" onClick={(e) => this.confirm(e)} >{confirmData.rightBtnText ? confirmData.rightBtnText : '确定'}</a>
                        </footer>
                    </div>
                </div>

            </div>
            )
    }
}
Confirm.propTypes = {
    msg: React.PropTypes.string,
    closeFN: React.PropTypes.func,
    confirmFN: React.PropTypes.func
}
let init = (state) => {
    return {
        confirmData: state.confirmData
    }
}
export default connect(init)(Confirm);