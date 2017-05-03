export let setUserData = function (val){
    return {type: 'USER', val};
}
export let setFamilyData = function (val){
    return {type: 'FAMILY', val};
}

export let loading = function (val){
    return {type: 'LOADING', val};
}
export let setAlert = function (val){
    return {type: 'ALERT', val};
}
export let setConfirm = function (val){
    return {type: 'CONFIRM', val};
}
export let setError = function (val){
    return {type: 'ERROR', val};
}

export let setPrompt = function (val){
    return {type: 'PROMPT', val};
}

export let setDiagnosisData = function(val) {
    return {type: 'DIAGNOSIS', val};
}



/*
 *  setHealthData
 */
export function setHealthData(val){
    return {type: 'HEALTH', val};
}


