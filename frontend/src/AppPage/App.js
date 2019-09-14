import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { Home, NotFound } from '../HomePage';
import { Login } from '../LoginPage';
import { Register } from '../RegisterPage';
import { PrivateRoute } from '../AppPage'

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/*' component={NotFound}></Route>
                        {/* <Redirect from="/*" to="404"></Redirect> */}
                    </Switch>
                </Router>
            </div>
        )
    }
}
const connectedApp = connect()(App);
export { connectedApp as App };
