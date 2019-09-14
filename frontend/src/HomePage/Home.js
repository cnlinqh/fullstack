import React, { Component } from 'react';
import { User, Data } from '../HomePage';
class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <User />
                <Data />
            </div>
        )
    }
}

export { Home };