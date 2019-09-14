import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class User extends Component {

    componentDidMount() {
        this.props.getUserList();
    }

    render() {
        const { userList } = this.props;
        return (
            <div>
                <h3>All registered users:</h3>
                {
                    userList.map((user) => {
                        return (
                            <li key={user.name}>
                                {user.name}
                            </li>
                        )
                    })
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { userList } = state.user;
    return { userList }
}
const mapDispatchToProps = {
    getUserList: userActions.getUserList
}
const connectedUser = connect(mapStateToProps, mapDispatchToProps)(User)
export { connectedUser as User };