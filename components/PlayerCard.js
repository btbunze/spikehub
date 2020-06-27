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
                    <img src = {this.props.player.img ? this.props.player.img : "/default-prof-pic.png"} className = "prof-pic"></img>
                    <h2 className = "pc-name">{this.props.player.name}</h2>
                    <h3 className = "pc-division">{this.props.player.division}</h3>
                    <p className = "pc-desc">{this.props.player.selfDesc}</p>
                </div>
                <div className = "button-section">
                    <a href = {this.props.player.contact} style = {{margin:'auto'}}>
                        <button className = "pc-button">
                            CONTACT
                        </button>
                    </a>
                    <button className = "pc-button" onClick = {() => this.props.deletePlayer(this.props.player)}>
                        DELETE
                    </button>
                </div>
            </div>
        )
    }
}

export default PlayerCard
