import React from 'react';
import ReactDOM from 'react-dom';
import {isEmptyObject} from '../../core/object';
require('./topslider.scss');
require('./slider.scss');

export class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            autoPlay: this.props.autoPlay,
            loop: this.props.loop,
            index: 0,
            oUlStyle: {},
            oLiStyle: {}
        }
    }
    shouldComponentUpdate(){
        if (arguments[0].data.length == 0) return false;
        else return true;

    }
    componentWillReceiveProps(nextProps){

        if (nextProps.data.length == 0) return;
        let ele = ReactDOM.findDOMNode(this),
            defaultSpeed = 300,
            oUl =  ReactDOM .findDOMNode(this.refs.oUl),
            slidesLength = nextProps.data.length,
            width =  0,
            deltaX =  void 0,
            deltaY = void 0,
            start = {},
            isScrolling =  true,
            index = nextProps.index || this.state.index;

        // 初始化设置元素样式
        width = 'getBoundingClientRect' in ele ? ele.getBoundingClientRect().width : ele.offsetWidth;

        this.setState({
            oUlStyle: {
                width: width * slidesLength + 'px'
            },
            oLiStyle: {
                width: width + 'px'
            }
        })

        let move = (index, speed) => {
            if (speed == undefined) {
                speed = defaultSpeed;
            }

            oUl.style.webkitTransitionDuration = speed + 'ms';
            oUl.style.webkitTransform = 'translate3d(' + -index * width + 'px, 0,0)';
            this.setState({
                index: index || 0
            })
        }

        // 定位到index图片的位置
        move(nextProps.index, 0);


        let touchS = (event) => {

            start = {
                pageX: event.touches ? event.touches[0].pageX : event.clientX,
                pageY: event.touches ? event.touches[0].pageY : event.clientY,
                time: Number(new Date())
            }
            // 滑动的距离
            deltaX = 0;
            // 滑动开始时 动画时间为0
            oUl.style.webkitTransitionDuration = 0 + 'ms';
        };
        let touchM = (event) => {

            if (event.touches.length > 1) return;
            deltaX = event.touches[0].pageX - start.pageX;

            if (Math.abs(deltaX) < Math.abs(start.pageY - event.touches[0].pageY)) return


            // 如果第一张图片并且还向右边滑动则除数变大
            var divisor = !index && deltaX > 0 || index == slidesLength-1 && deltaX < 0 ? Math.abs(deltaX) / width + 1 : 1;

            deltaX = deltaX / divisor;

            oUl.style.webkitTransform = 'translate3d(' + (deltaX - width*index) + 'px, 0, 0)';
            event.preventDefault();
        };
        let touchE = (event) => {
            // 如果滑动时间小于 250毫秒 并且滑动距离大于 20px 或者 滑动距离大于banner的一半
            if (Number(new Date()) - start.time < 250 && Math.abs(deltaX) > 20 || Math.abs(deltaX) > width / 2) {


                isScrolling = index == 0 && deltaX > 0 || index == slidesLength-1 && deltaX < 0;
//                console.log(index == 0 && deltaX > 0)

                // 不能滑动的时候
                if (!isScrolling) {

                    if (deltaX < 0 ) {
                        index++;
                    } else {
                        index--;
                    }
                }
            }

            move(index)


        };
        ele.removeEventListener('touchstrt', touchS, false);
        ele.removeEventListener('touchmove', touchM, false);
        ele.removeEventListener('touchend', touchE, false);
        ele.addEventListener('touchstart', touchS, false);
        ele.addEventListener('touchmove', touchM, false);
        ele.addEventListener('touchend', touchE, false)
    }



    render(){

        return(
                <div className="silder-img">

                    <ul ref="oUl" style={this.state.oUlStyle}>
                            {
                                this.props.data.map((val, index) => {
                                return (<li key={index} style={this.state.oLiStyle}><img src={val} /></li>)
                            })
                                }

                    </ul>
                    <ol>
                        {
                            this.props.data.map((val, index) => {
                            return (<li className={index == this.state.index ? 'active': ''} key={index}></li>)
                        })
                            }
                    </ol>
                </div>
            )
    }
}

Slider.propTypes = {
    data: React.PropTypes.array.isRequired
}



export class TopSlider extends React.Component{
//    constructor(props){
//        super(props);
//        this.state = {
//            autoPlay: this.props.autoPlay,
//            loop: this.props.loop,
//            index: 0,
//            oUlStyle: {},
//            oLiStyle: {}
//        }
//    }
//
    default(e){
        e.preventDefault();
        e.stopPropagation();
    }
    componentWillReceiveProps(nextProps) {

        // 阻止body滚动事件
        if (nextProps.style.display == 'block') {
            document.addEventListener('touchmove', this.default, false);
        } else {
            document.removeEventListener('touchmove', this.default, false);
        }
    }


    render(){
        return(<div className="top-silder" style={this.props.style} onClick={this.props.onClick}>{this.props.children}</div> )
    }
}
