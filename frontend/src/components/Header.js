import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Header extends Component {

    getStatus() {
        if (this.props.logged) {
            return this.props.playerName
        } else {
            return 'Login'
        }
    }

    render() {
        return (
            <div className="header">
                <ul>
                    <li><Link to="/" className="link-btn"><h3 className="nav-btn">Game</h3></Link></li>
                    <li><Link to="/leaderboard" className="link-btn"><h3 className="nav-btn">Leaderboard</h3></Link></li>
                    <li><Link to="/stats" className="link-btn"><h3 className="nav-btn">Stats</h3></Link></li>
                    <li><Link to="/about" className="link-btn"><h3 className="nav-btn">About</h3></Link></li>
                    <li><Link to="/login" className="link-btn"><h3 className="nav-btn">{this.getStatus()}</h3></Link></li>
                </ul>
            </div>
        )
    }
}

export default Header
