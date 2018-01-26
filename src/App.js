import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import routes from './routes'
import { connect } from "react-redux"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        {routes}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state : ''
  };
}

export default connect(mapStateToProps)(App);
