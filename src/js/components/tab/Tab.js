import React from 'react';
import ReactDOM from 'react-dom';
require('./tab.scss');

let This;

class Tab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style: {},
            actKey: this.props.defaultActiveKey
        }
    }
    clickHandle(index){

        this.setState({
            actKey: index
        })
        if (this.props.tabClickHandle) {
            this.props.tabClickHandle(index);
        }
    }
    renderTabHeader(child, index){
        return (
            <li onClick={this.clickHandle.bind(this, index)} className={this.state.actKey == index ? 'active': ''}><span>{child.props.title}</span></li>
            )
    }
    renderPanes(child, index){
        return React.cloneElement(child, {
            isAct: this.state.actKey == index
        })
    }
    scrollFN(){
        let oTabH = ReactDOM.findDOMNode(This.refs.tabH),
            oTabB = ReactDOM.findDOMNode(This.refs.tabB),
            winH = document.documentElement.clientHeight,
            oLoadOffsetTop =  oTabB.getBoundingClientRect().top;

        setTimeout(function(){

            if (oLoadOffsetTop <= oTabH.offsetHeight) {

                This.setState({
                    style: {
                        width: '100%',
                        position: "fixed",
                        zIndex: 30,
                        top: '0'
                    }
                })

            } else {
                This.setState({
                    style: {
                        position: "static",
                        zIndex: 30,
                    }
                })
            }
        }, 100)
    }
    componentDidMount(){
        This = this;
        window.addEventListener('scroll', this.scrollFN, false)

    }
    componentWillUnmount(){

        window.removeEventListener('scroll', this.scrollFN, false);

    }
    render(){
        let children = this.props.children;

        return (
                <div className="tab" >
                    <ul className="tab-header" ref="tabH" style={this.state.style}>{React.Children.map(children, (child, index) => this.renderTabHeader(child, index))}</ul>
                    <div className="tab-body" ref="tabB">{React.Children.map(children, (child, index) => this.renderPanes(child, index))}</div>
                </div>

            )
    }
}
export default Tab;

