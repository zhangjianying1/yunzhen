import React from 'react'
import ReactDOM from 'react-dom';
require('./picker.scss');

/**
 * select 选择
 */
class TouchScroll extends React.Component{
    constructor(props){
        super(props);

        let timeArr = props.value && props.value.split('-') || [],
            yearArr = [],
            monthArr = [],
            dateArr = [];

        timeArr = timeArr.map(function(val){
            return parseInt(val)

        })

        for (let i = 1900; i < 2017; i ++) {
            yearArr[i-1910] = i;
        }
        for (let i = 1; i < 13; i ++) {
            monthArr[i-1] = i;
        }

        // 获取天数
        let dateLen = this.getDate(timeArr[0], timeArr[1]);

        for (let i = 1; i <= dateLen ; i ++) {
            dateArr[i-1] = i;
        }


        this.state = {
            data: [yearArr, monthArr, dateArr], //
            value: timeArr

        }


    }
    /**
     * 获取当前时间每月的天数
     * @param year
     * @param month
     */
    getDate(year, month){

        if (!year) year = 1980;
        if (!month) month = 1;

        if (month == '1' || month == '3' || month == '5' || month == '7' || month == '8' || month == '10' || month == '12') {
            return 31;
        }
        if (month == '4' || month == '6' || month == '9' || month == '11'){
            return 30;
        }

        // 能被4整除并且不能被100整除是瑞年
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 28;
        } else {
            return 29;
        }
    }
    getIndex(val, index){


        let data = this.state.data,
            valueArray = this.state.value;

        if (!Array.isArray(valueArray)) return 0;
        // 数值要和state.data一样(以免保存)
        valueArray.length = this.state.data.length;


        // 匹配后返回所在数组的索引
        for (let i = 0; i < val.length; i ++) {


            if (valueArray[index] == val[i]) {
                return i;
            }
        }
        return 0;
    }

    componentDidMount(){
        this.state.data.map((val, index) => {

            let oYear = ReactDOM.findDOMNode(this.refs['options' + index]);

            // 注册函数
            this.touchHandler(oYear, this.getIndex(val, index), (current) => {

                this.setValue(val, current, index);
            })

        })


        // 阻止页面滚动
        ReactDOM.findDOMNode(this.refs.calender).addEventListener('touchmove', function(e){
            e.preventDefault();
        } , false)
    }


    /**
     * 存储选择的数据
     * @param val 选项的数组数据
     * @param current 选择的索引值
     * @param index  要存储的数组的索引(位置)
     */
    setValue(val, current , index){

        // 改变月份后,选择日期的时候相应的改变日期(比如 31天 30天 )
        if (index == 1) {
            let tempArr = [];

            for (let i = 0; i < this.getDate(this.state.data[0], val[current]); i ++) {
                tempArr[i] = (i + 1);
            }
            if (tempArr.length !== this.state.dateArr) {
                this.state.data[2] = tempArr;
                this.setState(this.state);

                // 日选项默认变成 1 号
                let obj = ReactDOM.findDOMNode(this.refs.options2);
                obj.style.transform = 'translateY(0)';
                obj.style.webkitTransform = 'translateY(0)';
            }
        }
        this.state.value[index] = val[current];
    }
    touchHandler(obj , current, func){
        let boundaryT = 0,
            moveDistance = 0,
            temp = 0,
            speed = 0,
            scroll = 0,
            timer = null,
            parentDiv = obj.parentNode,
            s = 1,
            oLiH = obj.querySelector('li').offsetHeight,
            index = current,
            moveT = -index * oLiH;


        // 默认定位
        if (index > 0) {
            obj.style.transform = 'translate3d(0, '+ moveT + 'px, 0)';
            obj.style.webkitTransform = 'translate3d(0, '+ moveT + 'px, 0)';
        }
        /**
         * 触摸开始
         * @param e {Object}
         */
        function tStart(e){
            let event = e.touches[0];
            boundaryT = event.pageY;
            clearInterval(timer);
            obj.style.transform = 'translateY(' + moveT  + 'px)';
            obj.style.webkitTransform = 'translateY(' + moveT  + 'px)';
        }

        /**
         * 滑动
         * @param e {Object}
         */
        function tMove(e){

            let event = e.touches[0];

            moveDistance = (event.pageY - boundaryT);

            speed = event.pageY - temp;
            temp = event.pageY;

            moveDistance = goDefault(moveDistance , s);

            obj.style.transform = 'translate3d(0, '+ (moveT + moveDistance)  + 'px, 0)';
            obj.style.webkitTransform = 'translate3d(0, '+ (moveT + moveDistance)  + 'px, 0)';
            obj.style.transitionDuration = '0';
            obj.style.webkitTransitionDuration = '0';

            e.stopPropagation();
            e.preventDefault();
        }

        /**
         * 触摸结束
         * @param e
         */
        function tEnd(e){
            moveT += moveDistance;
            timer = setInterval(function(){
                speed = speed * .95;
                moveT += speed;
                if (Math.abs(speed) <= 1) {
                    clearInterval(timer);
                    speed = 0;

                    obj.style.transitionDuration = '100ms';
                    obj.style.webkitTransitionDuration = '100ms';
                    if (moveT > 0) {
                        moveT = 0;
                    }
                    if (moveT < -obj.offsetHeight + parentDiv.offsetHeight){
                        moveT = -obj.offsetHeight + parentDiv.offsetHeight;
                    }

                    // 重置index
                    index = setIndex(moveT , oLiH);
                    moveT = -oLiH * index
                    func(index);

                } else {
                    moveT = goDefault(moveT , s);

                }
                obj.style.transform = 'translate3d(0, '+ moveT + 'px, 0)';
                obj.style.webkitTransform = 'translate3d(0, '+ moveT + 'px, 0)';

            }, 30)
        }
        obj.addEventListener('touchstart' , tStart , false);
        obj.addEventListener('touchmove' , tMove, false);
        obj.addEventListener('touchend' , tEnd, false);


        /**
         * 减速
         * @param moveT {Number}
         * @param s {Number}
         * @returns moveT {Number}
         */
        function goDefault(moveT , s){
            if (moveT > 0 ) {
                s = ( 1 + moveT / (parentDiv.offsetHeight / 2));
                moveT = moveT / s
            } else if (moveT < -obj.offsetHeight + parentDiv.offsetHeight){

                let iMove = moveT + (obj.offsetHeight - parentDiv.offsetHeight);
                s = ( 1 + Math.abs(iMove) / (parentDiv.offsetHeight / 2));

                moveT = (-obj.offsetHeight + parentDiv.offsetHeight) + iMove / s;
            }
            return moveT;
        }

        /**
         * 找到终点的索引
         * @param moveT
         * @param oLiH
         * @returns {number}
         */
        function setIndex(moveT, oLiH){
            // 偏移的距离
            let iOffset = Math.abs(moveT) % oLiH;


            if (iOffset < (oLiH/2)) {

                return Math.floor( Math.abs(moveT) / oLiH)
            } else {
                return Math.ceil( Math.abs(moveT) / oLiH)
            }
        }

    }
    // 关闭日历
    close(){
        this.props.closeHandle();
    }
    // 选择当前日期
    selectDate(){
        this.props.callback(this.state.value);
    }

    render(){
        return(
            <div className={this.props.isShow ? 'calender active' : 'calender'} onClick={() => this.close()} ref="calender">
                <div className={this.props.isShow ? 'calender-box slide-in-up' : 'calender-box'}>
                    <div className="calender-header">
                        <span className="small-btn btn-purple-bor">取消</span>
                        <h2>{this.props.title}</h2>
                        <span onClick={() => this.selectDate()} className="small-btn btn-purple-bg">确定</span>
                    </div>
                    <div className="calender-body">
                        <div className="mask">
                            <div className="calender-date" >
                                {
                                    this.state.data.map((val, index) => {
                                        return(
                                            <div className="clumn"  key={index}>
                                                <ul ref={'options' + index}>
                                                    {
                                                        val.map((val, i) => {
                                                            return(<li key={i}>{val}</li>)
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default TouchScroll;