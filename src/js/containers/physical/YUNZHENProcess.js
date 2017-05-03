import React from 'react';
import PreventImg from '../../components/scrollload/PreventImg';
import {preventLoadImg} from '../../utils/dom';

require('./process.scss');

export default class YUNZHENProcess extends React.Component{
    constructor(){
        "use strict";
        super();
        this.state = {
            isShowContent: false
        }
    }
    componentDidMount(){

        var inB = document.querySelectorAll('.in-randin b');
        var outB = document.querySelectorAll('.out-randin b');
        var len = 8;
        function setInPos(times, radius){


            len --;

            setPos(times[len], len, radius);

            setTimeout(function(){


                if (len > 0) {
                    setInPos(times, radius);
                }
            }, 200)



        }

        function setPos(obj, index, radius){

            var hudu = (2*Math.PI / 360) * 360/8 * index*7;

            obj.style.opacity = 1;
            obj.style.left = Math.sin(hudu) * radius + 'px';
            obj.style.top = Math.cos(hudu) * radius  + 'px';
        }

        function setOutPos(times, radius){


            for (var i = 0; i < times.length; i ++) {
                setPos(times[i], i, radius);
            }
        }
        setTimeout(function(){
            setInPos(inB, 39)

        }, 500)
        setTimeout(function(){
            setOutPos(outB, 59)

        }, 1800);

        outB[0].addEventListener('webkitTransitionEnd', () => {

            this.setState({
                isShowContent: true
            })

        }, false)
    }
    render(){
        "use strict";
        return(
            <div className="bg-2e2735" >

                {this.state.isShowContent ?
                    <PreventImg>
                    <dl className="yunzhen-process">
                        <dt className="teach">
                            <h2>云诊教学流程</h2>
                            <em className="font=english">TEACHING</em>
                            <div>
                                <img id="./images/process/teaching.jpg" />
                            </div>

                        </dt>
                        <dd className="process-des">
                            <em className="number">1</em>
                            <p>为了更好的服务于您，为了帮助您了解自己的身体状况，请您按照我们的方法步骤体验。</p>
                            <p className="font-english">In order to better serve you, in order to help you understand your physical condition, please follow our steps to experience.</p>
                        </dd>
                        <dd className="process-des">
                            <em className="number">2</em>
                            <p>把您的手机摄像头清洁干净，把耳朵、脸部、双手，把不干净的东西清除一下，把耳部周边头发清理一下（如图所示）</p>
                            <p className="font-english">Put your cell phone camera  clean, the ears, face, hands, clear the unclean things about, surrounding the ear hair clean up (as show)</p>
                            <div className="clean-way">
                                <div>
                                    <img id="./images/process/camera.jpg" />
                                    <p>镜头表面清洁</p>
                                    <p className="font-english">Clean the lens surface</p>
                                </div>
                                <div>
                                    <img id="./images/process/ear-clean.png" />
                                    <p>耳朵表面清洁</p>
                                    <p className="font-english">Clean the surface of the ear</p>
                                </div>
                            </div>
                        </dd>
                        <dd className="process-des">
                            <em className="number">3</em>
                            <p>打开手机拍照功能开始拍摄，找一位您身边的人帮您拍摄，手机与耳朵距离为10公分左右，请保持耐心，对焦清晰（如图所示），请勿在强光下和光线不足的状态下拍摄，请在自然光线下拍摄</p>
                            <p className="font-english">Open the phone camera to start shooting, looking for a people around you to help you shoot, phone and ear distance of about 10 cm,
                                please be patient in focus (as shown), do not light and low light status under shooting, shooting under natural light</p>
                            <img id="./images/process/right-ear.jpg" className="mt10" />
                            <img id="./images/process/left-ear.jpg" />
                            <img id="./images/process/face.jpg" />
                            <img id="./images/process/right-hand.jpg" />
                            <img id="./images/process/left-hand.jpg" />

                        </dd>
                        <dd className="process-des">
                            <em className="number">4</em>
                            <p>角度拍摄参考，正耳一张，左平移20度一张，右移20度一张，正脸一张，左右手各一张（如图所示）注明：不能化妆，脸部做过整形请标示</p>
                            <p className="font-english">Shooting Reference angle, a positive ear, left a pan 20 degrees, 20 degrees to the right one, a positive face,
                                (as shown) each indicate a right-hand man: You can not make-up, facial plastic surgery done, please marked.</p>
                            <img id="./images/process/left-ear.jpg" className="mt10" />
                            <div className="img-tips">平移左右各20度 再各拍一张<br/><em className="font-english"> Pan lefe and right 20 degrees<br/>and then take a picture of each</em></div>
                        </dd>
                        <dd className="process-des">
                            <em className="number">5</em>
                            <p>点击肿瘤筛查，按提示上传相册照片，我们开始后台比对运算，人工智能分析完成将以结果</p>
                            <p className="font-english">Click on camera screening, follow the prompts to upload the photo album, we began to match the background operation, artificial intelligence analysis is complete will result.</p>
                            <img id="./images/process/diagnosis.jpg" className="mt10" />
                        </dd>
                        <dd className="process-des">
                            <em className="number">6</em>
                            <p>您在“我的信息”里的“个人中心”看到自己的结果，当然您还可以为家人做筛查</p>
                            <p className="font-english">You see your results in the "My Infromation" in the "personal center" Of course, you can also do family screening.</p>
                            <img id="./images/process/diagnosis-result.jpg" className="mt10" />
                        </dd>
                        <dd className="process-des not-border">
                            <em className="number">7</em>
                            <p>为了帮助到更多人得到更早期的疾病筛查，您在朋友圈分享“有求云诊”，做为对您的奖励，我们会为您免费做三大癌症筛查，让您更好的了解自己身体状况，更早的做健康管理和干预。</p>
                            <p className="font-english">In order to help more people get more early disease screening, your circle of friends to share in the "cloud clinic has asked" as your reward,
                                we'll set you free to do there cancer screening, so you better understande their own physical condition, health management and make earlier interventions.</p>

                        </dd>
                    </dl>
                        </PreventImg>
                    :
                    <section className="transition-box">
                        <div className="logo">
                            <div className="english-name"><img src="./images/logo/yinwen.png" /></div>
                            <div className="china-name"><img src="./images/logo/zi.png" /></div>
                            <div className="transition-logo">
                                <img className="logo-cross" src="./images/logo/zhongxin.png" />
                                <div className="in-randin">
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                </div>
                                <div className="out-randin">
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                </div>

                            </div>
                        </div>
                    </section>
                }

            </div>
        )
    }
}