import React, { Component } from 'react'

export class SponsorBar extends Component {
    render() {
        return (
            <div style = {{position: "relative"}}>
                <h1 className = "section-subheader">RROs using Spikehub</h1>
                <div className = "rotating-container-2">
                    <a href = "https://www.facebook.com/Raleigh-Roundnet-Club-100212494680090">
                        <div className = "sponsor-container">Raleigh Roundnet Club</div>
                    </a>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                    <div className = "sponsor-container">RRO Name Here</div>
                </div>
                <div className = "rotating-container">
                    <a href = "https://www.facebook.com/Raleigh-Roundnet-Club-100212494680090">
                        <div className = "sponsor-container">Raleigh Roudnet Club</div>
                    </a>
                    <div className = "sponsor-container">RRO Name Here</div>
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
