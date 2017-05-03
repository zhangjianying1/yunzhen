import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
require('./preventItems.scss');


/**
 * 预防措施
 */
export default class PreventItem extends React.Component{
    componentDidMount(){
        "use strict";
        let full = ReactDOM.findDOMNode(this.refs.full);
        full.style.height = document.documentElement.clientHeight + 'px';
    }
    render(){
        return(

            <ul ref="full" className="prevent-items">
                <li><Link to="/tumourconstitution"><i className="icon icon-tumour"></i><h3>肿瘤体质</h3><p className="font-english">Tumout constitution</p></Link></li>
                <li><Link to="/cancer"><i className="icon icon-cancer"></i><h3>关于癌症</h3><p className="font-english">About cancer</p></Link></li>
                <li><Link to="/livercancer"><i className="icon icon-liver"></i><h3>肝癌</h3><p className="font-english">Liver cancer</p></Link></li>
                <li><Link to="/lungcancer"><i className="icon icon-lung"></i><h3>肺癌</h3><p className="font-english">Lung cancer</p></Link></li>
                <li><Link to="/stomachcancer"><i className="icon icon-stomach"></i><h3>胃癌</h3><p className="font-english">Grstric cancer</p></Link></li>
                <li><Link to="/cervicalcancer"><i className="icon icon-cervical"></i><h3>宫颈癌</h3><p className="font-english">Cervical cancer</p></Link></li>
                <li><Link to="/breastcancer"><i className="icon icon-breast"></i><h3>乳腺癌</h3><p className="font-english">Breast cancer</p></Link></li>
            </ul>

        )
    }
}