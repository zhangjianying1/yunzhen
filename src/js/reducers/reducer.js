import {combineReducers} from 'redux';

// 用户信息
let userData = (state='', action) => {
    switch(action.type) {
        case 'USER':
            return action.val
            break;
        default:
            return state;
    }
};

// 家庭成员信息
let familyData = (state='', action) => {
    switch(action.type) {
        case 'FAMILY':
            return action.val
            break;
        default:
            return state;
    }
};

// 微信的个人信息
let WEIXINData = (state='', action) => {
    switch(action.type) {
        case 'WEIXIN':
            return action.val
            break;
        default:
            return state;
    }
};
//加载状态
let loading = (state='', action) => {
    switch(action.type) {
        case 'LOADING':
            return action.val
            break;
        default:
            return state;
    }
};
//确定提示框
let confirmData = (state={}, action) => {
    switch(action.type) {
        case 'CONFIRM':
            return action.val
            break;
        default:
            return state;
    }
};
//alert提示
let alert = (state='', action) => {
    switch(action.type) {
        case 'ALERT':
            return action.val
            break;
        default:
            return state;
    }
};
//error
let error = (state='', action) => {
    switch(action.type) {
        case 'ERROR':
            return action.val
            break;
        default:
            return state;
    }
};

//信息填写不完整的提示
let prompt = (state='', action) => {
    switch(action.type) {
        case 'PROMPT':
            return action.val
            break;
        default:
            return state;
    }
};

//诊断记录
let diagnosisData = (state='', action) => {
    switch(action.type) {
        case 'DIAGNOSIS':
            return action.val
            break;
        default:
            return state;
    }
};



//健康详细记录
let healthData = (state='', action) => {
    switch(action.type) {
        case 'HEALTH':
            return action.val
            break;
        default:
            return state;
    }
};

let combineReducer = combineReducers({
    userData,
    loading,
    confirmData,
    alert,
    error,
    familyData,
    diagnosisData,
    healthData,
    prompt
})

export default combineReducer;