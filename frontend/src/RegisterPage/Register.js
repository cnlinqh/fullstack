import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registrationActions } from '../_actions'
class Register extends Component {
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
                [name]:value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.register(this.state.user.name, this.state.user.password);
    }
    render() {
        return (
            <div>
                <h1>Status: {this.props.status}</h1>
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
                            Register
                        </button>
                        <Link to="/login">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { status } = state.registration;
    return { status }
}
const mapDispatchToProps = {
    register: registrationActions.register
}
const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register)
export { connectedRegister as Register };