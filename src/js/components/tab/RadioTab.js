import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '../input/Radio';

export default class RadioTab extends React.Component{
    constructor(props){
        "use strict";
        super(props);
        this.state = {
            actKey: props.defaultActKey || 0
        }
    }
    renderTabHeader(child, index){

        return(
            <div onClick={() => this.clickHandle(index, child.props.title)}
                 key={index}
                 className={this.state.actKey == index ? 'tab-radio-active' : 'tab-radio-default'}
                >

                    {child.props.title}

            </div>
        )

    }
    renderPanel(child, index){
        "use strict";
        return React.cloneElement(child, {
            isAct: this.state.actKey == index
        })
    }
    clickHandle(index, title){
        this.setState({
            actKey: index
        })

        if (this.props.setValue) {
            this.props.setValue(title)
        }
    }
    render(){
        let children = this.props.children;

        return(
            <div className="tab-radio">

                <div className="tab-radio-header">
                    <div className="radio-label">{this.props.title}</div>
                    {React.Children.map(children, (child, index) => this.renderTabHeader(child, index))}
                </div>
                <div className="tab-radio-body">
                    {React.Children.map(children, (child, index) => this.renderPanel(child, index))}
                </div>
            </div>
        )
    }
}