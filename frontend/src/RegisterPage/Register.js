import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                password: "",
                password2: ""
            },
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        var { name, value } = event.target;
        var user = this.state.user;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true })
        this.props.register(this.state.user.name, this.state.user.password);
    }
    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h2>Sign Up</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" name="name" value={this.state.user.name} onChange={this.handleChange}></input>
                        {submitted && !user.name && <div className="help-block">Name is required</div>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" name="password" value={this.state.user.password} onChange={this.handleChange}></input>
                        {submitted && !user.password && <div className="help-block">Password is required</div>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input className="form-control" type="password" name="password2" value={this.state.user.password2} onChange={this.handleChange}></input>
                        {submitted && user.password!==user.password2 && <div className="help-block">Password is not identical</div>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link className="btn btn-link" to="/login">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { status } = state.user;
    return { status }
}
const mapDispatchToProps = {
    register: userActions.register
}
const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register)
export { connectedRegister as Register };