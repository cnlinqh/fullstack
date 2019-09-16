import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class User extends Component {

    componentDidMount() {
        this.props.getUserList();
    }
    handleDeleteUser(name) {
        return (e) => this.props.deleteUser(name)
    }
    render() {
        const { userList, currentUser } = this.props;
        return (
            <div>
                <h3>Welcome: {currentUser.name}</h3>
                <Link to="/login">Logout</Link>
                <h3>All registered users:</h3>
                {
                    userList.map((user) => {
                        return (
                            <li key={user.name}>{user.name}
                                <span> - < button onClick={this.handleDeleteUser(user.name)}>Delete</button></span>
                            </li>
                        )
                    })
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { userList, currentUser } = state.user;
    return { userList, currentUser }
}
const mapDispatchToProps = {
    getUserList: userActions.getUserList,
    deleteUser: userActions.deleteUser
}
const connectedUser = connect(mapStateToProps, mapDispatchToProps)(User)
export { connectedUser as User };