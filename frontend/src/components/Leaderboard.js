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
        axios.get(`${process.env.REACT_APP_API_URL}/all/players`)
        .then(res => {        
            const top50 = []
            for (let i = 0; i < 50; i++) {
                if (res.data[i] && res.data[i].highscore > 0) {
                    top50.push(res.data[i])
                }
            }
            this.setState({ players: top50 })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const players = this.state.players

        return (
            <div>
                <h3>TOP 50</h3>
                <div className="scoreboard">
                    <table>
                        <tr>
                            <th className="table-name">Rank</th>
                            <th className="table-name">Player</th>
                            <th className="table-name">Score</th>
                            <th className="table-name">Date</th>
                        </tr>

                        {players.map((data, index) => {
                        return <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.playerName}</td>
                                    <td>{data.highscore}</td>
                                    <td><Moment fromNow subtract={{ hours: 1 }}>{data.createdAt}</Moment></td>
                                </tr>
                        })}
                    </table>
                </div>
            </div>
            
          )
      }
}

export default Scoreboard
