import React from 'react';
import {preventLoadImg} from '../../utils/dom';
export default class PreventImg extends React.Component{
    componentDidMount(){
        let imgs = document.querySelectorAll('img');
        preventLoadImg(imgs);
        window.addEventListener('scroll', function(){
            preventLoadImg(imgs);
        }, false);
    }
    render(){

        return(<div className={this.props.className}>{this.props.children}</div>);
    }
}