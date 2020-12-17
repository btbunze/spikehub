import React, { Component } from 'react'

export class BannerMessage extends Component {


    render() {
        return (
            <div className = "banner">
                <p class = "banner-message">{this.props.message}</p>
                <button className = "banner-close-button" onClick = {this.props.closeBanner}>x</button>
            </div>
        )
    }
}

export default BannerMessage
