import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
          name: '',
          password: '',
          passwordRepeat: '',
          showSignup: false,
          errorName: '',
          errorPassword: '',
          errorPasswordRepeat: ''
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
            showSignup: true,
            errorName: '',
            errorPassword: '',
            errorPasswordRepeat: ''
        })
    }

    showLogin() {
        this.setState({
            showSignup: false,
            errorName: '',
            errorPassword: '',
            errorPasswordRepeat: ''
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
                this.props.logHandler(user.name)
                this.setState({
                    errorName: '',
                    errorPassword: '',
                    errorPasswordRepeat: ''
                })
            })
            .catch(err => {
                if (err.response.data.message === 'Wrong username and/or password') {
                    this.setState({
                        errorPassword: 'Wrong username and/or password'
                    })
                }
                console.log(err)
            })
        } else {
            this.setState({
                errorPassword: 'Empty fields!'
            })
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
                if (user.password.length > 7) {
                    axios.post('http://localhost:3000/signup', { user })
                    .then(res => {
                        console.log(res)
                        this.props.logHandler()
                        this.setState({
                            errorName: '',
                            errorPassword: '',
                            errorPasswordRepeat: ''
                        })
                    })
                    .catch(err => {
                        if (err.response.data.message === 'This name already exist') {
                            this.setState({
                                errorName: 'This name already exists, please use another one',
                                errorPasswordRepeat: ''
                            })
                        }
                        console.log(err)
                    })
                } else {
                    this.setState({
                        errorPassword: 'Password must contain at least 8 characters',
                        errorPasswordRepeat: '',
                        errorName: ''
                    })
                }
                
            } else {
                this.setState({
                    errorPasswordRepeat: 'Passwords do not match',
                    errorPassword: '',
                    errorName: ''
                })
            }
            
        } else {
            this.setState({
                errorPasswordRepeat: 'Empty fields!'
            })
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
                            <p className="error-msg">{this.state.errorName}</p>
                        </label>

                        <label>
                            Password:
                            <input className="log-input" type="password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
                            <p className="error-msg">{this.state.errorPassword}</p>
                        </label>
                        <button type="submit" className="button">Log in</button>
                    </form>
                    <p className="signup-txt link" onClick={() => this.showSignup()}>No account ? Create one!</p>
                </div>
                }

                {this.state.showSignup && !this.props.logged &&
                    <div className="signup-form">
                        <form onSubmit={(e) => this.signup(e)} className="login-form">
                            <label className="label">
                                Name:
                                <input className="log-input" type="text" name="name" value={this.state.name} onChange={this.handleChangeName}/>
                                <p className="error-msg">{this.state.errorName}</p>
                            </label>

                            <label>
                                Password:
                                <input className="log-input" type="password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
                                <p className="error-msg">{this.state.errorPassword}</p>
                            </label>

                            <label>
                                Repeat Password:
                                <input className="log-input" type="password" name="password" value={this.state.passwordRepeat} onChange={this.handleChangePasswordRepeat}/>
                                <p className="error-msg">{this.state.errorPasswordRepeat}</p>
                            </label>
                            <button onClick={(e) => this.signup(e)} type="submit" className="button">Signup</button>
                            <p className="signup-txt link" onClick={() => this.showLogin()}>I already have an account</p>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Login
