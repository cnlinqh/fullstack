import React from 'react';
import { Route } from 'react-router-dom';
import { User, Data } from '../HomePage';
import { MenuLink } from '../AppPage';
import Table from '../DataPage/Table';
function Topics({ match }) {
    return (
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <h2>Please select a topic</h2>
            <ul>
                <li>
                    <MenuLink to={`${match.url}/user`} label="User"></MenuLink>
                </li>
                <li>
                    <MenuLink to={`${match.url}/rr`} label="Table: React + Redux"></MenuLink>
                </li>
                <li>
                    <MenuLink to={`${match.url}/pr`} label="Table: Pure React"></MenuLink>
                </li>
            </ul>
            <Route path={`${match.path}/:topicId`} component={Topic} />
            {/* <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            /> */}
        </div>
    );
}
function Topic({ match }) {
    if (match.params.topicId === "user") {
        return <User />;
    } else if (match.params.topicId === "rr") {
        return <Data />
    } else if (match.params.topicId === "pr") {
        return <Table />
    }
    return (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    );
}
export { Topics }