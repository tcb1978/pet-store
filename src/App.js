import React, { Component } from 'react'
// import logo from './logo.svg'
import routes from './routes'
import { connect } from "react-redux"
import { login } from './Ducks/reducer.js'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super()
    this.state = ({
      user: null
    })
  }

  componentDidMount() {
    axios.get('/user-data').then(response => {
      this.props.login(response.data.user)
    })
  }
  render() {
    return (
      <div className="App">
        <div className="controller home-controller">
          {this.props.user}
        </div>
        <header className="App-header"></header>
        {routes}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    state : state.user
  };
}


const mapDispatchToProps = {
  login: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
