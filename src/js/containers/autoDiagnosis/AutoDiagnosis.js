import React from 'react'
import {connect} from 'react-redux';
import Radio from '../../components/input/Radio';
import RadioBorder from '../../components/input/RadioBorder';
import Checkbox from '../../components/input/Checkbox';
import Input from '../../components/input/Input';
import RadioTab from '../../components/tab/RadioTab';
import Pane from '../../components/tab/Pane';
import AutoDiagnosisBase from './AutoDiagnosisBase';
import Ajax from '../../utils/Ajax';
import {setAlert, setUserData} from '../../actions/action';
import {isObject} from '../../utils/object';
require('./autoDiagnosis.scss')

class AutoDiagnosis extends React.Component{
    constructor(props){
        super(props);
        this.ajax = new Ajax(props);

        this.state = {
            next: false,
            toggle: {},
            baseMsg: {},
            bodyMsg: {
                breathDetail:{                       // 呼吸系统
                    cough: {
                        name: '有无咳嗽',
                        val: '',
                        property: {
                            degree: {
                                name: '咳嗽程度',
                                val: ''
                            }
                        }
                    },
                    sputum: {
                        name: '有无咳痰',
                        val: '',
                        property: {
                            sputumColor: {
                                label: '有无咳痰',
                                name: '咳痰颜色',
                                val: ''
                            },
                            sputumAmount: {
                                label: '有无咳痰',
                                name: '痰量',
                                val: ''
                            },
                            sputumViscoisty: {
                                label: '有无咳痰',
                                name: '痰粘稠度',
                                val: ''
                            },
                            sputumTaste: {
                                label: '有无咳痰',
                                name: '痰的气味',
                                val: ''
                            }
                        }
                    }


                },
                loopDetail: {                       // 循环系统
                    palpitation: {
                        name: '有无心悸',
                        val: '',
                        property: {
                            frequency: {
                                label: '有无心悸',
                                name: '心悸频率',
                                val: ''
                            },
                            duration: {
                                name: '心悸持续时间',
                                val: ''
                            },
                        }
                    },
                          // 持续时间
                    urine: {
                        name: '尿量',
                        val: '一般'
                    },                      // 尿量
                    ascities: {
                        name: '有无腹水',
                        val: '无'
                    },                   // 腹水
                    amaurosis: {
                        name: '有无突然黑蒙经历',
                        val: '无'
                    },                  // 黑蒙
                    syncope: {
                        name: '有无晕厥经历',
                        val: '无'
                    },                    // 晕厥
                    medicalHistory: {
                        name: '有无风湿热、<br/>高血压、</br>动脉硬化等病史',
                        val: '无'
                    },              // 有无风湿热、高血压、动脉硬化等病史
                    gestation:  {
                        name: '妊娠、分娩时有无水肿、心悸',
                        val: '无'
                    }                  //  妊娠、分娩时有无水肿、心悸（限女性病人填写）


                },
                digestDetail: {                     // 消化系统
                    bellyache: {
                        name: '有无腹痛',
                        val: '',
                        property: {
                            symptom: {
                                name: '腹痛症状',
                                val: ''
                            }
                        }
                    },
                    tumor: {
                        name: '腹部肿块',
                        val: '',
                        property: {
                            tumorPosition: {
                                name: '腹部肿块位置',
                                val: ''
                            },                      // 肿块
                            tumorSize: {
                                name: '腹部肿块大小',
                                val: ''
                            },                   // 肿块大小
                            pain: {
                                name: '是否有疼痛或压痛',
                                val: ''
                            },
                        }
                    },
                    constipation: {
                        name: '有无便秘或腹泻与便秘交替',
                        val: '无'
                    },
                    nausea: {
                        name: '有无呕吐',
                        val: '',
                        property: {
                            time: {
                                name: '恶心呕吐发生时间',
                                val: ''
                            },                           //恶心呕吐时间
                            count: {
                                name: '呕吐次数',
                                val: ''
                            },                          // 呕吐次数
                            relationship: {
                                name: '与进食的关系',
                                val: ''
                            },                   // 进食关系
                        }
                    },
                    h: {
                        name: '有无呕血',
                        val: '',
                        property: {
                            haematemesisAmount: {
                                name: '呕血量',
                                val: ''
                            },
                            heamatemesisColor: {
                                name: '呕血颜色',
                                val: ''
                            },
                            heamatemesisOther: {
                                name: '是否伴有食物及胃液',
                                val: ''
                            }
                        }
                    },
                    diarrhea: {
                        name: '有无腹泻',
                        val: '',
                        property: {
                            diarrheaCount: {
                                name: '腹泻次数',
                                val: ''
                            },                // 腹泻次数
                            diarrheaColor: {
                                name: '粪便颜色',
                                val: ''
                            },             // 腹泻颜色
                            diarrheaOther: {
                                name: '有无粘液，脓血及不消化的食物',
                                val: ''
                            },             // 有无粘液.脓血及不消化的食物
                        }
                    },
                    yellowing: {
                        name: '有无黄染',
                        val: '',
                        property: {
                            urineCount: {
                                name: '黄染的症状',
                                val: ''
                            },                // 黄染次数
                            urineColor: {
                                name: '小便颜色',
                                val: ''
                            },                 // 黄染颜色
                        }
                    }

                },
                urinaryDetail: {             // 泌尿系统

                    symptom: {
                        name: '症状',
                        val: ''
                    },            // 症状
                    medicalHistory: {
                        name: '既往病史',
                        val: ''
                    }      // 既往病史
                },
                bloodDetail: {           // 血液系统
                    symptom: {
                        name: '症状',
                        val: ''
                    },          //症状
                    allergy: {
                        name: '有无药物中毒，过敏、放射性物质接触史和长期习惯性用药',
                        val: ''
                    },         // 过敏
                },
                endocrineDetail: {          // 代谢与内分泌系统
                    symptom: {
                        name: '症状',
                        val: ''
                    },            // 症状
                    body: {
                        name: '身体异常或改变',
                        val: ''
                    },               // 身体
                    medicalHistory: {
                        name: '既往疾病',
                        val: ''
                    },
                    relativesHealthStatus: {
                        name: '亲属健康状况',
                        val: ''
                    }
                },
                nerveDetail: {
                    headPain: {
                        name: '有无头痛',
                        val: '',
                        property: {
                            headPainPosition: {
                                name: '头痛部位',
                                val: ''
                            },
                            painNature: {
                                name: '头痛性质',
                                val: ''
                            },
                            painDuration: {
                                name: '持续时间',
                                val: ''
                            }
                        }
                    },

                    otherSymptom: {
                        name: '其它症状',
                        val: ''
                    },
                    status: {
                        name: '情绪状态、思维过程、智能、能力、自知力等',
                        val: ''
                    }
                },
                sportDetail: {
                    muscle: {
                        name: '肌肉',
                        val: ''
                    },
                    joint: {
                        name: '关节',
                        val: ''
                    }
                }
            },

        }
    }
    setValue(){
        let paramArr = arguments,
            tempObj = {};

        for (let i = 0; i < paramArr.length-1; i ++) {

            if (i == 0) {

                tempObj = this.state.bodyMsg[paramArr[i]];
            } else {

                tempObj = tempObj[paramArr[i]];

            }

        }

        tempObj.val = paramArr[arguments.length-1];

        this.setState(this.state);
    }
    getState(val){
        this.state.baseMsg = val;

        // 切换视图
        this.state.next = true;
        this.setState(this.state);
    }
    toggle(label){
        this.state.toggle[label] = !this.state.toggle[label];
        this.setState(this.state);
    }
    render(){
        let bodyMsg = this.state.bodyMsg;

        if (!this.state.next) {
            return(<AutoDiagnosisBase getState={(val) => this.getState(val)} {...this.props} />)
        } else {

            return (
            <div className="not-scroll-main">
                <div className="auto-diagnosis-nav">

                    <div className="nav-box">
                        <div className={this.state.toggle.breath ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('breath')} >
                            <div className="nav-h-content">
                                <b className="icon-tit icon-breath"></b>
                                <h2 className="">
                                    呼吸系统

                                    <b className="font-english">Respiratory system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.breath ? 'block' : 'none'}}>
                            <div className="bor-content">
                                <RadioTab title="有无咳嗽" setValue={(val) => this.setValue('breathDetail', 'cough', val)} >
                                    <Pane title="无"></Pane>
                                    <Pane title="有">
                                        <div className="bor-content">
                                            <RadioBorder title="程度" val={bodyMsg.breathDetail.cough.property.degree.val}
                                                   setValue={(val) => this.setValue('breathDetail', 'cough', 'property', 'degree', val)}
                                                   radioData={['轻微', '中度', '严重']}/>
                                            </div>
                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioTab title="有无咳痰" setValue={(val) => this.setValue('breathDetail', 'sputum', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">

                                        <div className="bor-content">
                                            <RadioBorder title="颜色:" val={bodyMsg.breathDetail.sputum.property.sputumColor.val}
                                                       setValue={(val) => this.setValue('breathDetail', 'sputum', 'property', 'sputumColor', val)}
                                                       radioData={['色轻', '色重']}/>

                                            <RadioBorder title="痰量:" val={bodyMsg.breathDetail.sputum.property.sputumAmount.val}
                                                       setValue={(val) => this.setValue('breathDetail', 'sputum', 'property', 'sputumAmount', val)}
                                                       radioData={['量少', '量多']}/>
                                         <RadioBorder title="粘稠度:" val={bodyMsg.breathDetail.sputum.property.sputumViscoisty.val}
                                                        setValue={(val) => this.setValue('breathDetail', 'sputum', 'property', 'sputumViscoisty', val)}
                                                        radioData={['粘稠度低', '粘稠度高']}/>
                                        <RadioBorder title="气味:" val={bodyMsg.breathDetail.sputum.property.sputumTaste.val}
                                                       setValue={(val) => this.setValue('breathDetail', 'sputum', 'property', 'sputumTaste', val)}
                                                       radioData={['气味无', '气味有']}/>
                                        </div>
                                    </Pane>
                                </RadioTab>
                            </div>
                        </div>
                    </div>
                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.loop ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('loop')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-loop"></b>
                                <h2 className="">
                                    循环系统

                                    <b className="font-english">Circulatory system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.loop ? 'block' : 'none'}}>
                            <div className="bor-content">
                                <RadioTab title="有无心悸" setValue={(val) => this.setValue('loopDetail', 'palpitation', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">

                                            <RadioBorder title="频率:" val={bodyMsg.loopDetail.palpitation.property.frequency.val}
                                                         setValue={(val) => this.setValue('loopDetail', 'palpitation', 'property', 'frequency', val)}
                                                         radioData={['偶尔', '经常']}/>
                                            <RadioBorder title="持续时间:" val={bodyMsg.loopDetail.palpitation.property.duration.val}
                                                          setValue={(val) => this.setValue('loopDetail', 'palpitation', 'property', 'duration', val)}
                                                          radioData={['一周以上', '一月以上', '一年以上']} />

                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="尿量" val={bodyMsg.loopDetail.urine.val}
                                            setValue={(val) => this.setValue('loopDetail', 'urine',  val)}
                                            radioData={['多', '一般', '少']}/>
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="有无腹水" val={bodyMsg.loopDetail.ascities.val}
                                              setValue={(val) => this.setValue('loopDetail', 'ascities', val)}
                                              radioData={['无', '有']}/>
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="有无突然黑蒙经历" val={bodyMsg.loopDetail.amaurosis.val}
                                                  setValue={(val) => this.setValue('loopDetail', 'amaurosis', val)}
                                                  radioData={['无', '有']}/>
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="有无晕厥经历" val={bodyMsg.loopDetail.syncope.val}
                                                setValue={(val) => this.setValue('loopDetail', 'syncope', val)}
                                                radioData={['无', '有']}/>
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="有无风湿热、<br/>高血压、<br/>动脉硬化等病史" val={bodyMsg.loopDetail.medicalHistory.val}
                                                          setValue={(val) => this.setValue('loopDetail', 'medicalHistory', val)}
                                                          radioData={['无', '有']}/>
                            </div>
                            <div className="bor-content">



                                <RadioBorder className="radio-big-border" title="妊娠、分娩时有无水肿、心悸（<b style='font-size: .1rem'>限女性病人填写</b>）" val={bodyMsg.loopDetail.gestation.val}
                                         setValue={(val) => this.setValue('loopDetail', 'gestation', val)}
                                         radioData={['无', '有']}/>
                            </div>
                        </div>
                    </div>

                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.digest ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('digest')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-digest"></b>
                                <h2 className="">
                                    消化系统

                                    <b className="font-english">Digestive system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.digest ? 'block' : 'none'}}>
                            <div className="bor-content">
                                <RadioTab title="有无腹痛" setValue={(val) => this.setValue('digestDetail', 'bellyache', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">
                                        <div className="bor-content">
                                            <Checkbox title="伴有症状:" val={bodyMsg.digestDetail.bellyache.property.symptom.val}
                                                      setValue={(val) => this.setValue('digestDetail', 'bellyache',  'property', 'symptom', val)}
                                                      checkData={['腹胀', '反酸', '暖气', '恶心呕吐', '腹泻', '呕血', '便血', '发热', '皮肤黏膜黄染']}
                                                />
                                        </div>


                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioTab title="有无肿块" setValue={(val) => this.setValue('digestDetail', 'tumor', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">

                                            <Checkbox title="肿块部位:" val={bodyMsg.digestDetail.tumor.property.tumorPosition.val}
                                                   setValue={(val) => this.setValue('digestDetail', 'tumor', 'property', 'tumorPosition', val)}
                                                   checkData={['右上腹', '中上腹', '左上腹', '左右腰部', '右下腹', '左下腹']}
                                                />

                                        <div className="small-input-border">肿块大小: 约<Input type="tel" val={bodyMsg.digestDetail.tumor.property.tumorSize.val} name="tumorSize"
                                                           setValue={(label, val) => this.setValue('digestDetail', 'tumor', 'property', label, val)}/>CM
                                        </div>
                                        <RadioBorder title="疼痛或压痛:" val={bodyMsg.digestDetail.tumor.property.pain.val}
                                                           setValue={(val) => this.setValue('digestDetail', 'tumor', 'property', 'pain', val)}
                                                           radioData={['无', '有']}/>


                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="有无便秘或腹泻与便秘交替" val={bodyMsg.digestDetail.constipation.val}
                                                      setValue={(val) => this.setValue('digestDetail', 'constipation', val)}
                                                      radioData={['无', '有']}/>
                            </div>
                            <div className="bor-content">
                                <RadioTab title="有无恶心呕吐" setValue={(val) => this.setValue('digestDetail', 'nausea', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">
                                        <Checkbox title="发生时间:" val={bodyMsg.digestDetail.nausea.property.time.val}
                                                      setValue={(val) => this.setValue('digestDetail', 'nausea', 'property', 'time', val)}
                                                      checkData={['清晨', '晚上、夜间', '进食时或感官刺激', '进食一段时间后', '乘车、船等时']}
                                                />

                                        <RadioBorder title="次数:" val={bodyMsg.digestDetail.nausea.property.count.val}
                                                        setValue={(val) => this.setValue('digestDetail', 'nausea', 'property', 'count', val)}
                                                        radioData={['偶尔', '有时', '经常', '总是']}/>


                                        <Checkbox title="与进食关系:" val={bodyMsg.digestDetail.nausea.property.relationship.val}
                                                  setValue={(val) => this.setValue('digestDetail', 'nausea',  'property', 'relationship', val)}
                                                  checkData={['餐中或餐后立即呕吐', '餐后1小时以上呕吐', '餐后近期集体呕吐', '餐后较久或数餐后呕吐（6小时以上)']}
                                            />



                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioTab title="有无呕血" setValue={(val) => this.setValue('digestDetail', 'h', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">

                                            <RadioBorder title="呕血量:" val={bodyMsg.digestDetail.h.property.haematemesisAmount.val}
                                                   setValue={(val) => this.setValue('digestDetail', 'h', 'property', 'haematemesisAmount', val)}
                                                   radioData={['少于400毫升', '500-1500毫升', '1500毫升以上']}
                                                />

                                        <RadioBorder title="呕血颜色:" val={bodyMsg.digestDetail.h.property.heamatemesisColor.val}
                                                          setValue={(val) => this.setValue('digestDetail', 'h', 'property', 'heamatemesisColor', val)}
                                                          radioData={['鲜红色', '暗红色', '咖啡色']}/>
                                        <RadioBorder title="是否伴有实物及胃液:" val={bodyMsg.digestDetail.h.property.heamatemesisOther.val}
                                                              setValue={(val) => this.setValue('digestDetail', 'h', 'property', 'heamatemesisOther', val)}
                                                              radioData={['无', '有']}/>
                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioTab title="有无腹泻" setValue={(val) => this.setValue('digestDetail', 'diarrhea', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">
                                        <RadioBorder title="次数:" val={bodyMsg.digestDetail.diarrhea.property.diarrheaCount.val}
                                                   setValue={(val) => this.setValue('digestDetail', 'diarrhea', 'property', 'diarrheaCount', val)}
                                                   radioData={['偶尔', '时常', '经常', '总是']}
                                                />

                                        <RadioBorder title="粪便颜色:" val={bodyMsg.digestDetail.diarrhea.property.diarrheaColor.val}
                                                          setValue={(val) => this.setValue('digestDetail', 'diarrhea', 'property', 'diarrheaColor', val)}
                                                          radioData={['黄色', '苍白色', '浅灰色', '红色', '黑色', '中度褐色', '深褐色']}/>

                                        <RadioBorder title="有无粘液，脓血<br/>及不消化的食物:" val={bodyMsg.digestDetail.diarrhea.property.diarrheaOther.val}
                                                                   setValue={(val) => this.setValue('digestDetail', 'diarrhea',  'property', 'diarrheaOther', val)}
                                                                   radioData={['无', '有']}/>
                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <RadioTab title="有无黄染" setValue={(val) => this.setValue('digestDetail', 'yellowing', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">
                                            <RadioBorder title="症状表现:" val={bodyMsg.digestDetail.yellowing.property.urineCount.val}
                                                   setValue={(val) => this.setValue('digestDetail', 'yellowing', 'property', 'urineCount', val)}
                                                   radioData={['间歇性', '持续加重']}
                                                />
                                            <RadioBorder title="小便颜色:" val={bodyMsg.digestDetail.yellowing.property.urineColor.val}
                                                          setValue={(val) => this.setValue('digestDetail', 'yellowing',  'property', 'urineColor', val)}
                                                          radioData={['正常', '不正常']}/>
                                    </Pane>
                                </RadioTab>
                            </div>
                        </div>
                    </div>
                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.urinary ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('urinary')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-urinary"></b>
                                <h2 className="">
                                    泌尿系统

                                    <b className="font-english">Urinary system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.urinary ? 'block' : 'none'}}>
                            <div className="bor-content">

                                <Checkbox className="radio-big-border" title="症状" val={bodyMsg.urinaryDetail.symptom.val}
                                          setValue={(val) => this.setValue('urinaryDetail', 'symptom', val)}
                                          checkData={['尿痛', '尿急', '尿频', '少尿', '血尿', '浓尿', '尿液增加', '水肿', '腹痛', '小便疼痛', '放射痛', '尿流中断', '贫血']}
                                    />
                            </div>
                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="既往病史" val={bodyMsg.urinaryDetail.medicalHistory.val}
                                          setValue={(val) => this.setValue('urinaryDetail', 'medicalHistory', val)}
                                          checkData={['咽喉炎', '水肿', '高血压', '出血']}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.blood ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('blood')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-blood"></b>
                                <h2 className="">
                                    血液系统

                                    <b className="font-english">Blood system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.blood ? 'block' : 'none'}}>


                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="症状" val={bodyMsg.bloodDetail.symptom.val}
                                          setValue={(val) => this.setValue('bloodDetail', 'symptom', val)}
                                          checkData={['头晕眼花', '皮肤黏膜苍白', '虚弱', '出血', '瘀斑', '皮肤黄染', '水肿', '发热', '淋巴结肿大', '肝脾肿大']}
                                    />
                            </div>
                            <div className="bor-content">
                                <div className="big-input-border">
                                    <div className="input-label">有无药物中毒，过敏、放射性物质接触史和长期习惯性用药</div>
                                    <Input type="text" placeholder="药物名称" val={bodyMsg.bloodDetail.allergy.val} name="allergy"
                                       setValue={(label, val) => this.setValue('bloodDetail', label,  val)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.metabolism ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('metabolism')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-metabolism"></b>
                                <h2 className="">
                                    代谢与内分泌系统

                                    <b className="font-english">Metabolism and endocrine system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.metabolism ? 'block' : 'none'}}>


                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="症状" val={bodyMsg.endocrineDetail.symptom.val}
                                          setValue={(val) => this.setValue('endocrineDetail', 'symptom', val)}
                                          checkData={['畏寒', '怕冷', '多汗', '乏力', '心悸', '多饮', '多食', '多尿', '水肿', '肌肉震颤与痉挛']}
                                    />
                                </div>
                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="身体异常或改变" val={bodyMsg.endocrineDetail.body.val}
                                          setValue={(val) => this.setValue('endocrineDetail', 'body', val)}
                                          checkData={['性器官发育', '骨骼', '甲状腺', '体重', '皮肤', '毛发', '性格', '智力', '体格']}
                                    />
                            </div>
                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="既往病史" val={bodyMsg.endocrineDetail.medicalHistory.val}
                                          setValue={(val) => this.setValue('endocrineDetail', 'medicalHistory', val)}
                                          checkData={['外伤', '手术', '产后大出血']}
                                    />
                            </div>
                            <div className="bor-content">
                                <div className="big-input-border">
                                    <div className="input-label">亲属健康状况:</div>
                                    <Input className="fs12" type="text" val={bodyMsg.endocrineDetail.relativesHealthStatus.val}
                                           name="relativesHealthStatus" placeholder="描述直系亲属关系与健康疾病信息"
                                           setValue={(label, val) => this.setValue('endocrineDetail', label, val)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.nervous ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('nervous')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-nervous"></b>
                                <h2 className="">
                                    神经系统

                                    <b className="font-english">Nervous system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.nervous ? 'block' : 'none'}}>
                            <div className="bor-content">
                                <RadioTab title="有无头痛" setValue={(val) => this.setValue('nerveDetail', 'headPain', val)}>
                                    <Pane title="无"></Pane>
                                    <Pane title="有">
                                            <RadioBorder title="部位:" val={bodyMsg.nerveDetail.headPain.property.headPainPosition.val}
                                                   setValue={(val) => this.setValue('nerveDetail', 'headPain', 'property', 'headPainPosition', val)}
                                                   radioData={['单侧', '双侧', '局部', '弥散', '前头部', '顶部', '颞部', '枕部', '全头', '颅内', '颅外']}
                                                />

                                        <RadioBorder title="性质:" val={bodyMsg.nerveDetail.headPain.property.painNature.val}
                                                          setValue={(val) => this.setValue('nerveDetail',  'headPain', 'property', 'painNature', val)}
                                                          radioData={['胀痛', '搏动样跳动', '刀剜样或电击样刺痛', '剧烈疼痛']}/>

                                        <RadioBorder title="时间:" val={bodyMsg.nerveDetail.headPain.property.painDuration.val}
                                                        setValue={(val) => this.setValue('nerveDetail', 'headPain', 'property', 'painDuration', val)}
                                                        radioData={['瞬间', '持续数小时', '持续数日', '持续数月', '每日几乎定时反复发作', '一个月2~3次发作', '午后至夜间有加重倾向', '清晨疼痛加重']}/>

                                    </Pane>
                                </RadioTab>
                            </div>
                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="其它症状" val={bodyMsg.nerveDetail.otherSymptom.val}
                                          setValue={(val) => this.setValue('nerveDetail', 'otherSymptom', val)}
                                          checkData={['失眠', '意识障碍', '视力障碍', '记忆力减退', '昏厥', '抽搐', '痉挛', '瘫痪', '性格改变', '感觉与运动异常', '感觉与定向障碍']}
                                    />
                            </div>
                            <div className="bor-content">
                                <RadioBorder className="radio-big-border" title="情绪状态、思维过程、智能、能力、自知力等" val={bodyMsg.nerveDetail.status.val}
                                                              setValue={(val) => this.setValue('nerveDetail', 'status', val)}
                                                              radioData={['正常', '异常']}/>
                            </div>
                        </div>
                    </div>
                    <div className="nav-box">
                        <div className="nav-h" className={this.state.toggle.locomotor ? 'nav-h active' : 'nav-h'} onClick={() => this.toggle('locomotor')}>
                            <div className="nav-h-content">
                                <b className="icon-tit icon-locomotor"></b>
                                <h2 className="">
                                    运动系统

                                    <b className="font-english">Locomotor system</b>
                                </h2>
                                <i className="icon icon-more"></i>
                            </div>
                        </div>
                        <div className="nav-b" style={{display: this.state.toggle.locomotor ? 'block' : 'none'}}>
                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="肌肉" val={bodyMsg.sportDetail.muscle.val}
                                          setValue={(val) => this.setValue('sportDetail', 'muscle', val)}
                                          checkData={[{val: '正常'}, '麻木', '萎缩', '痉挛']}
                                    />
                            </div>
                            <div className="bor-content">
                                <Checkbox className="radio-big-border" title="关节" val={bodyMsg.sportDetail.joint.val}
                                          setValue={(val) => this.setValue('sportDetail', 'joint', val)}
                                          checkData={[{val: '正常'}, '肿胀', '疼痛', '变形', '骨折', '脱位', '活动受限', '先天缺陷']}
                                    />
                            </div>
                        </div>
                    </div>

                </div>
                <button className="btn-60" onClick={() => this.subFN()}>提交</button>
            </div>
            )
        }
    }
    subFN(){
        let {bodyMsg, baseMsg} = this.state,
            {params, dispatch, userData} = this.props;

        for (let i in bodyMsg) {
            let property = bodyMsg[i],
                joinStr = '';

            for (let h in property) {
                let val = property[h].val,
                    name = property[h].name,
                    params = property[h].property;

                if (val) {

                    if (!joinStr) {
                        joinStr += name + ':' + val + ' ';

                    } else {
                        joinStr += '; ' + name + ':' + val + ' ';

                    }

                }

                // 如果还有其它属性
                if (isObject(params)) {

                    for (let w in params) {
                        let val = params[w].val,
                            name = params[w].name;

                        if (val) {

                            // 特殊字段
                            if (w == 'tumorSize') {
                                joinStr += (name + ':' + val + 'cm ');
                            } else {
                                joinStr += (name + ':' + val + ' ');
                            }
                        }
                    }
                }
            }
            bodyMsg[i] = joinStr;
        }

        this.ajax.post({
            url: '/userController/selfDiagnosis',
            sendData: {
                familyCode: params.id,
                recordCode: params.recordCode,
                birthAddress: baseMsg.birthAddress,
                liveAddress: baseMsg.liveAddress,
                liveYear: baseMsg.liveYear,
                //学历
                educational: baseMsg.educational,
                //生活条件状况
                liveCondition: baseMsg.liveCondition,
                //业余爱好
                avocation: baseMsg.avocation,
                //业余嗜好
                habitHobby: baseMsg.habitHobby,
                //有无夜游史
                field1: baseMsg.field1,
                //有无淋病、性病、尿道炎及下疳等病史
                field2: baseMsg.field2,
                //自述重要病症
                majorDisease: baseMsg.majorDisease,

                //自诊呼吸系统
                breathDetail: bodyMsg.breathDetail,
                //自诊循环系统
                loopDetail: bodyMsg.loopDetail,
                //自诊消化系统
                digestDetail: bodyMsg.digestDetail,
                //自诊泌尿系统
                urinaryDetail: bodyMsg.urinaryDetail,
                //自诊血液系统
                bloodDetail: bodyMsg.bloodDetail,
                //自诊代谢与内分泌系统
                endocrineDetail: bodyMsg.endocrineDetail,
                //自诊神经系统
                nerveDetail: bodyMsg.nerveDetail,
                //自诊运动系统
                sportDetail: bodyMsg.sportDetail
            },
            callback: (res) => {

                dispatch(setAlert({
                    msg: '您已成功提交自述症状问卷，<br/>请到  <a style="display: inline-block" class="c-red" href="' +
                    (params.familyRelation == 0 ? '#/usercenter' : '#/familys') + '">' + (params.familyRelation == 0 ? '个人中心' : '家庭中心') + '</a> 查看诊断结果',
                    isShow: true,
                    fn: () => {
                        this.context.router.push(params.familyRelation == 0 ? '/usercenter' : '/familys');
                    }
                }))

            }
        })
    }
}

AutoDiagnosis.contextTypes = {
    router: React.PropTypes.object.isRequired
}

let init = (state) => {
    return{
        userData: state.userData
    }
}
export default connect(init)(AutoDiagnosis);