import React from 'react'
import StatTable from '../feedbacker-stat/'
import RegionStatTable from '../feedbacker-region-stat/'
import {
    Switch,
    Route
  } from "react-router-dom";


function StateTablesRouter() {
    return (
        <Switch>
            <Route path="/">
                <StatTable /> 
            </Route>
            <Route path="/region">
                <RegionStatTable />
            </Route>
        </Switch>
    )
}

export default StateTablesRouter
