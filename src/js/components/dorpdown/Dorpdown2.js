import React from 'react';
import ReactDOM from 'react-dom'


//require('./dorpdown.css');

class DorpDown2 extends React.Component {
    constructor(porps){
        super(porps);
        this.state = {
            loading: '',
            elemStyle: {},
            loadStyle: {},
            test: ''
        };
    }
    componentDidMount(){
        let elem = ReactDOM.findDOMNode(this),
            upStatus = ReactDOM.findDOMNode(this.refs.upStatus),
//            downStatus = ReactDOM.findDOMNode(this.refs.downStatus),
            options = {
                scrollY:0,
                scrollX:0,
                loadH: 68,
                isScrollingUp: false,
                isScrollingDown: false
            },

            moveH = 0,
            reset = (elem) => {


                setTimeout(function(){
                    elem.style.WebkitTransitionDuration = '300ms';
                    elem.style.transitionDuration = '300ms';
                    elem.style.WebkitTransform = 'translate3d(0, 0px, 0)';
                    elem.style.transform = 'translate3d(0, 0px, 0)';
                    moveH = 0;
                    this.setState({
                        loading: ''
                    })
                    elem.removeEventListener('touchmove', defaults, false);


                }.bind(this), 300)
            },
            transShow = (moveH) =>{

                // 大于加载移动的数值
                if (Math.abs(moveH) > 68) {
                    // 下拉
                    if (moveH > 0) {
                        upStatus.style.WebkitTransform = 'rotate(0deg)';
                        upStatus.style.transform = 'rotate(0deg)';
                    } else {
                        // 上拉
                       // downStatus.style.WebkitTransform = 'rotate(180deg)';

                    }

                } else {
                    // 下拉
                    if (moveH > 0) {

                        upStatus.style.WebkitTransform = 'rotate(180deg)';
                        upStatus.style.transform = 'rotate(180deg)';
                    } else {
                        // 上拉
                        //downStatus.style.WebkitTransform = 'rotate(0deg)';
                    }
                }
            },
            release = (elem) => {
                elem.style.WebkitTransitionDuration = '300ms';
                elem.style.transitionDuration = '300ms';

                if (Math.abs(moveH) > 68) {
                    // 下拉
                    if (moveH > 0) {
                        elem.style.WebkitTransform = 'translate3d(0, 68px, 0)';
                        elem.style.transform = 'translate3d(0, 68px, 0)';
                        this.props.refreshFN(reset, elem);
                    } else {
//                        elem.style.WebkitTransform = 'translate3d(0, -68px, 0)';
//
//                        this.props.callback(1);
                    }


                    elem.addEventListener('touchmove', defaults, false);

                    this.setState({
                        loading: 'loading'
                    })

                } else {
                    reset(elem);
                }
            };

        function defaults(event) {
            event.preventDefault();
            event.stopPropagation();
        }


        elem.style.minHeight = (document.documentElement.clientHeight - 50) + 'px';

        elem.addEventListener('touchstart', (e) => {

            // 如果body  scrollTop 大于 0 就不执行下拉加载

            if (document.body.scrollTop <= 1 ) {
                options.isScrollingDown = true;
                options.scrollY = e.targetTouches[0].pageY;
                options.scrollX = e.targetTouches[0].pageX;
            }


            return true;
        }, false);

        elem.addEventListener('touchmove', (e) => {


            if (e.targetTouches.length > 0 && options.isScrollingDown) {
                elem.style.WebkitTransitionDuration = '0ms';
                let touch = e.targetTouches[0];
                moveH = touch.pageY - options.scrollY;

                // 左右滑动距离大于上下滑动距离
                if (Math.abs(touch.pageX - options.scrollX) > moveH) {
                    options.isScrollingDown = false;
                    return;
                }

                if (moveH > 0) {

                    moveH = moveH > 80 ? moveH / (1 + moveH / (document.documentElement.clientHeight /.8) ) : moveH;
                    moveTo(e);
                    e.preventDefault();
                }
//                if (options.isScrollingUp && moveH < 0) {
//
//                    moveH = moveH < -80 ? moveH / (1 + -moveH / (document.documentElement.clientHeight /.8) ) : moveH;
//                    moveTo(e);
//                }

            }
            function moveTo(e){
                transShow(moveH)
                elem.style.WebkitTransform = 'translate3d(0,' + moveH +'px, 0)';

                elem.style.transform = 'translate3d(0,' + moveH +'px, 0)';

            }

        }, false)
        elem.addEventListener('touchend', function(){


            if (Math.abs(moveH) > 0 &&  options.isScrollingDown) {
                release(this)
            }
            options.isScrollingDown = false;
//            options.isScrollingUp = false;
            return true;
        })

        /*
         * 解决fixed在transform定位的问题
        */
        function transitionEnd(){
            if (moveH == 0) {
                elem.style.WebkitTransform = null;
                elem.style.transform = null;
            }

        }
        elem.addEventListener('webkitTransitionEnd', transitionEnd, false);

    }
    render(){
        return (
            <div className="dorp-down">
                <div className="up-load"><span ref="upStatus" className={this.state.loading} ></span></div>

                <div className="" ref="main">{this.props.children}</div>
            </div>
            )
    }
}
DorpDown2.propTypes = {
    callback: React.PropTypes.func
}
export default DorpDown2;