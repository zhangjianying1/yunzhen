import React from 'react';
import ReactDOM from 'react-dom';
import PreventImg from '../../components/scrollload/PreventImg';
require('./showBody.scss');

export default class ShowBody extends React.Component{
    componentDidMount(){

        let bodyImg = ReactDOM.findDOMNode(this.refs.bodyImg),
            liver = ReactDOM.findDOMNode(this.refs.liver),
            lung = ReactDOM.findDOMNode(this.refs.lung),
            stomach = ReactDOM.findDOMNode(this.refs.stomach),
            breast = ReactDOM.findDOMNode(this.refs.breast),
            cervical = ReactDOM.findDOMNode(this.refs.cervical);







        //设置图片的位置
        let resizeImg = () => {


            let width = document.body.clientWidth - 60,
                height = document.body.clientHeight,
                sex = this.props.sex,
                liverT = sex == 0 ? 440 : 298,
                stomachT = sex == 0 ? 76 : 76,
                lungT = sex == 0 ? 12 : 0,
                breastT = sex == 0 ? 360 : 170,
                cervicalT = sex == 0 ? 0 : 678,
                bodyH = (bodyImg.offsetHeight * width) / bodyImg.offsetWidth;

            bodyImg.parentNode.style.height =  bodyH + 'px';

            if (liver != null) liver.style.top = (width * liverT)/630 + 'px';
            if (stomach != null) stomach.style.top = (width * stomachT)/630 + 'px';
            if (lung != null) lung.style.top = (width * lungT)/bodyH + 'px';

            if (breast != null) breast.style.top = (width * breastT)/630 + 'px';
            if (cervicalT > 0 && cervical != null) cervical.style.top = (width * cervicalT)/630 + 'px';
        }

        window.onresize = bodyImg.onload = resizeImg;

    }
    render(){
        let {sex, oDisease} = this.props;

        if (sex == 0){
            return(
                <PreventImg className="com-show-diagnosis" >
                    <img id="./images/disease/body-man.jpg" ref="bodyImg" />
                    { oDisease['001'] > 0 ? <img id="./images/disease/man-tumourConstitution.png"  ref="tumour"/> : null}
                    { oDisease['002'] > 0 ? <img id="./images/disease/man-liver.png"  ref="liver"/> : null}
                    { oDisease['003'] > 0 ? <img id="./images/disease/man-lung.png"  ref="lung"/> : null}
                    { oDisease['004'] > 0 ? <img id="./images/disease/man-stomach.png"  ref="stomach" /> : null}
                    { oDisease['005'] > 0 ? <img id="./images/disease/man-breast.png" ref="breast"/> : null}

                </PreventImg>
            )
        } else {
            return(
                <PreventImg className="com-show-diagnosis" >
                    <img id="./images/disease/body-woman.jpg" ref="bodyImg" />
                    { oDisease['001'] > 0 ? <img id="./images/disease/woman-tumourConstitution.png"  ref="tumour"/> : null}
                    { oDisease['002'] > 0 ? <img id="./images/disease/woman-liver.png"  ref="liver"/> : null}
                    { oDisease['003'] > 0 ? <img id="./images/disease/woman-lung.png" ref="lung"/> : null}
                    { oDisease['004'] > 0 ? <img id="./images/disease/woman-stomach.png" ref="stomach" /> : null}
                    { oDisease['005'] > 0 ? <img id="./images/disease/woman-breast.png" ref="breast"/> : null}
                    { oDisease['006'] > 0 ? <img id="./images/disease/woman-cervical.png" ref="cervical"/> : null}
                </PreventImg>
            )
        }
    }
}