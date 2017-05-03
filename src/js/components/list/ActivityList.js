import React from 'react';
import {Link} from 'react-router';
require('./activity-list.scss');
/**
 * 活动列表
 */
class ActivityList extends React.Component{

    render(){
        let renderBox = function(val){
            return (
                <div className="list-box">
                    <div className="l-b-left">
                        <img src="../images/code.jpg" />
                    </div>
                    <div className="l-b-right">
                        <div className="l-b-des">
                            <h2>聚会苏<i className="activity-status during">进行中</i></h2>
                        </div>
                        <div className="l-b-point activity-watch">
                            <p>累计关注人数</p>
                            <div className="a-w-number">
                                <em className="c-red">450</em>人
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <ul className="activity-list">
            {
                this.props.data.map((val , index) => {
                    return(
                        <li key={index}>
                            {
                                this.props.to ?
                                <Link to={`${this.props.to}/${index}`} className="react go-to">
                                    {renderBox(val)}
                                </Link>
                                :
                                renderBox(val)
                            }
                        </li>
                    )
                })
            }


            </ul>
        )
    }
}
ActivityList.propTypes = {
    data: React.PropTypes.array.isRequired,
    to: React.PropTypes.string
}

export default ActivityList;