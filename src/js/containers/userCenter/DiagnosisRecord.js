import React from 'react';
import ReactDOM from 'react-dom';
import DorpDown from '../../components/dorpdown/DorpDown';
import Ajax from '../../utils/Ajax';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {setDiagnosisData} from '../../actions/action';
import {getRelationName} from '../../utils/getRelation';
require('./healthRecord.scss');

/**
 * 健康记录
 */
class HealthRecord extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            diagnosisList: [],
            activeLabel: 'diagnosisList'
        }
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

alert(JSON.stringify(data))
        if (falg) {

            tempData = tempData.concat(result);
        } else {
            tempData = result;
        }

        this.setState({
            diagnosisList: tempData
        });

        // 缓存记录
        dispatch(setDiagnosisData(tempData));

    }
    sliceTime(str){
        return str && str.substring(5, 10);
    }
    componentDidMount(){
        let user = ReactDOM.findDOMNode(this.refs.user);
        let record = ReactDOM.findDOMNode(this.refs.record);
        record.style.minHeight = (document.body.clientHeight - user.offsetHeight) + 'px';
    }
    render(){
        let diagnosisList = this.state.diagnosisList,
            {params} = this.props;

        return(
            <DorpDown
                title="我的健康记录"
                sendData={{familyCode: params.id}} urls={{diagnosisList: '/userController/listDiagnosis'}}
                initFN={(data , flag) => this.getData(data , flag)}
                activeLabel={this.state.activeLabel}
                >
                <section className="health-user" ref="user">
                        <img src="./images/icon-photo.png" />
                    <p>{getRelationName(params.sex, params.relation)}</p>
                </section>
                <section className="health-record" ref="record">
                    {
                        diagnosisList.map((val, index) => {
                            return(
                                <div key={index} className="health-record-box icon-more">
                                    <Link to={`/diagnosisdetail/${val.recordCode}`}>
                                        <time className="c-999">{this.sliceTime(val.diagnosisTime)}</time>
                                        <div className="body-detail c-333">
                                            <strong>身高: {val.height}cm</strong>
                                            <strong className="ml-22">体重: {val.weight}kg</strong>
                                        </div>
                                        <p className="health-status">{val.exportVerdict}</p>

                                    </Link>
                                </div>
                            )
                        })
                    }
                </section>
            </DorpDown>
        )
    }
}

export default connect()(HealthRecord);