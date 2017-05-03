import React from 'react';

class Pane extends React.Component{

    render(){
        return(
            <div>
        {
            this.props.isAct ? <div>{this.props.children}</div> : null
        }
        </div>
        )
    }
}

export default Pane;