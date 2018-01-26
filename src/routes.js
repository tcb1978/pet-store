import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Home from './Home'
import AccountInfo from './Accountinfo'


export default (
    <HashRouter>
        <Switch>
            <Route exact path="/(access_token.*)?" component={Home} />
            <Route path="/private" component={AccountInfo} />
        </Switch>
    </HashRouter>
)