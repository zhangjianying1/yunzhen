import React from 'react';
import ReactDOM from 'react-dom'

import ScrollLoad from '../scrollload/ScrollLoad';

require('./dorpdown.scss');


class DorpDown extends React.Component {
    constructor(porps){
        super(porps);
        this.state = {
            loading: '',
            elemStyle: {},
            loadStyle: {},
            test: '',
            bBtn: false
        };

        this.options = {
            scrollY:0,
            scrollX:0,
            loadH: 68,
            isScrollingDown: false,
            isMove: false,
            moveH: 0,
        }
    }
    defaults(event){
        event.preventDefault();
    }

    changeBtn(){
        this.setState({
            bBtn: false
        })
    }
    moveTo(elem, disance, duration){
        elem.style.WebkitTransform = 'translate3d(0, ' + disance + 'px, 0)';
        elem.style.transform = 'translate3d(0, ' + disance + 'px, 0)';
        elem.style.WebkitTransitionDuration =  duration +'ms';
        elem.style.transitionDuration = duration + 'ms';
    }

    reset(context){

        let elem = ReactDOM.findDOMNode(context.refs.dorp);


        setTimeout(function(){
            context.moveTo(elem, 0, 300);
            context.options.isMove = false;
            elem.removeEventListener('touchmove', context.defaults, false);

            context.setState({
                loading: '',
            })

        }, 300)
        context.options.moveH = 0;

    };

    componentDidMount(){

        let elem = ReactDOM.findDOMNode(this.refs.dorp),
            upStatus = ReactDOM.findDOMNode(this.refs.upStatus),
            options = this.options,


            // 旋转箭头图标（可以松手加载）
            transShow = (moveH) =>{

                // 大于加载移动的数值
                if (moveH > options.loadH) {
                    upStatus.style.WebkitTransform = 'rotate(0deg)';
                    upStatus.style.transform = 'rotate(0deg)';

                } else {
                    upStatus.style.WebkitTransform = 'rotate(180deg)';
                    upStatus.style.transform = 'rotate(180deg)';
                }
            },
            release = (elem) => {

                if (options.moveH > options.loadH) {
                    elem.addEventListener('touchmove', this.defaults, false);
                    this.moveTo(elem, options.moveH, 300);


                    options.isMove = true;
                    // 刷新
                    this.setState({
                        loading: 'loading',
                        bBtn: true
                    })

                    // 如果是下拉刷新
                    if (this.props.refreshFN) this.props.refreshFN(this.reset, this);

                } else {
                    // 恢复
                    this.reset(this);
                }
            },
            moveHandle = () => {
                options.moveH = options.moveH > 80 ? options.moveH / (1 + options.moveH / (document.documentElement.clientHeight /.8) ) : options.moveH;
                transShow(options.moveH);
                this.moveTo(elem, options.moveH, 0);
            };


        elem.style.minHeight = (document.documentElement.clientHeight) + 'px';

        elem.addEventListener('touchstart', (e) => {

            // 如果body  scrollTop 大于 0 就不执行下拉加载

            if (document.body.scrollTop <= 1 ) {
                options.isScrollingDown = true;
                options.scrollY = e.targetTouches[0].pageY;
                options.scrollX = e.targetTouches[0].pageX;
            }
        }, false);

        elem.addEventListener('touchmove', (e) => {
            let touch = e.targetTouches[0];
            options.moveH = touch.pageY - options.scrollY;

            if (options.isScrollingDown && !options.isMove) {

                // 左右滑动距离大于上下滑动距离
                if (Math.abs(touch.pageX - options.scrollX) > this.moveH) {
                    return;
                }

                if (options.moveH > 0) {
                    moveHandle();
                    e.preventDefault();
                }
            }
        }, false)

        elem.addEventListener('touchend', function(){

            if (options.isScrollingDown && options.moveH > 0) {
                release(this)
            }
            options.isScrollingDown = false;
        })

    }

    render(){

        return (
            <div className="dorp-down">


                <div className="dorp-content" ref="dorp">
                    <div className="up-load"><span ref="upStatus" className={this.state.loading} ></span></div>
                    {this.props.children}
                    {
                        !this.props.refreshFN ? <ScrollLoad  {...this.props}  dorpdown={this.state.bBtn} changeBtn={() => {this.changeBtn()}} reset={() => this.reset(this)} /> : null
                    }
                </div>
            </div>
            )
    }
}

/**
 * <Dorpdown title="活动记录" data={this.state.activityData} sendData={{r:3}} urls={{activityData: '/', activityDetail: '/#f'}} initFN={(label , data , flag) => this.getData(label , data , flag)} >
 *     data
 *     只有滚动加载才用到
 *     initFN
 *     @params label {String} 更新父组件相应的state
 *     @params data {Object}  更新的对象
 *     @params flag {Boolean} 是否追加
 */
export default DorpDown;

