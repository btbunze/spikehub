import React, { Component } from 'react'

export class SponsorBar extends Component {
    render() {
        return (
            <div style = {{position: "relative"}}>
                <h1 className = "section-subheader">RROs using Spikehub</h1>
                <div className = "rotating-container-2">
                    <a href = "https://roundnetworld.com">
                        <div className = "sponsor-container">roundnetworld.com</div>
                    </a>
                    <div className = "sponsor-container">Raleigh Roundnet</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                </div>
                <div className = "rotating-container">
                    <a href = "https://roundnetworld.com">
                        <div className = "sponsor-container">roundnetworld.com</div>
                    </a>
                    <div className = "sponsor-container">Raleigh Roundnet</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                </div>
            </div>
        )
    }
}

export default SponsorBar
