import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions'
class Login extends Component {
    constructor(props) {
        super(props);
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
            <div>
                <h2>Login: {this.props.token}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange}>
                        </input>
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input type="text" name="password" value={this.state.user.password} onChange={this.handleChange}>
                        </input>
                    </div>
                    <div>
                        <button>
                            Login
                        </button>
                        <Link to="/register">
                            Register
                        </Link>
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
    login: userActions.login
}
const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export { connectedLogin as Login };