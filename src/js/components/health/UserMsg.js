import React from 'react';
import {Link} from 'react-router';
import {getRelationName} from '../../utils/getRelation';
import {hideKey} from '../../utils/hideKey'
require('./userMsg.scss');
/**
 * 个人基本信息
 */
class UserMsg extends React.Component{


    render(){
        let {userData, sex} = this.props;

        return(

            <div className="user-main">
                <div className="user-box">
                    <img className="user-photo" src={userData.headImgUrl ? userData.headImgUrl : './images/icon-photo.png'} />
                    <div className="user-msg display-box">
                        <h2>{!userData.familyRelation ? userData.nickName : (getRelationName(sex, userData.familyRelation) + " " + userData.realName)}</h2>
                        {
                            !userData.familyRelation ? <Link to="/prefect" className="icon icon-editor"></Link> : null
                        }
                    </div>
                    <div className="user-detail">
                        <dl>
                            {
                                !userData.familyRelation ? <dd>ID: {userData.memberCode}</dd> : null
                            }
                            {
                                !userData.familyRelation ? <dd>TEL: {hideKey(userData.mobile, 3, 4)}</dd> : null
                            }
                            <dd className="display-box">
                                <div className="flex-1">性别: {userData.sex == 0 ? '男' : (userData.sex == 1) ? '女' : '-'}</div>
                                <div className="flex-1">年龄: {userData.age == 0 ? '-' : userData.age}</div>
                                <div className="flex-1">血型: {userData.blood == 0 ? 'A型' : userData.blood == 1 ? '  B型' : userData.blood == 2 ? 'AB型' : userData.blood == 3 ? 'O型' : '-'}</div>
                            </dd>

                        </dl>
                    </div>
                </div>
            </div>

        )
    }
}

export default UserMsg;