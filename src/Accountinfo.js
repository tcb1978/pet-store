import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { login } from './Ducks/reducer.js'

class AccountInfo extends Component {
    componentDidMount() {
        axios.get('/user-data').then(response => {
            if (response.data.user) {
                this.props.login(response.data.user)
            }
        })
    }

    render() {
        const { user } = this.props
        return (
            <div className="controller account-info-controller">
                <div className="logged-in-as-container top-z gradient border-radius padded opacity">
                    {user && <div className="">
                        <h1 className="">Account Info</h1>
                        <img src={user.pictureurl} alt="user" className="" />
                        <div className="">You are logged in as:</div>
                        <div className="">{user.name}</div>
                        <div className="">{user.email}</div>
                        <Link to="/" className="">Juke Joint</Link>
                    </div>}
                    {!user && <div className="">
                        <Link to="/" className="">Return to Login</Link>
                    </div>}
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    login: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)