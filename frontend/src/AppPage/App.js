import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { Home, Topics } from '../HomePage';
import { Login } from '../LoginPage';
import { Register } from '../RegisterPage';
import { PrivateRoute, MenuLink } from '../AppPage'

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <h1>This is header part</h1>
                </header>
                <main>
                    <Router history={history}>
                        <ul>
                            <li>
                                <MenuLink activeOnlyWhenExact={true} to="/" label="Home"></MenuLink>
                            </li>
                            <li>
                                <MenuLink to="/login" label="Login"></MenuLink>
                            </li>
                            <li>
                                <MenuLink to="/register" label="Register"></MenuLink>
                            </li>
                            <li>
                                <MenuLink to="/topics" label="Topics"></MenuLink>
                            </li>
                        </ul>
                        <Switch>{/* Switch make sure there is one one Route will be matched */}
                            <PrivateRoute exact path='/' component={Home}></PrivateRoute>
                            <Route path='/login' component={Login}></Route>
                            <Route path='/register' component={Register}></Route>
                            <Route path='/topics' component={Topics}></Route>
                            {/*<Route path='/*' component={NotFound}></Route>*/}
                            <Redirect to="/"></Redirect>
                        </Switch>
                    </Router>
                </main>
            </div>
        )
    }
}
const connectedApp = connect()(App);
export { connectedApp as App };
