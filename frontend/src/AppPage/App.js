import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { Home } from '../HomePage';
import { Login } from '../LoginPage';
import { Register } from '../RegisterPage';
import { PrivateRoute } from '../AppPage'

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                    </div>
                </Router>
            </div>
        )
    }
}
const connectedApp = connect()(App);
export { connectedApp as App };
