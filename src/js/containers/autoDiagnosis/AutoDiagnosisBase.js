import React from 'react';
import ReactDOM from 'react-dom';
import Area from '../../components/area/Area';
import Input from '../../components/input/Input';
import Ajax from '../../utils/Ajax';
import Radio from '../../components/input/Radio';
require('./autoDiagnosisBase.scss');

export default class AutoDiagnosisBase extends React.Component{
    constructor(props){
        super(props);
        this.ajax = new Ajax(props);
        this.state = {};
    }
    componentWillMount(){
        let {params} = this.props;

        this.ajax.post({
            url: '/userController/lastSelfDiagnosis',
            sendData: {
                familyCode: params.id
            },
            callback: (res) => {
                this.setState(res);

            }
        })
    }
    setValue(label, val){
        this.state[label] = val;
        this.setState(this.state);
    }
    render(){

        return(
            <div className="bg-26202c auto-diagnosis">
                <h3 className="header-lh-3">基本信息</h3>
                <div className="self-base-content">
                    <section className="self-user-msg">



                        <div className="input-box">
                            <label className="c-9B99DF">出生地 <b className="font-english">Birthplace</b></label>
                            <div className="input">
                                <Area className="select" id="area1" val={this.state.birthAddress} setValue={(val) => this.setValue('birthAddress', val)}/>
                            </div>
                        </div>
                        <div className="input-box">
                            <label className="c-9B99DF">居住地 <b className="font-english">Residence</b></label>
                            <div className="input">
                                <Area className="select"  id="area2" val={this.state.liveAddress} setValue={(val) => this.setValue('liveAddress', val)}/>
                            </div>
                        </div>
                        <div className="input-box row-input">
                            <label className="c-9B99DF">居留时长/年</label>
                            <div className="input">
                                <Input type="tel" val={this.state.liveYear} name="liveYear" setValue={(label, val) => this.setValue(label,  val)} />
                            </div>
                        </div>


                    </section>
                    <section className="self-user-msg">


                        <div className="input-box ">
                            <label>教育程度 <i className="font-english">Education level</i></label>
                            <div className="self-radio">

                                <Radio val={this.state.educational}
                                       setValue={(val) => this.setValue('educational', val)}
                                       radioData={['初中以下', '高中', '大专以上']}
                                    />
                            </div>
                        </div>
                    </section>
                    <section className="self-user-msg">
                        <div className="input-box ">
                            <label>生活条件状况 <i className="font-english">Life condition</i></label>
                            <div className="self-radio">

                                <Radio val={this.state.liveCondition}
                                       setValue={(val) => this.setValue('liveCondition', val)}
                                       radioData={['极差', '较差', '一般', '良好', '极好']}
                                    />
                            </div>
                        </div>
                    </section>
                    <section className="self-user-msg">
                        <div className="input-box ">
                            <label>有无夜游史 <i className="font-english">There is no history of night</i></label>
                            <div className="self-radio">
                                <Radio val={this.state.field1}
                                       setValue={(val) => this.setValue('field1', val)}
                                       radioData={['有', '无']}
                                    />
                            </div>
                        </div>
                    </section>
                    <section className="self-user-msg">
                        <div className="input-box">
                            <label> 有无淋病、性病、尿道炎及下疳等病史 <br/><i className="font-english">There is no venereal disease, gonorrhea, urethritis and chancroid history</i></label>
                            <div className="self-radio">

                                <Radio val={this.state.field2}
                                       setValue={(val) => this.setValue('field2', val)}
                                       radioData={['有', '无']}
                                    />
                            </div>
                        </div>


                    </section>

                    <section className="self-user-msg">


                        <div className="input-box ">
                            <label>业余爱好 <i className="font-english">Hobbies</i></label>
                            <div className="input">
                                <Input type="text" val={this.state.avocation} maxlength={20} placeholder="限20字" name="allergy" setValue={(label, val) => this.setValue('avocation',  val)} />
                            </div>
                        </div>

                        <div className="input-box ">
                            <label>习惯嗜好 <i className="font-english">Habit hobby</i></label>
                            <div className="input">
                                <Input tagName="textarea" className="textarea" maxlength={50} placeholder="限50字" type="text" val={this.state.habitHobby} name="allergy" setValue={(label, val) => this.setValue('habitHobby',  val)} />
                            </div>
                            <dl className="textarea-tips display-box"><dt>注:</dt><dd>包括起居与卫生习惯, 饮食规律与质量,烟酒嗜好时间与摄入量以及其它异嗜物和麻醉品,毒品等</dd></dl>
                        </div>

                    </section>

                    <section className="self-user-msg">


                        <div className="input-box ">
                            <label>自述重要病症 <i className="font-english">Self important disease</i></label>
                            <div className="input">

                                <Input className="textarea" tagName="textarea" name="majorDisease" val={this.state.majorDisease} setValue={(label, val) => this.setValue(label,  val)} />
                            </div>
                        </div>


                    </section>

                </div>
                <div className="sub-button">
                    <button className="btn-60" onClick={() => this.subFN()}>下一步</button>
                </div>
            </div>
        )
    }
    subFN(){
        this.props.getState(this.state)

    }
}