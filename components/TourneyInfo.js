import React, { Component } from 'react'

export class TourneyInfo extends Component {

    formatDate = () => {
        //date entered in format "yyyy-mm-dd"
        let [year, month, day] = this.props.tournament.date.split("-");
        return `${month}/${day}/${year}`
    }

    render() {
        return (
            <div className = "ti-container">
                <button className = "back-button" onClick = {this.props.closeInfo}>X</button>
                <h1 className = "ti-header">{this.props.tournament.name}</h1>
                <h2 className = "ti-subheader">Location: {this.props.tournament.location}</h2>
                <h2 className = "ti-subheader">Date: {this.formatDate()}</h2>
                <p className = "ti-content">{this.props.tournament.desc}</p>
                <div className = "ti-button-section">
                    <a href = {this.props.tournament.link}>
                        <button className = "ti-button">Register</button>
                    </a>
                    <button className = "ti-button" onClick = {this.props.togglePlayerDisplay}>Free Agents
                    <svg viewBox="0 0 10 10" class="svg-2" >
                        <path d="M0,8 L5,2 L10,8" />
                    </svg>
                    </button>
                </div>
            </div>
        )
    }
}

export default TourneyInfo
