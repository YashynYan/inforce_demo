import React from 'react'
import Feedbacker from './feedbacker-dashboard/'
import {
    Switch,
    Route
  } from "react-router-dom";
import StatsTablesRouter from './stats-tables-router/';
import RegionStatTable from './feedbacker-region-stat';

function App() {
    return (
        <Switch>
            <Route path="/stat" component={StatsTablesRouter} />
            <Route path="/" component={Feedbacker} />
        </Switch>
    )
}

export default App
