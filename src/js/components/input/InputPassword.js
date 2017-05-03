import React from 'react';
class InputPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: {
                name: this.props.name,
                val: this.props.val
            },
            type: !!this.props.type
        }
    }
    inputChange(e){
        let val = e.target.value;
        this.changeHandle(val);
    }
    toggle(){
        this.setState({
            type: !this.state.type
        })
    }
    changeHandle(val){
        if (this.props.maxlength) {
            val = val.substring(0, this.props.maxlength)
        }
        this.setState({
            input: {
                name: this.props.name,
                val: val
            }
        });
        this.props.inputHandle(this.props.name, val);
    }
    render(){
        return (
            <div className="form-control">
                <input onChange={(e) => this.inputChange(e)} type={this.state.type ? 'password' : 'text'} name={this.state.input.name}
                value={this.state.input.val} placeholder={this.props.placeholder} autoComplete="off" required />
                <span className={this.state.type ? 'input-control show-psd' : 'input-control hide-psd'} onClick={() => this.toggle()}></span>
            </div>
            )
    }
}
InputPassword.propTypes = {
    inputHandle: React.PropTypes.func.isRequired,
    name: React.PropTypes.string,
    type: React.PropTypes.string
}
export default InputPassword;