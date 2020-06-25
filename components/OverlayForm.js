import React, { Component } from 'react'

export class OverlayForm extends Component {



    render() {

        let formRender = null;

        if(this.props.formType != "addTournament"){
            formRender = (
                <div className = "form" id = "overlayForm">
                    <h2 className = "form-title">Add a Tournament</h2>
                    <label>Tournament Name:</label>
                    <input className = "form-input"/>
                    <br/>
                    <label>Location:</label>
                    <input className = "form-input"></input>
                    <br/>
                    <label>Date:</label>
                    <input className = "form-input"></input>
                    <br/>
                    <label>List Divisions:</label>
                    <input className = "form-input"></input>
                    <br/>
                    <label>Description:</label>
                    <input className = "form-input"></input>
                    <br/>
                    <label>Registration Link:</label>
                    <input className = "form-input"></input>
                    <br/>
                    <button className = "add-player-button " onClick = {this.props.onClick}>Cancel</button>
                    <button className = "add-player-button " onClick = {this.props.submit}>Submit</button>
                </div>

            )
        }

        return (
            
            <div className = "overlay-shadow" id = "overlay">
                {formRender}
            </div>
        )
    }
}

export default OverlayForm
