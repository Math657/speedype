import axios from 'axios'
import React, { Component } from 'react'

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
          name: '',
          password: '',
          passwordRepeat: '',
          showSignup: false
        }
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangePasswordRepeat = this.handleChangePasswordRepeat.bind(this)
    }

    handleChangeName(e) {
        this.setState({ name: e.target.value })
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleChangePasswordRepeat(e) {
        this.setState({ passwordRepeat: e.target.value })
    }

    showSignup() {
        this.setState({
            showSignup: true
        })
    }

    showLogin() {
        this.setState({
            showSignup: false
        })
    }

    login(e) {
        // check à faire
        e.preventDefault()
        // this.props.handler()
        
        const user = {
            name: this.state.name,
            password: this.state.password
        }
        
        if (user.name !== '' && user.password !== '') {
            axios.post('http://localhost:3000/login', { user })
            .then(res => {
                console.log(res)
                this.props.logHandler()
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            console.log('Ne peut pas être vide!')
        }
    }

    signup(e) {
        e.preventDefault()

        const user = {
            name: this.state.name,
            password: this.state.password,
            passwordRepeat: this.state.passwordRepeat
        }

        if (user.name !== '' && user.password !== '' && user.passwordRepeat !== '') {
            if (user.password === user.passwordRepeat) {
                if (user.password.length < 8) {
                    axios.post('http://localhost:3000/signup', { user })
                    .then(res => {
                        console.log(res.data)
                        this.props.logHandler()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('Password too short!')
                }
                
            } else {
                console.log('Not the same passwords!')
            }
            
        } else {
            console.log('Ne peut pas être vide!')
        }      
    }

    logOut() {
        this.props.logHandler()
    }

    render() {
        return (
            <div>
                {this.props.logged && !this.state.showSignup &&
                    
                    <div>
                        <p onClick={() => this.logOut()} className="logout-btn">Log out ?</p>
                    </div>
                }

                {!this.props.logged && !this.state.showSignup &&
                    
                <div className="not-logged-page">
                    <form onSubmit={(e) => this.login(e)} className="login-form">
                        <label className="label">
                            Name:
                            <input className="log-input" type="text" name="name" value={this.state.name} onChange={this.handleChangeName}/>
                        </label>

                        <label>
                            Password:
                            <input className="log-input" type="password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
                        </label>
                        <button type="submit" className="button">Log in</button>
                    </form>
                    <p className="signup-txt" onClick={() => this.showSignup()}>No account ? Create one!</p>
                </div>
                }

                {this.state.showSignup && !this.props.logged &&
                    <div className="signup-form">
                        <form onSubmit={(e) => this.signup(e)} className="login-form">
                            <label className="label">
                                Name:
                                <input className="log-input" type="text" name="name" value={this.state.name} onChange={this.handleChangeName}/>
                            </label>

                            <label>
                                Password:
                                <input className="log-input" type="password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
                            </label>

                            <label>
                                Repeat Password:
                                <input className="log-input" type="password" name="password" value={this.state.passwordRepeat} onChange={this.handleChangePasswordRepeat}/>
                            </label>
                            <button onClick={(e) => this.signup(e)} type="submit" className="button">Signup</button>
                            <p className="signup-txt" onClick={() => this.showLogin()}>I already have an account</p>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Login
