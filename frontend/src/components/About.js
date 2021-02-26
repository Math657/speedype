import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <div className="about">
                <p className="about-text">Speedype is a game where you have to type as many words as possible in the allotted time. The more words you type, the better your score will be. You can also upload your best scores to the scorboard to see how you compete with other players!
                </p>
                <p className="about-techno">Technologies used : React, Symfony, MariaDB</p>

            </div>
        )
    }
}

export default About