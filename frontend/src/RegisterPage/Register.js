import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registrationActions } from '../_actions'
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        //event.preventDefault();
        this.props.register('cn', 'Sybase123');
    }
    render() {
        const { status  } = this.props;
        return (
            <div>
                <h1>Status: {status}</h1>
                <button onClick={() => this.handleSubmit()}>Test</button>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name
                        </label>
                        <input>
                        </input>
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input>
                        </input>
                    </div>
                    <div>
                        <button>
                            Register
                        </button>
                        {this.props.registering}
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