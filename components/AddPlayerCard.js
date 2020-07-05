import React, { Component } from 'react'

export class AddPlayerCard extends Component {

    render() {
        return (
            <div className = "player-card add-player" id = "addPlayer">
                <div className = "clickable-wrapper" onClick = {this.props.onClick}>
                    <h2 className = "add-player-title">Add a Free Agent</h2>
                </div>
            </div>
        )
    }
}

export default AddPlayerCard
