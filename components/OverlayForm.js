import React, { Component } from 'react'

export class OverlayForm extends Component {

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

        let formRender = null;

        if(this.props.formType == "addTournament"){
            formRender = (
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
                    <button className = "add-player-button " onClick = {() => this.props.submit(this.state.selectedImg.loc)}>Submit</button>
                </>
            )
        }else if (this.props.formType == "addPlayer") {
            formRender = (
                <>
                    <h2 className = "form-title">Add a Free Agent</h2>
                    <label>Name:</label>
                    <input className = "form-input add-player-input"/>
                    <br/>
                    <label>Division:</label>
                    <select className = "form-input add-player-input">
                        {this.props.divisions.map((division) =>{
                            return (<option value = {division} >{division}</option>)
                        })}
                    </select>
                    <br/>
                    <label>Description:</label>
                    <input className = "form-input add-player-input"></input>
                    <br/>
                    <label>Image:</label>
                    <button className = "form-img-button" onClick = {this.openWidget}>Choose Image</button>
                    <span className = "selected-img-text">{this.state.selectedImg ? this.state.selectedImg.name : "No image selected"}</span>
                    <br/>
                    <button className = "add-player-button " onClick = {this.props.onClick}>Cancel</button>
                    <button className = "add-player-button " onClick = {() => this.props.submit(this.state.selectedImg.loc)}>Submit</button>
                </>
            )
        }

        return (
            
            <div className = "overlay-shadow" id = "overlay">
                <div className = "form" id = "overlayForm">
                    {formRender}
                </div>
            </div>
        )
    }
}

export default OverlayForm
