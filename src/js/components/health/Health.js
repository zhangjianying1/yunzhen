import React from 'react';
import TumourDiagnosisResult from '../../components/health/TumourDiagnosisResult';
import WholeBodyDiagnosisResult from '../../components/health/WholeBodyDiagnosisResult';

require('./health.scss');

class Health extends React.Component{
    render(){
        let {userData, notWholeBody} = this.props;
        return(
            <div className="user-diagnosis">
                <TumourDiagnosisResult healthData={userData} children={this.props.children} />
                {
                    ! notWholeBody ? <WholeBodyDiagnosisResult healthData={userData} children={this.props.children} /> : null
                }
            </div>
        )

    }
}

export default Health;