import React from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/action'
require('./dialog.scss');

class Confirm extends React.Component {

    close(){
        const {dispatch, alertData} = this.props;

        // 如果关闭时候有指定的事件
        if (alertData.fn) {
            alertData.fn();
        }
        dispatch(setAlert(false))
    }

    render (){
        const {alertData} = this.props;

        return (
            <div style={{display: alertData.isShow ? 'block' : 'none'}} onClick={() => this.close()}>
                <div className="dialog">
                    <div className="dialog-alert">

                        <section className="msg" >
                            <i className="icon-success"></i>
                            <div className="msg-success" dangerouslySetInnerHTML={{__html: alertData.msg}}></div>
                        </section>
                        <footer>
                            <a href="javascript:;" className="react" onClick={() => this.close()}>我知道了</a>
                        </footer>
                    </div>
                </div>
            </div>
            )
    }
}

let init = (state) => {
    return {
        alertData: state.alert
    }
}
export default connect(init)(Confirm);