import React from 'react'
import StatTable from '../feedbacker-stat/'
import RegionStatTable from '../feedbacker-region-stat/'
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";


function StateTablesRouter() {

    const { path, url } = useRouteMatch();
    console.log(path, url)
    return (
        <Switch>
            <Route path={`${path}/region/:id`} component={RegionStatTable} />
            <Route exact path={path + "/"} component={StatTable} />
        </Switch>
    )
}

export default StateTablesRouter
