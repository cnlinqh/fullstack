import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        // this.props.register(this.state.user.name, this.state.user.password);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
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
    // const { status } = state.registration;
    // return { status }
}
const mapDispatchToProps = {
    // register: registrationActions.register
}
const connectedLogin = connect()(Login)
// export { connectedRegister as Register };
export { connectedLogin as Login };