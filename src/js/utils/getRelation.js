export function getRelationName(gender, name){

    let callName,
        nameStr = name + '';

    switch (nameStr) {
        case '0':
            callName = '我';
            break;
        case '1':
            callName = '爷爷';
            break;
        case '2':
            callName = '奶奶';
            break;
        case '3':
            callName = '外公';
            break;
        case '4':
            callName = '外婆';
            break;
        case '5':
            callName = '爸爸';
            break;
        case '6':
            callName = '妈妈';
            break;
        case '7':

            if (gender == 0) {
                callName = '岳父';

            } else {
                callName = '公公';
            }
            break;

        case '8':
            if (gender == 0) {
                callName = '岳母';

            } else {
                callName = '婆婆';
            }
            break;

        case '9':
            if (gender == 0) {
                callName = '老婆';

            } else {
                callName = '老公';
            }
            break;

        case '10':
            callName = '儿子';
            break;
        case '11':
            callName = '女儿';
            break;
        case '12':
            callName = '兄弟';
            break;
        case '13':
            callName = '姐妹';
            break;
        //default:
    }
    return callName;
}
export function getRelationNum(gender, name){

    let callName,
        nameStr = name + '';

    switch (nameStr) {
        case '我':
            callName = 0;
            break;
        case '爷爷':
            callName = 1;
            break;
        case '奶奶':
            callName = 2;
            break;
        case '外公':
            callName = 3;
            break;
        case '外婆':
            callName =  4;
            break;
        case '爸爸':
            callName = 5;
            break;
        case '妈妈':
            callName = 6;
            break;
        case '岳父':
            callName = 7;
            break;
        case '公公':
            callName = 7;
            break;

        case '婆婆':
            callName = 8;
            break;
        case '岳母':
            callName = 8;
            break;

        case '老婆':
            callName = 9;
            break;
        case '老公':
            callName = 9;
            break;

        case '儿子':
            callName = 10;
            break;
        case '女儿':
            callName = 11;
            break;
        case '兄弟':
            callName = 12;
            break;
        case '姐妹':
            callName = 13;
            break;
        //default:
    }
    return callName;
}

export function transBloodName(str){
    str += '';

    switch (str) {

        case '0':
            return 'A型';
            break;
        case '1':
            return 'B型';
            break;
        case '2':
            return 'AB型';
            break;
        case '3':
            return 'O型';
            break;
        default:
            return str;
    }
}
export function transBloodNum(str){



    switch (str) {
        case 'A型':
            return 0;
            break;
        case 'B型':
            return 1;
            break;
        case 'AB型':
            return 2;
            break;
        case 'O型':
            return 3;
            break;

        default:
            return str;
    }
}

// 根据用户自己的性别和家庭关系获得性别
export function getGender(gender, familyRelation){
    if (familyRelation == 1 || familyRelation == 3 || familyRelation == 5 || familyRelation == 7 || familyRelation == 10 || familyRelation == 12) {
        return 0;
    }
    if (familyRelation == 2 || familyRelation == 4 || familyRelation == 6 || familyRelation == 8 || familyRelation == 11 || familyRelation == 13) {
        return 1;
    }
    if ((gender == 0) && (familyRelation == 9)) {
        return 1;
    } else {
        return 0;
    }
}
