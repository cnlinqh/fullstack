import React from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { Home, Topics } from '../HomePage';
import { Login } from '../LoginPage';
import { Register } from '../RegisterPage';
import { PrivateRoute } from '../AppPage'

class App extends React.Component {
    render() {
        return (
            <div>
                <header>This is header part</header>
                <main>
                    <Router history={history}>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/topics">Topics</Link>
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
