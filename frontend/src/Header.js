import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Message</th>
                    <th>Actions</th>
                </tr>
            </thead>
        )
    }
}
export default Header;