import React, { Component } from 'react'

export class SponsorBar extends Component {
    render() {
        return (
            <>
            <div className = "rotating-container-2">
                <a href = "https://roundnetworld.com">
                    <div className = "sponsor-container">roundnetworld.com</div>
                </a>
                <div className = "sponsor-container">clubspike.net</div>
                <div className = "sponsor-container">spikeball.com</div>
                <div className = "sponsor-container">tournaments.spikeball.com</div>
                <div className = "sponsor-container">How To Roundnet</div>
                <div className = "sponsor-container">Cathedral</div>
            </div>
            <div className = "rotating-container">
                <div className = "sponsor-container">roundnetworld.com</div>
                <div className = "sponsor-container">clubspike.net</div>
                <div className = "sponsor-container">spikeball.com</div>
                <div className = "sponsor-container">tournaments.spikeball.com</div>
                <div className = "sponsor-container">How To Roundnet</div>
                <div className = "sponsor-container">Cathedral</div>
            </div>
            </>
        )
    }
}

export default SponsorBar
