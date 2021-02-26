import axios from 'axios'
import React, { Component } from 'react'
import Moment from 'react-moment'

export class Scoreboard extends Component {
    constructor() {
        super()
        this.state = {
          players: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/all/players')
        .then(res => {
            this.setState({ players: res.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const players = this.state.players

        return (
            <div className="scoreboard">
                <table>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>

                    {players.map((data) => {
                    return <tr>
                                <td>{data.playerName}</td>
                                <td>{data.score}</td>
                                <td><Moment fromNow>{data.createdAt}</Moment></td>
                            </tr>
                    })}
                </table>
            </div>
          )
      }
}

export default Scoreboard
