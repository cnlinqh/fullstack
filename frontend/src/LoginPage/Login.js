import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions'
class Login extends Component {
    constructor(props) {
        super(props);
        this.props.logout();
        this.state = {
            user: {
                name: "",
                password: ""
            }
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
        this.props.login(this.state.user.name, this.state.user.password);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Name
                        </label>
                        <input className="form-control" type="text" name="name" value={this.state.user.name} onChange={this.handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>
                            Password
                        </label>
                        <input className="form-control" type="text" name="password" value={this.state.user.password} onChange={this.handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link className="btn btn-link" to="/register">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { token } = state.user;
    return { token }
}
const mapDispatchToProps = {
    login: userActions.login,
    logout: userActions.logout
}
const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export { connectedLogin as Login };