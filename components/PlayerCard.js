import React, { Component } from 'react'


export class PlayerCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            canDelete: false
        };
    }


    render() {
        return (
            <div className = "player-card" onClick = {this.props.onClick}>
                <div className = "pc-content ">
                    <img src = "/benpic.jpeg" className = "prof-pic"></img>
                    <h2 className = "pc-name">{this.props.player.name}</h2>
                    <h3 className = "pc-division">{this.props.player.division}</h3>
                    <p className = "pc-desc">{this.props.player.selfDesc}</p>
                </div>
                <div className = "button-section">
                    <button className = "pc-button">
                        CONTACT
                    </button>
                    <button className = "pc-button">
                        DELETE
                    </button>
                </div>
            </div>
        )
    }
}

export default PlayerCard
