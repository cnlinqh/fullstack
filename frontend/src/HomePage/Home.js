import React, { Component } from 'react';
import { User, Data } from '../HomePage';
class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <User />
                <Data />
            </div>
        )
    }
}

export { Home };