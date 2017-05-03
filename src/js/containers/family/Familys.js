import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DorpDown from '../../components/dorpdown/DorpDown';

import Ajax from '../../utils/Ajax';
import Health from '../../components/health/Health';

import {setDiagnosisData} from '../../actions/action';
import {getRelationName} from '../../utils/getRelation';


require('./familys.scss');

/**
 * 关心的家人
 */
class Familys extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            familyData: []
        }
        this.ajax = new Ajax(this.props);
    }
    componentWillMount(fn, context){
        const {dispatch} = this.props;

        this.ajax.post({
            url: '/userController/familyIndex',
            callback: (res) => {

                if (res.familyList.length > 0) {
                    this.setState({
                        familyData: res.familyList
                    })

                    //
                    dispatch(setDiagnosisData(res.familyList));

                }

                // 下拉刷新
                if (fn) fn(context);
            }
        })

    }
    addFamily(e){
        let {userData} = this.props,
            goUrl = '/addfamily/' + userData.sex;

        if (!userData.realName || (userData.sex != 0 && userData.sex != 1) ) {
            goUrl = '/prefect';
        }

        this.context.router.push({
            pathname: goUrl,
            query: {
                backurl: window.location.hash
            }
        })
        e.preventDefault();
    }
    render(){
        let {userData} = this.props;
        
        return(
            <DorpDown
                title="家庭中心"
                refreshFN={(fn, elem) => this.componentWillMount(fn, elem)}

                >
                <div className="bg-2e2735">
                    <h2 className="family-more"><Link to="/carefamily" className="display-box icon-more"><i className="icon icon-love"></i>我关心的家人</Link></h2>
                    <div >

                        {
                            this.state.familyData.length == 0 ?
                                <p style={{lineHeight: '40px', textAlign: 'center'}}><a style={{color: '#fff'}} onClick={(e) => this.addFamily(e)}>您尚未添加过您的家人信息, 现在去<b className="c-blue">添加</b></a> </p>
                                :
                                this.state.familyData.map((val, index) => {

                                    return(

                                        <dl key={index}>
                                            <dt className="family-name"><i className={val.sex == "0" ? 'icon icon-family-man' : 'icon icon-family-woman'}></i>{getRelationName(userData.sex, val.familyRelation)}  {val.realName}</dt>
                                            <dd>
                                                <Health userData={val} notWholeBody={true}>
                                                    {
                                                        val.diagnosisTime ?
                                                            <Link to={`/familyhealthdetail/${val.diagnosisRecordCode}`} className="btn btn-60">查看详细报告</Link>
                                                            :
                                                            <div  className="btn btn-60 disabled">查看详细报告</div>
                                                    }
                                                </Health>
                                            </dd>

                                        </dl>
                                    )
                                })
                        }


                    </div>
                </div>
            </DorpDown>
        )
    }
}


Familys.contextTypes = {
    router: React.PropTypes.object.isRequired
}

let init = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(init)(Familys);