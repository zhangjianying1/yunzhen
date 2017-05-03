import React from 'react'
import ReactDOM from 'react-dom';
require('./dateCalender.scss');

class DateCalender extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            year: [2016, 2015, 2014, 2013, 2012, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990],
            month: [1,2,3,4,5,6,7,8,9,10,11,12],
            date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            time: props.time
        }
    }
    getIndex(key){
        for (let i = 0, arr = this.state[key]; i < arr.length; i ++){
            let index = key == 'year' ? 0 : key=='month' ? 1 : 2
            let timeVal = this.state.time.date[index];

            if (arr[i] == timeVal ) {
                return i;
            }
        }
        return 0;
    }
    setDate(){
        let month = this.state.time.date[1],
            year = this.state.time.date[0];

        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 9 || month == 10 || month == 12 ) {
            this.setState({
                date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            })
        } else if (month == 4 || month == 6 || month == 8 || month == 11) {
            this.setState({
                date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            })
        } else {
            if ((!(year % 4) && (year / 100)) || !(year%400)){
                this.setState({
                    date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
                })
            } else {
                this.setState({
                    date: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
                })
            }
        }
    }
    componentDidMount(){
        let oYear = ReactDOM.findDOMNode(this.refs.year);
        let oMonth = ReactDOM.findDOMNode(this.refs.month);
        let oDate = ReactDOM.findDOMNode(this.refs.date);
        // 年
        this.touchHandler(oYear, this.getIndex('year'), (index) => {
            this.state.time.date[0] = this.state.year[index];
            this.setDate();
        })
        // 月
        this.touchHandler(oMonth, this.getIndex('month'), (index) => {
            this.state.time.date[1] = this.state.month[index];
            this.setDate();
        })
        // 日
        this.touchHandler(oDate, this.getIndex('date'), (index) => {
            this.state.time.date[2] = this.state.date[index];
            this.setDate();
        })
        // 阻止页面滚动
        ReactDOM.findDOMNode(this.refs.calender).addEventListener('touchmove', function(e){
            e.preventDefault();
        } , false)
    }
    touchHandler(obj , current, func){
        let boundaryT = 0,
            moveT = 0,
            temp = 0,
            speed = 0,
            scroll = 0,
            timer = null,
            parentDiv = obj.parentNode,
            s = 1,
            oLiH = obj.querySelector('li').offsetHeight,
            index = current;

        // 默认定位
        if (index > 0) {
            obj.style.transform = 'translate3d(0, '+ -index * oLiH + 'px, 0)';
        }
        /**
         * 触摸开始
         * @param e {Object}
         */
        function tStart(e){
            let event = e.touches[0];
            boundaryT = event.pageY - moveT;
            clearInterval(timer);
        }

        /**
         * 滑动
         * @param e {Object}
         */
        function tMove(e){
            let event = e.touches[0];
            moveT = event.pageY - boundaryT;
            speed = event.pageY - temp;
            temp = event.pageY;

            moveT = goDefault(moveT , s);
            obj.style.transform = 'translate3d(0, '+ moveT + 'px, 0)';
            obj.style.transitionDuration = '0'
            e.stopPropagation();
            e.preventDefault();
        }

        /**
         * 触摸结束
         * @param e
         */
        function tEnd(e){
            timer = setInterval(function(){
                speed = speed * .8;
                moveT += speed;
                if (Math.abs(speed) <= 1) {
                    clearInterval(timer);
                    speed = 0;

                    obj.style.transitionDuration = '100ms';
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
                moveT = moveT /s
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
        this.props.closeHandler();
    }
    // 选择当前日期
    selectDate(){
        this.props.callback(this.state.time);
    }
    render(){
        return(
            <div className="calender" onClick={() => this.close()} ref="calender">
                <div className="calender-box">
                    <div className="calender-body">
                        <div className="mask">
                            <div className="calender-date" >
                                <ul ref="year">
                                    {
                                        this.state.year.map((val , index) => {
                                            return(<li key={val}>{val}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="calender-date" >
                                <ul ref="month">
                                    {
                                        this.state.month.map((val , index) => {
                                            return(<li key={val}>{val}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="calender-date">
                                <ul ref="date">
                                    {
                                        this.state.date.map((val , index) => {
                                            return(<li key={val}>{val}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="calender-footer">
                        <span>取消</span>
                        <span onClick={() => this.selectDate()}>确定</span>
                    </div>
                </div>
            </div>

        )
    }
}
Calender.propTypes = {
    time: React.PropTypes.shape({
        label: React.PropTypes.string.isReuired,
        date: React.PropTypes.array.isRequired
    })
}
export default DateCalender;