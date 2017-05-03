import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Ajax from '../../utils/Ajax'
import {getParentScroll} from '../../utils/dom';
import {extend} from '../../utils/object';

class ScrollLoad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadText: '',
            page: 1,
            pageTotal: ''
        }
        this.ajax = new Ajax(this.props);
    }
    loadImg(){
        let imgs = document.querySelectorAll('.img'),
            winH = document.documentElement.clientHeight;

        for (var i = 0; i < imgs.length; i ++){
            let img = imgs[i];

            if (img.getBoundingClientRect().top < winH) {
                let imgUrl = img.getAttribute('id');

                if (imgUrl) {
                    let oImg = new Image();
                    oImg.onload = function(){
                        if (img.tagName.toLowerCase() == 'img')
                            img.src = imgUrl;
                        else
                        img.style.backgroundImage = 'url(' + imgUrl + ')';
                        oImg = null;
                    }
                    oImg.src = imgUrl;
                    img.setAttribute('id', '');
                }
            }
        }
    }
    loadFN(flag){
        let {urls , sendData, initFN , reset, activeLabel} = this.props;

        extend(sendData , {page: 1});


        this.ajax.post({
            url: urls[activeLabel],
            sendData: sendData,
            callback: (res) => {

                initFN(res);

                this.state.pageTotal = res.pageTotal;

                // 下拉刷新
                if (flag) {
                    reset();
                }
            }
        })

    }

    scrollLoad(){
        let {urls , sendData, initFN , reset, activeLabel} = this.props;



        // 没有数据了
        if (this.state.pageTotal ==  this.state.page) {
            this.setState({
                page: 'not'
            })

        } else {

            this.state.page ++;
            extend(sendData , {page: this.state.page})

            this.ajax.post({
                url: urls[activeLabel],
                sendData: sendData,
                callback: (data) => {
                    initFN(data , true);
                }

            })
        }
    }
    componentWillMount(){
        this.loadFN();
    }
    componentWillReceiveProps(nextProps){


        // 下拉刷新
        if (nextProps.dorpdown) {
            nextProps.changeBtn();
            this.state.page = 1;
            this.loadFN(true);

        }

        let This = this;

        setTimeout(function(){
            This.loadImg();
        }, 3000);
    }
    componentDidMount(){

        let oLoad = ReactDOM.findDOMNode(this.refs.load),
            This = this,
            winH = document.documentElement.clientHeight,
            body = getParentScroll(oLoad);

        body.onscroll = window.onscroll = null;
        body.onscroll = window.onscroll = function(){

            setTimeout(function(){
                This.loadImg();
                if (This.state.page != 'not') {
                    let oLoadOffsetTop =  oLoad.getBoundingClientRect().top;

                    if (oLoadOffsetTop < winH) {
                        This.setState({
                            loadText : '正在加载中...'
                        })
                        This.scrollLoad();
                    }
                }
            }, 10)

        }
    }
    componentWillUnmount(){

        let oLoad = ReactDOM.findDOMNode(this.refs.load),
            body = getParentScroll(oLoad);

        body.onscroll = window.onscroll = null;
    }

    render(){
        return(
            <div ref="load" className="scroll-loading" style={{lineHeight: '.25rem' , height: ".25rem",  minHeight: '.05rem', textAlign: 'center'}}>
                { this.state.page != "not" ? this.state.loadText : '已全部加载完毕'}
            </div>

        )
    }
}


export default connect()(ScrollLoad);