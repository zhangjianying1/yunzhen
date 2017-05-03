import React from 'react';
class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: {
                name: this.props.name,
                val: this.props.val
            },
            msg: this.props.msg
        }
    }
    inputChange(e){
        let val = e.target.value;
        this.changeHandle(val);
    }
    clearVal(){
        this.changeHandle('')
    }
    changeHandle(val){
        let msg = '',
            props = this.props;

        if (props.maxlength) {
            val = val.substring(0, props.maxlength)
        }
        if (props.minlength) {

            if (val.length < props.minlength ) {
                msg = '您输入的' + this.state.msg + '不正确';
            }
        }
        if (props.pattern) {
            let pattern = new RegExp(props.pattern, 'g');

            if (!pattern.test(val)) {
                msg = '您输入的' + this.state.msg + '不正确';
            }
        }
        this.setState({
            input: {
                name: this.props.name,
                val: val
            }
        });
        props.inputHandle(this.props.name, val, msg);
    }
    render(){
        return (
            <div className="form-control">
                <textarea onChange={(e) => this.inputChange(e)} type={this.props.type} name={this.state.input.name} value={this.state.input.val} placeholder={this.props.placeholder} autoComplete="off" required />
                <span className="input-control clear-btn" onClick={() => this.clearVal()}></span>
            </div>
            )
    }
}
Input.propTypes = {
    inputHandle: React.PropTypes.func.isRequired,
    name: React.PropTypes.string,
    type: React.PropTypes.string
}
export default Input;