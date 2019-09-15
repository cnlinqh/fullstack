import React from 'react';
import { Route, Link } from 'react-router-dom';
import { User, Data } from '../HomePage';
function Topics({ match }) {
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/user`}>User</Link>
                </li>
                <li>
                    <Link to={`${match.url}/data`}>Data</Link>
                </li>
            </ul>
            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}
function Topic({ match }) {
    if (match.params.topicId === "user") {
        return <User />;
    } else if (match.params.topicId === "data") {
        return <Data />
    }
    return (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    );
}
export { Topics }