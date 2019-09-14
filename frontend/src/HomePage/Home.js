import React, { Component } from 'react';
import { User } from '../HomePage';
class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <User/>
            </div>
        )
    }
}

export { Home };