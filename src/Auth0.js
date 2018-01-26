import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Auth0Lock from 'auth0-lock'
import axios from 'axios'
import { login } from './Ducks/reducer.js'
import { connect } from 'react-redux'


class Auth0 extends Component {
    constructor() {
        super()
        this.state = {
            user: null
        }
        this.lock = null
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN)
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', { userId: user.sub }).then(response => {
                    this.props.login(response.data.user)
                    this.props.history.push('/private')
                })
            })
        })
    }

    login() {
        this.lock.show()
    }

    render() {
        return (

            <div onClick={this.login} className="auth0-login-container gradient top-z border-radius box-shadow opacity padded">Log in</div>

        )
    }
}

const mapDispatchToProps = {
    login: login,
}

export default connect(null, mapDispatchToProps)(withRouter(Auth0))