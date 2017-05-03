import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {setWholeBodyDiagnosisData} from '../../actions/action';
import DiagnosisResult from '../../components/health/DiagnosisResult';

import {extend, isEmptyObject} from '../../utils/object';
import DorpDown from '../../components/dorpdown/DorpDown';
require('../../components/health/health.scss');
require('./record.scss');


class AutoDiagnosisRecord extends React.Component{
    constructor(props){
        super(props);

        let {userData} = this.props,
            tempObj = {};


        // 获取缓存的自检记录
        if (userData.questionTime) {

            // 继承userData的数据
            extend(tempObj, userData);
        }
        this.state = {

            diagnosisList: isEmptyObject(tempObj) ? [] : [tempObj],

            activeLabel: 'diagnosisList'
        };



    }
    /**
     * 获取数据
     * @param data 返回的数据
     * @param falg  为真是追加数据, 假是刷新
     */
    getData(data, falg){

        let tempData = this.state.diagnosisList,
            result = data.diagnosisList,
            {dispatch} = this.props;

        if (falg) {

            tempData = tempData.concat(result);
        } else {
            tempData = result;
        }

        this.setState({
            diagnosisList: tempData
        });
alert(JSON.stringify(data))
        // 缓存记录
        dispatch(setWholeBodyDiagnosisData(tempData));

    }
    componentDidMount(){
        let content = ReactDOM.findDOMNode(this.refs.content);
        content.style.minHeight = document.body.clientHeight + 'px';
    }
    render(){

        return(
            <DorpDown
                sendData={{}}
                urls={{diagnosisList: '/userController/listSelfDiagnosis'}}
                initFN={(data , flag) => this.getData(data , flag)}
                activeLabel={this.state.activeLabel}
                >
                <div className="auto-disagnosis-record" >
                      <div className="show-record" ref="content" >
                        {
                            this.state.diagnosisList.map((val, index) => {

                                if (val.acceptTime) {
                                    return(
                                        <div className="a-d-box" key={index}>

                                            <div className="disagnosis-time">
                                                <h2><time>{val.questionTime}</time></h2>
                                            </div>
                                            <div className="record-content">
                                                <DiagnosisResult healthData={val}/>
                                            </div>

                                        </div>
                                    )
                                } else {
                                    return null;
                                }


                            })
                        }
                    </div>
                </div>
            </DorpDown>

        )
    }
}

let init = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(init)(AutoDiagnosisRecord);