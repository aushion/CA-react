import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory,hashHistory,Redirect  } from 'react-router'

const ACTIVE = { color: 'red' }

const App = ({ children }) => (
  <div>
    <h1>routerApp!</h1>
    <ul>
      <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
      <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

      <li><Link      to="/about"      activeStyle={ACTIVE}>/about</Link></li>

      <li><Link      to="/users"      activeStyle={ACTIVE}>/users</Link></li>
      <li><IndexLink to="/users"      activeStyle={ACTIVE}>/users IndexLink</IndexLink></li>

      <li><Link      to="/users/ryan" activeStyle={ACTIVE}>/users/ryan</Link></li>
      <li><Link      to={{ pathname: '/users/ryan', query: { foo: 'bar' } }}
                                      activeStyle={ACTIVE}>/users/ryan?foo=bar</Link></li>

      <li></li>
      <li>跳转到其他页面</li>
      <li><Link      to="/page"      activeStyle={ACTIVE}>/page</Link></li>

      <li><Link      to="/home"      activeStyle={ACTIVE}>/homePage</Link></li>
    </ul>

    {children}
  </div>
)

const Page = ({ children }) => (
  <div>
    <h1>routerPage!</h1>
    <ul>
      <li><Link      to="/page"           activeStyle={ACTIVE}>/now</Link></li>
      <li><IndexLink to="/page"           activeStyle={ACTIVE}>/ PageIndex</IndexLink></li>

      <li><Link      to="/"      activeStyle={ACTIVE}>/返回上一级</Link></li>
    </ul>

    {children}
  </div>
)

const HomePage = ({ children }) => (
  <div>
    <h1>routerHomePage!</h1>
    <ul>
      <li><Link      to="/home"           activeStyle={ACTIVE}>/now</Link></li>
      <li><IndexLink to="/home"           activeStyle={ACTIVE}>/ HomePageIndex</IndexLink></li>

      <li><Link      to="/"      activeStyle={ACTIVE}>/返回上一级</Link></li>
      <li><Link      to=""      activeStyle={ACTIVE}>page:  home.html</Link></li>
    </ul>

    {children}
  </div>
)


const Index = () => (
  <div>
    <h2>Index!</h2>
  </div>
)

const Users = ({ children }) => (
  <div>
    <h2>Users</h2>
    {children}
  </div>
)

const UsersIndex = () => (
  <div>
    <h3>UsersIndex</h3>
  </div>
)

const User = ({ params: { id } }) => (
  <div>
    <h3>User {id}</h3>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const PageIndex = () => (
  <div>
    <h2>PageIndex</h2>
  </div>
)

ReactDOM.render((
  <Router history={hashHistory}>

    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/about" component={About}/>
      <Route path="users" component={Users}>
        <IndexRoute component={UsersIndex}/>
        <Route path=":id" component={User}/>
      </Route>
    </Route>

    <Route path="/page" component={Page}>
      <IndexRoute component={PageIndex}/>
      <Route path="/" component={App}/>
    </Route>

    <Route path="/home" component={HomePage}>
    </Route>


  </Router>
), document.getElementById('router-example'))
