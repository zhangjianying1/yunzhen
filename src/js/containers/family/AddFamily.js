import React from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
require('./addFamily.scss');
/**
 * 添加家庭成员
 */
class AddFamily extends React.Component{


    componentDidMount(){
        "use strict";
        let addFamily = ReactDOM.findDOMNode(this.refs.addFamily);
        addFamily.style.height = document.documentElement.clientHeight + 'px';
    }
    render(){
        let {params} = this.props;
        return(
            <dl className="bg-2e2735 content-box-p20" ref="addFamily">
                <dt className="add-tit">添加您的家人, 请点击下面的头像</dt>
                <dd className="family-list">

                    <div className="">
                        <Link to={`/inputuser/1/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                            <p>爷爷</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/2/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>奶奶</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/3/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>外公</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/4/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>外婆</p>
                        </Link>
                    </div>

                    <div className="">
                        <Link to={`/inputuser/5/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>爸爸</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/6/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>妈妈</p>
                        </Link>
                    </div>

                    <div className="">
                        {params.gender == 0 ?
                            <Link to={`/inputuser/7/${params.gender}`}>
                                <i className="icon icon-add-family"></i>
                                <p>岳父</p>
                            </Link>
                            :
                            <Link to={`/inputuser/7/${params.gender}`}>
                                <i className="icon icon-add-family"></i>
                                <p>公公</p>
                            </Link>
                        }

                    </div>
                    <div className="">
                    {params.gender == 0 ?
                        <Link to={`/inputuser/8/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                            <p>岳母</p>
                        </Link>
                        :
                        <Link to={`/inputuser/8/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                            <p>婆婆</p>
                        </Link>
                    }

                </div>
                    <div className="">
                        {params.gender == 0 ?
                            <Link to={`/inputuser/9/${params.gender}`}>
                                <i className="icon icon-add-family"></i>
                                <p>老婆</p>
                            </Link>
                            :
                            <Link to={`/inputuser/9/${params.gender}`}>
                                <i className="icon icon-add-family"></i>
                                <p>老公</p>
                            </Link>
                        }

                    </div>
                    <div className="">
                        <Link to={`/inputuser/10/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>儿子</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/11/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>女儿</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/12/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                        <p>兄弟</p>
                        </Link>
                    </div>
                    <div className="">
                        <Link to={`/inputuser/13/${params.gender}`}>
                            <i className="icon icon-add-family"></i>
                            <p>姐妹</p>
                        </Link>
                    </div>

                </dd>
            </dl>
        )
    }
}

export default AddFamily