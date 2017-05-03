import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {post} from '../../utils/Ajax';
import {loading} from '../../actions/action';
/**
 * 设置标题和加载数据
 */
class Header extends React.Component{
    constructor(porps){
        super(porps);
    }
    componentDidMount(){

        if (this.props.initFN) {
            let {dispatch , url , sendData, initFN , reset} = this.props;
            post({
                dispatch: dispatch,
                url: url,
                sendData: sendData,
                callback: (data) => {
                    initFN(data);

                    // 下拉刷新
                    if (reset) {
                        reset();
                    }
                }
            })

        }

    }
    shouldComponentUpdate(){
        return false;
    }
    render(){
        document.title = this.props.title;
        return (null)
    }

}
Header.propTypes = {
    title: React.PropTypes.string,  //当前网页的title
    initFN: React.PropTypes.func,   // 更新父组件的state
    sendData: React.PropTypes.object,           //ajax参数
    url: React.PropTypes.string           //ajax路径
}
export default connect()(Header);