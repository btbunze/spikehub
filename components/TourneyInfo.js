import React, { Component } from 'react'

export class TourneyInfo extends Component {
    render() {
        return (
            <div className = "ti-container">
                <button className = "back-button" onClick = {this.props.closeInfo}>X</button>
                <h1>{this.props.tournament.name}</h1>
                <h2>Location: {this.props.tournament.location}</h2>
                <h2>Date: {this.props.tournament.date}</h2>
                <div > 
                    <p>{this.props.tournament.desc}</p>
                </div>
                <div className = "ti-button-section">
                    <a href = {this.props.tournament.link}>
                        <button className = "ti-button">Register</button>
                    </a>
                    <button className = "ti-button" onClick = {this.props.togglePlayerDisplay}>Free Agents</button>
                </div>
            </div>
        )
    }
}

export default TourneyInfo
