
import superagent from 'superagent';

import {loading, setError} from '../actions/action';

/**
 * ajax
 * 每次加载信息都会显示加载loading
 */
export default class ajax {
    constructor(props){
        this.dispatch = (props && props.dispatch) || function(){};
        this.bBtn = true;
    }
    post(obj){
        this.dispatch(loading(true));


        if (this.bBtn) {
            this.bBtn = false;
            superagent.post(obj.url).set('Content-Type', 'application/x-www-form-urlencoded').send(obj.sendData).then((res) => {



                if (res.ok) {
                    let body = res.body;

                    if (body.code === '0000') {
                        obj.callback(body.result);
                    } else if (body.code == '1046' || body.code == '0999') {
                        obj.callback(body.code);
                    } else {
                        obj.callback(body.result);
                        this.dispatch(setError({prompt: true, msg: body.msg}));
                    }
                    this.dispatch(loading(false));
                }

                this.bBtn = true;
            })

        }


    }
    get(obj){
        this.dispatch(loading(true));


        if (this.bBtn) {
            this.bBtn = false;
            superagent.get(obj.url).set('Content-Type', 'application/x-www-form-urlencoded').query(obj.sendData).then((res) => {



                if (res.ok) {
                    let body = res.body;

                    body = {code: '0000'}
                    setTimeout(() => {
                        "use strict";
                        if (body.code === '0000' || body.code === '0999') {
                            obj.callback(body.result);
                        } else if (body.code == '1046') {
                            obj.callback(body.code);
                        } else {
                            this.dispatch(setError({prompt: true, msg: body.msg}));
                        }
                    }, 1000)

                    this.dispatch(loading(false));
                }

                this.bBtn = true;
            })

        }


    }

}

