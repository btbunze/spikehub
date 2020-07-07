import React, { Component } from 'react'

export class InfoSection extends Component {
    render() {
        return (
            <div className = "two-column">
                <div className = "fi-column">
                    <div className = "section-top-bar">
                        <h1 className = "section-header"> About Spikehub</h1>
                    </div>
                    <div className = "section-content">
                        <div className = "grid-item-lg">
                            <h1 className = "section-subheader">What is it?</h1>
                            <p className  = "about-text">We've all been there. You're looking for a partner for a tournament, and after texting everyone you know and posting on facebook, you still can't find one. With Spikehub, everything's in one place, allowing you to spend less time finding a partner and more time practicing.</p>
                        </div>
                        <div className = "grid-item-sm">
                            <h1 className = "section-subheader">Quick Notes</h1>
                            <ul>
                                <li>Created by: Benjamin Bunze</li>
                                <li>Built with: Reactjs (reactjs.org)</li>
                                <li>Source code: <a href = "https://github.com/btbunze/spikehub">Github</a></li>
                            </ul>
                        </div>
                        <div className = "grid-item-sm">
                            <h1 className = "section-subheader">Coming Soon</h1>
                            <ul>
                                <li>Profile page</li>
                                <li>Set a default player</li>
                                <li>Edit players/tournaments</li>
                                <li>and more...</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className = "fi-column" style = {{display:"none"}}>
                    <div className = "section-top-bar">
                        <h1 className = "section-header"> Proud Sponsors</h1>
                    </div>
                    <div className = "section-content">
                        <div className = "sponsor-grid">
                            {/*<div className = "main-sponsor">
                            <img src = "/cathedral-logo.png" className = "sponsor-img"></img>  
                            </div>*/}
                            <div className = "main-sponsor">
                                <img src = "https://via.placeholder.com/1080x720/eee?text=3:2" className = "sponsor-img"></img>
                            </div>
                            <div className = "sub-sponsor">
                                <img src = "https://via.placeholder.com/1080x1080/eee?text=1:1" className = "sponsor-img"></img>
                            </div>
                            <div className = "sub-sponsor">
                                <img src = "https://via.placeholder.com/1080x1080/eee?text=1:1" className = "sponsor-img"></img>
                            </div>
                            <div className = "sub-sponsor">
                                <img src = "https://via.placeholder.com/1080x1080/eee?text=1:1" className = "sponsor-img"></img>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default InfoSection
