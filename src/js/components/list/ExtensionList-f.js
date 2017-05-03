import React from 'react';
import {Link} from 'react-router';
import Dorpdown from '../dorpdown/DorpDown';
require('./extension-list.scss');
/**
 * 推广列表
 */
class ExtensionList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    //加载
    getData(label , data , flag) {

        //
        if (flag == undefined) {
            this.setState({
                data: [1,2]
            })
        } else {
            this.setState({
                data: this.state.data.concat(data)
            })
        }

    }
    render(){

        return(
            <div className="activity-name">
                <Dorpdown {...this.props} data={this.state.data}  urls={{scrollLoad: {url: '/', label: 'data'}}} initFN={(label , ata , flag) => this.getData(label , data , flag)} >
                <dl className="activity-name-list">
                    <dt className="column-box">
                        <div>粉丝</div>
                        <div>场景名称</div>
                        <div>推广费用</div>
                    </dt>
                    <dd className="show-time">
                        <em className="fr">累计关注人数8人</em>
                        <time>2016年3月8日</time>
                    </dd>
                    <dd className="column-box">
                        <div className="user-des">
                            <img className="img" id="../images/code.jpg" />
                            <p>猴赛雷</p>
                        </div>
                        <div className="c-999">彩米科技</div>
                        <div>
                            <em className="c-red">3.00元</em>
                        </div>
                    </dd>
                    <dd className="column-box">
                        <div className="user-des">
                            <img src="../images/code.jpg" />
                            <p>猴赛雷</p>
                        </div>
                        <div className="c-999">彩米科技</div>
                        <div>
                            <em className="c-red">3.00元</em>
                        </div>
                    </dd>
                    <dd className="show-time">
                        <em className="fr">累计关注人数8人</em>
                        <time>2016年3月8日</time>
                    </dd>
                        {
                            this.state.data.map((val , index) => {
                            return (
                                <dd className="column-box" key={index}>
                                    <div className="user-des">
                                        <img className="img" id="../images/code.jpg" />
                                        <p>猴赛雷</p>
                                    </div>
                                    <div className="c-999">彩米科技</div>
                                    <div>
                                        <em className="c-red">3.00元</em>
                                    </div>
                                </dd>
                                )
                        })
                            }
                </dl>
                </Dorpdown>
            </div>
            )
    }
}

export default ExtensionList;