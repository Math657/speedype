import axios from 'axios';
import React, { Component } from 'react'
import Moment from 'react-moment'


export class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamePlayed: 0,
            highscore: 0,
            date: '-'
        }
    }

    componentDidMount() {
        if (this.props.logged) {
            axios.get(`${process.env.REACT_APP_API_URL}/player/${this.props.playerName}`)
            .then(res => {
                this.setState({
                    gamePlayed: res.data.gamePlayed,
                    highscore: res.data.highscore,
                    date: res.data.createdAt
                })
            })
            .catch(err => {
                console.log(err)
            })
        } else {

        }
    }

    render() {
        return (
            <div className="stats">
                {this.props.logged === true &&
                    <div className="stats-logged">
                        <p className="player-stats">{this.props.playerName}</p>
                        <p>Highscore : {this.state.highscore}</p>
                        <p>Total games played : {this.state.gamePlayed}</p>
                        {this.state.highscore > 0 &&
                            <p>Date of highscore : <Moment fromNow subtract={{ hours: 1 }}>{this.state.date}</Moment></p>
                        }      
                    </div>   
                }
            </div>
        )
    }
}

export default Stats
