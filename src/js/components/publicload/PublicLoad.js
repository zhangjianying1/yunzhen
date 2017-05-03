import React from 'react';
import {Link} from 'react-router';
import Dorpdown from '../dorpdown/DorpDown';

/**
 * 推广列表
 */
class PublicLoad extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    //加载
    getData(label , data , flag) {

        //
        if (flag == undefined) {
            this.setState({
                data: {
                    ~${label}~: [1,2]
                }
            })
        } else {
            this.setState({
                data: this.state.data.concat(data)
            })
        }
        this.props.getData(this.state.data);

    }
    render(){

        return(
            <Dorpdown {...this.props} initFN={(label , data , flag) => this.getData(label , data , flag)} >
            {this.props.children}
            </Dorpdown>
            )
    }
}

export default PublicLoad;