import React, { Component } from 'react'

export class AddPlayerCard extends Component {

    render() {
        let cardContent = "null";

        if(this.props.formOpen){
            cardContent = (
                <>
                    <h2 className = "add-player-title">Add a Free Agent</h2>
                    <label>Name:</label>
                    <input className = "add-player-input"/>
                    <br/>
                    <label>Division:</label>
                    <input className = "add-player-input"></input>
                    <br/>
                    <label>Description:</label>
                    <input className = "add-player-input"></input>
                    <br/>
                    <button className = "add-player-button " onClick = {this.props.onClick}>Cancel</button>
                    <button className = "add-player-button " onClick = {this.props.submit}>Submit</button>
                </>
            )
        }else{
            cardContent = (
                <div className = "clickable-wrapper" onClick = {this.props.onClick}>
                    <h2 className = "add-player-title">Add a Free Agent</h2>
                </div>
            )
        }

        return (
            <div className = "player-card add-player" id = "addPlayer">
                {cardContent}
            </div>
        )
    }
}

export default AddPlayerCard
