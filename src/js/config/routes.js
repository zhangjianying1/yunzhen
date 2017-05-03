import {system} from '../utils/system';

let setTitle = function(title){

    let plateform = system();

    setTimeout(function(){

        document.title = title;

        if (plateform == 'ANDROID') return;

        var iframe = document.createElement('iframe'),
            body = document.body;
        iframe.src = '/favicon.ico';
        iframe.style.display = 'none';
        iframe.style.width = '1px';
        iframe.style.height = '1px';


        iframe.onload = function(){
            "use strict";

            setTimeout(function(){
                body.removeChild(iframe);
            }, 0);
        }
        body.appendChild(iframe);

    }, 100)

}


export default {
    component: require('../containers/main').default,
    childRoutes: [
        {
            path: '/usercenter',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle('个人中心');
                    callback(null, require('../containers/userCenter/UserCenter').default)
                })
            }
        },
        {
            path: '/prefect',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("完善个人资料")
                    callback(null, require('../containers/userCenter/Prefect').default)
                })
            }
        },

        {
            path: '/myhealthrecord/:id',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("我的健康报告记录");
                    callback(null, require('../containers/userCenter/HealthRecord').default)
                })
            }
        },
        {
            path: '/myhealthdetail/:id',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("我的健康详细报告");
                    callback(null, require('../containers/userCenter/HealthDetail').default)
                })
            }
        },
        {
            path: '/aboutYUNZHEN',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("关于云诊");
                    callback(null, require('../containers/physical/AboutYUNZHEN').default)
                })
            }
        },
        {
            path: '/YUNZHENprocess',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("云诊流程");
                    callback(null, require('../containers/physical/YUNZHENProcess').default)
                })
            }
        },
        {
            path: '/tumourscreening/:id',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("肿瘤筛查");
                    callback(null, require('../containers/physical/TumourScreening').default)
                })
            }
        },
        {
            path: '/cancerscreening/:id',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("癌症筛查");
                    callback(null, require('../containers/physical/CancerScreening').default)
                })
            }
        },
        {
            path: '/preventitem',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("预防措施");
                    callback(null, require('../containers/prevent/PreventItem').default)
                })
            }
        },
        {
            path: '/tumourconstitution',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("肿瘤体质");
                    callback(null, require('../containers/prevent/TumourConstitution').default)
                })
            }
        },
        {
            path: '/cancer',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("癌症");
                    callback(null, require('../containers/prevent/Cancer').default)
                })
            }
        },
        {
            path: '/livercancer',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("肝癌");
                    callback(null, require('../containers/prevent/LiverCancer').default)
                })
            }
        },
        {
            path: '/lungcancer',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("肺癌");
                    callback(null, require('../containers/prevent/LungCancer').default)
                })
            }
        },
        {
            path: '/stomachcancer',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("胃癌");
                    callback(null, require('../containers/prevent/StomachCancer').default)
                })
            }
        },
        {
            path: '/cervicalcancer',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("宫颈癌");
                    callback(null, require('../containers/prevent/CervicalCancer').default)
                })
            }
        },
        {
            path: '/breastcancer',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("乳腺癌");
                    callback(null, require('../containers/prevent/BreastCancer').default)
                })
            }
        },
        {
            path: '/familys',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("家庭中心");
                    callback(null, require('../containers/family/Familys').default)
                })
            }
        },
        {
            path: '/carefamily',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle('家庭中心');
                    callback(null, require('../containers/family/CareFamily').default)
                })
            }
        },
        {
            path: '/familyhealthrecord/:id',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("我的家人健康报告记录");
                    callback(null, require('../containers/userCenter/HealthRecord').default)
                })
            }
        },
        {
            path: '/familyhealthdetail/:id',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("我的家人健康详细报告");
                    callback(null, require('../containers/userCenter/HealthDetail').default)
                })
            }
        },
        {
            path: '/addfamily/:gender',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("添加家人");
                    callback(null, require('../containers/family/AddFamily').default)
                })
            }
        },
        {
            path: '/inputuser/:familyRelation/:gender',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("完善家人资料");
                    callback(null, require('../containers/family/InputUser').default)
                })
            }
        },
        {
            path: '/editoruser/:familyCode/:gender',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("完善家人资料");
                    callback(null, require('../containers/family/EditorUser').default)
                })
            }
        },

        {
            path: '/servicesupport',
            getComponents: (location, callback) => {
                require.ensure([], (require) => {
                    setTitle("服务支持");
                    callback(null, require('../containers/service/ServiceSupport').default)
                })
            }
        },
        {
            path: '/aboutus',
            getComponents: (location, callback) => {
                setTitle("关于我们");
                require.ensure([], (require) => {
                    callback(null, require('../containers/service/AboutUs').default)
                })
            }
        },

        {
            path: '/autodiagnosis/:id/:recordCode/:familyRelation',
            getComponents: (location, callback) => {
                setTitle("有求诊断问卷调查");
                require.ensure([], (require) => {
                    callback(null, require('../containers/autoDiagnosis/AutoDiagnosis').default)
                })
            }
        },
        //{
        //    path: '/autodiagnosisrecord',
        //    getComponents: (location, callback) => {
        //        setTitle("自诊详细记录");
        //        require.ensure([], (require) => {
        //            callback(null, require('../containers/autoDiagnosis/AutoDiagnosisRecord').default)
        //        })
        //    }
        //}

    ]
}