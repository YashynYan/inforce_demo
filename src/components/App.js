import React from 'react'
import Feedbacker from './feedbacker-dashboard/'
import {
    Switch,
    Route
  } from "react-router-dom";
import StatsTablesRouter from './stats-tables-router/';

function App() {
    return (
        <Switch>
            <Route path="/stat">
                <StatsTablesRouter /> 
            </Route>
            <Route path="/">
                <Feedbacker />
            </Route>
        </Switch>
    )
}

export default App
