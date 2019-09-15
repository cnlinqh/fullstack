import React from 'react';
import { Route } from 'react-router-dom';
import { User, Data } from '../HomePage';
import { MenuLink } from '../AppPage';
function Topics({ match }) {
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <MenuLink to={`${match.url}/user`} label="User"></MenuLink>
                </li>
                <li>
                    <MenuLink to={`${match.url}/data`} label="Data"></MenuLink>
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