import React, { Component } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Game from './Game'
import Scoreboard from './Scoreboard'
import Stats from './Stats'
import About from './About'
import Login from './Login'

export class Wrapper extends Component {
    constructor(props){
        super(props)
        this.state = {
          logged: false
        }
        this.logHandler = this.logHandler.bind(this)
    }

    logHandler() {
        this.setState(prevState => ({
            logged: !prevState.logged
        }))
    }

    test() {
        console.log('yes')
    }

    render() {
        return (
            <Router>
                <div className='App'>
                    <Header logged={this.state.logged} />
                    <Route
                        exact path='/'
                        render={(props) => (
                            <Game {...props} logged={this.state.logged} />
                        )}
                    />
                    <Route path='/scoreboard' component={Scoreboard} />

                    <Route
                        path='/stats'
                        render={(props) => (
                            <Stats {...props} logged={this.state.logged} />
                        )}
                    />

                    <Route path='/about' component={About} />

                    <Route
                        path='/login'
                        render={(props) => (
                            <Login {...props} logged={this.state.logged} logHandler = {this.logHandler} />
                        )}
                    />

                    {/* <Route
                        path='/login'
                        render={(props) => (
                            <Login {...props} logged={this.state.logged} />
                        )}
                    /> */}
                </div>
            </Router>
        )
    }
}

export default Wrapper
