import React from 'react';
import {Link} from 'react-router';
import DorpDown from '../../components/dorpdown/DorpDown';
import Health from '../../components/health/Health';
import UserMsg from '../../components/health/UserMsg';
import {connect} from 'react-redux';
import {setUserData} from '../../actions/action';
import Ajax from '../../utils/Ajax';


/**
 * 个人中心
 */
class UserCenter extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            userData: props.userData,

        }
    }

    /**
     * 获取数据
     * @param data 返回的数据
     * @param falg  为真是追加数据, 假是刷新
     */
    getData(fn, context){

        let {dispatch} = this.props,
             ajax = new Ajax(this.props);

        ajax.post({
            url: '/userController/memberQuery',
            callback: (res) => {
                //res = {
                //    verdict: "002:5;003:5;004:5;005:5;006:5",
                //    diagnosisTime: '33',
                //    diagnosisStatus: 2,
                //    sex: 1
                //}
                this.setState({
                    userData: res
                });


                if (fn) {
                    fn(context);
                }

                // 缓存记录
                dispatch(setUserData(res));
            }
        })
    }
    componentWillMount(){
       this.getData();
    }
    render(){
        const {userData} = this.state;

        return(
            <DorpDown
                refreshFN={(fn, elem) => this.getData(fn, elem)}
                >
                <div className="bg-2e2735" style={{paddingBottom: '.2rem'}}>
                    <UserMsg userData={userData} />
                    <Health userData={userData} >
                        {
                            userData.diagnosisTime ?
                                <Link to={`/myhealthrecord/${userData.familyCode}`} className="btn btn-60">查看更多报告</Link>
                                :
                                <div  className="btn btn-60 disabled">查看更多报告</div>
                        }
                    </Health>
                </div>
            </DorpDown>
        )
    }
}
const init = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(init)(UserCenter);