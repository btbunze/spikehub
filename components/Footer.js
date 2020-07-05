import React, { Component } from 'react'
import SponsorBar from "./SponsorBar"
import FooterInfo from "./InfoSection"

export class Footer extends Component {
    render() {
        return (
            <div className = "footer">
                <SponsorBar></SponsorBar>
                <div className = "to-top" onClick = {()=>window.scrollTo(0,0)}>
                    <p className = "to-top-text">^</p>
                </div>
            </div>
        )
    }
}

export default Footer
