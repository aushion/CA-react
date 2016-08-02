import React from 'react'
import { Link } from 'react-router'
import './index.css';

const dark = 'hsl(200, 20%, 20%)'
const light = '#fff'
const styles = {}

styles.link = {
  padding: 11,
  color: light,
  fontWeight: 200
}

styles.activeLink = {
  ...styles.link,
  background: light,
  color: dark
}

class GlobalNav extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    alert('log out')
  }

  render() {
    const { user } = this.props

    return (
      <div className='nav'>
        <div style={{ float: 'left' }}>
          <Link to="/" className="link">Home</Link>{' '}
          <Link to="/calendar" className="link" activeClassName="active">Calendar</Link>{' '}
          <Link to="/messages" className="link" activeClassName="active">Messages</Link>{' '}
        </div>
        <div style={{ float: 'right' }}>
          <Link style={styles.link} to="/user">{user.name}</Link> <button onClick={this.logOut}>log out</button>
        </div>
      </div>
    )
  }
}

GlobalNav.defaultProps = {
  user: {
    id: 1,
    name: 'Ryan Florence杀杀杀'
  }
}

export default GlobalNav
