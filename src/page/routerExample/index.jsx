import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory,hashHistory,Redirect  } from 'react-router'

import App from '../../components/App/index.jsx'
import Home from '../../components/App/home.jsx'
import User from '../../components/App/user.jsx'
import Calendar from '../../components/App/Calendar/index.jsx'
import Messages from '../../components/App/Messages/index.jsx'


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      // <IndexRoute component={Home}/>
      <Route path="calendar" component={Calendar} />
      <Route path="messages" component={Messages} />
      <Route path="user" component={User} />
    </Route>
  </Router>,
  document.getElementById('router-example')
)
