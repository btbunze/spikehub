import React, { Component } from 'react'

export class SponsorBar extends Component {
    render() {
        return (
            <div style = {{position: "relative"}}>
                <h1 className = "section-subheader" style = {{width:"87.7%", margin:"auto"}}>Roundnet Orgs Using Spikehub</h1>
                <div className = "rotating-container-2">
                    <a href = "https://www.facebook.com/Raleigh-Roundnet-Club-100212494680090">
                        <div className = "sponsor-container">Raleigh Roundnet Club</div>
                    </a>
                    <div className = "sponsor-container">Northern Kentucky Roundnet</div>
                    <a href = "http://www.rockymountainroundnet.org">
                        <div className = "sponsor-container">Rocky Mountain Roundnet</div>
                    </a>
                    <div className = "sponsor-container">Buckeye Roundnet Club</div>
                    <div className = "sponsor-container">Long Island Roundnet</div>
                    <a href = "https://utahroundnet.com">
                        <div className = "sponsor-container">Utah Roundnet</div>
                    </a>
                    <a href = "https://linktr.ee/chicagoroundnet">
                        <div className = "sponsor-container">Chicago Roundnet</div>
                    </a>
                    <a href = "https://tournaments.spikeball.com">
                        <div className = "sponsor-container">Spikeball Roundnet Association</div>
                    </a>
                </div>
                <div className = "rotating-container">
                    <a href = "https://www.facebook.com/Raleigh-Roundnet-Club-100212494680090">
                        <div className = "sponsor-container">Raleigh Roudnet Club</div>
                    </a>
                    <div className = "sponsor-container">Northern Kentucky Roundnet</div>
                    <a href = "http://www.rockymountainroundnet.org">
                        <div className = "sponsor-container">Rocky Mountain Roundnet</div>
                    </a>
                    <div className = "sponsor-container">Buckeye Roundent Club</div>
                    <div className = "sponsor-container">Long Island Roundnet</div>
                    <a href = "https://utahroundnet.com">
                        <div className = "sponsor-container">Utah Roundnet</div>
                    </a>
                    <a href = "https://linktr.ee/chicagoroundnet">
                        <div className = "sponsor-container">Chicago Roundnet</div>
                    </a>
                    <a href = "https://tournaments.spikeball.com">
                        <div className = "sponsor-container">Spikeball Roundnet Association</div>
                    </a>
                </div>
            </div>
        )
    }
}

export default SponsorBar
