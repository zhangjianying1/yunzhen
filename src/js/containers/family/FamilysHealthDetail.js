import React from 'react';
import {connect} from 'react-redux';
import Ajax from '../../utils/Ajax';

import TumourDiagnosisResult from '../../components/health/TumourDiagnosisResult';
import BodyDetail from '../../components/health/BodyDetail';
import {preventLoadImg} from '../../utils/dom';
import {getRelationName} from '../../utils/getRelation';
require('../usercenter/usercenter.scss');
require('./familys.scss');
/**
 * 健康状况详情
 */
class FamilysHealthDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            familyData: props.familyData || []
        }
        this.ajax = new Ajax(this.props)
    }
    componentWillMount(){
        let tempData = {},
            id = this.props.params.id;

        // 遍历家庭成员
        this.state.familyData.map((family) => {

            // 如果是当前params 相对应的
            if (family.familyCode == id) {
                tempData = family;
            }
        })

        // 如果获取到数据
        if (tempData.id) {
            this.setState({
                familyData: tempData
            })
        } else {

            // ajax 取全部数据
            this.ajax.post({
                url: '/userController/familyQuery',
                sendData: {familyCode: familyCode},
                callback: (res) => {
                    this.setState({
                        familyData: res
                    })
                    // 加载图片
                    setTimeout(function(){
                        let imgs = document.querySelectorAll('img');
                        preventLoadImg(imgs);
                    }, 0)
                }

            })
        }

    }
    render(){
        let familyData = this.state.familyData;

        return(
            <PreventImg className="bg-2e2735">

                <dl>
                    <dt className="family-name"><i className={familyData.sex == 0 ? 'icon icon-family-man' : 'icon icon-family-woman'}></i>{getRelationName(familyData.sex, familyData.familyRelation)} {familyData.realName}</dt>
                    <dd>
                        <div className="user-diagnosis">
                            <section className="health">

                                <BodyDetail healthData={familyData}/>

                                <TumourDiagnosisResult healthData={familyData} />

                            </section>
                        </div>
                    </dd>
                </dl>
            </PreventImg>
        )
    }
}
const init = (state) => {
    return{
        familyData: state.familyData
    }
}

export default connect(init)(FamilysHealthDetail);