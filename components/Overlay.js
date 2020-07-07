import React, { Component } from 'react'

export class Overlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedImg: null,
            loading: false
        }
    }

    openWidget = () => {
        cloudinary.openUploadWidget({
            cloudName: "dicfhqxoo", uploadPreset: "spike_hub" }, (error, result) => { 
                if(result.event == "queues-end"){
                    console.log(result.data.info.files[0])
                    this.setState({selectedImg: {
                        name: result.data.info.files[0].name,
                        loc: result.data.info.files[0].uploadInfo.secure_url
                    }})
                }

            });
    }


    render() {

        let overlayRender = null;


        if(this.props.type == "loginPrompt"){
            overlayRender = (
                <>
                    <h2 className = "form-title">Login or sign up to add players</h2>
                    <button className = "add-player-button" onClick = {this.props.onClick}>Cancel</button>
                    <a href = "/api/login">
                        <button className = "add-player-button">Login</button>  
                    </a>
                </>
            )
        }

        if(this.props.type == "addTournament"){
            overlayRender = (
                <>
                    <h2 className = "form-title">Add a Tournament</h2>
                    <label>Tournament Name:</label>
                    <input className = "form-input"/>
                    <br/>
                    <label>Location:</label>
                    <input className = "form-input"></input>
                    <br/>
                    <label>Date:</label>
                    <input className = "form-input" type = "date"></input>
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
                    <label>Image:</label>
                    <button className = "form-img-button" onClick = {this.openWidget}>Choose Image</button>
                    <span className = "selected-img-text">{this.state.selectedImg ? this.state.selectedImg.name : "No image selected"}</span>
                    <br/>
                    <button className = "add-player-button " onClick = {this.props.onClick}>Cancel</button>
                    <button className = "add-player-button " onClick = {() => {this.state.selectedImg ? this.props.submit(this.state.selectedImg.loc): this.props.submit(null)}}>Submit</button>
                </>
            )
        }else if (this.props.type == "addPlayer") {
            overlayRender = (
                <>
                    <h2 className = "form-title">Add a Free Agent</h2>
                    <label>Name:*</label>
                    <input className = "form-input add-player-input"/>
                    <br/>
                    <label>Division:*</label>
                    <select className = "form-input add-player-input">
                        <option value = "" selected disabled >Choose a division</option>
                        {this.props.divisions.map((division) =>{
                            return (<option value = {division} >{division}</option>)
                        })}
                    </select>
                    <br/>
                    <label>Contact Link: (i.e. facebook link, etc.)</label>
                    <input className = "form-input add-player-input"></input>
                    <br/>
                    <label>Description:</label>
                    <input className = "form-input add-player-input"></input>
                    <br/>
                    <label>Image:</label>
                    <button className = "form-img-button" onClick = {this.openWidget}>Choose Image</button>
                    <span className = "selected-img-text">{this.state.selectedImg ? this.state.selectedImg.name : "No image selected"}</span>
                    <br/>
                    <button className = "add-player-button " onClick = {this.props.onClick}>Cancel</button>
                    <button className = "add-player-button " onClick = {() => {this.state.selectedImg ? this.props.submit(this.state.selectedImg.loc): this.props.submit(null)}}>Submit</button>
                </>
            )
        }

        return (
            
            <div className = "overlay-shadow" id = "overlay">
                <div className = "form" id = "overlayForm">
                    {overlayRender}
                </div>
            </div>
        )
    }
}

export default Overlay
