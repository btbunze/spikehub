import React, { Component } from 'react'
import {fetchUser} from "../utils/user"
import { isThisTypeNode } from 'typescript';

export class Overlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedImg: null,
            userHasImg: false,
            loading: false
        }
    }

    openWidget = () => {
        cloudinary.openUploadWidget({
            cloudName: "dicfhqxoo", uploadPreset: "spike_hub" }, (error, result) => { 
                if(result.event == "queues-end"){
                    this.setState({selectedImg: {
                        name: result.data.info.files[0].name,
                        loc: result.data.info.files[0].uploadInfo.secure_url
                    }})
                }

            });
    }

    useProfilePic = async () => {
        const currUser = await fetchUser(); 
        await this.setState({selectedImg: {name: "Your gmail profile picture", loc: currUser.picture}})
    }

    processImg = () =>{
        let processedImg = this.state.selectedImg.loc

        if (processedImg.includes("cloudinary")){
            const splitImgLink = this.state.selectedImg.loc.split("upload/");
            processedImg = splitImgLink[0] + "upload/w_1000,ar_1:1,c_fill,g_auto/" + splitImgLink[1]
        }

        return processedImg;
    }


    render() {

        let overlayRender = null;


        if(this.props.type == "loginPrompt"){
            overlayRender = (
                <>
                    <h2 className = "form-title">Login or sign up to <br/> {this.props.text}</h2>
                    <button className = "add-player-button" onClick = {this.props.onClick}>Cancel</button>
                    <a href = "/api/login" style = {{marginLeft:"25px"}}>
                        <button  className = "add-player-button">Login</button>  
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
                    <label>Name:<span className = "required">*</span></label>
                    <input className = "form-input add-player-input"/>
                    <br/>
                    <label>Division:<span className = "required">*</span></label>
                    <select className = "form-input add-player-input">
                        <option value = "" selected disabled >Choose a division</option>
                        {this.props.divisions.map((division) =>{
                            return (<option value = {division} >{division}</option>)
                        })}
                    </select>
                    <br/>
                    <label>Contact info:<span className = "required">*</span><p className = "sublabel">(facebook, email, phone, etc.)</p></label>
                    <input className = "form-input add-player-input"></input>
                    <br/>
                    <label>About:<p className = "sublabel">(bio, past results, <a href = "https://spikeball.com/pages/roundnet-player-ratings" target = "__blank">RPR</a>, etc.)</p></label>
                    <input className = "form-input add-player-input"></input>
                    <br/>
                    <label>Image:</label>
                    <div style = {{textAlign:"center", backgroundColor: "#F5F5F5", padding:"10px", borderRadius:"5px", boxShadow:"0px 2px 2px #e5e5e5"}}>
                        <div style = {{padding:"10px"}}>
                            <button className = "form-img-button" onClick = {this.openWidget}>Choose Image</button>
                            <span style = {{padding:"5px"}}> or </span>
                            <button className = "form-img-button" onClick = {this.useProfilePic}>Use Profile Pic</button>
                        </div>
                        {this.state.selectedImg ? (<img src = {this.processImg()} width = "100px" height = "100px"></img>) : (<p>No image selected</p>)}
                    </div>
                    <div style = {{display:"flex", justifyContent: "space-between", marginTop: "20px"}}>
                        <button className = "add-player-button " onClick = {this.props.onClick}>Cancel</button>
                        <button className = "add-player-button " onClick = {() => {this.state.selectedImg ? this.props.submit(this.state.selectedImg.loc): this.props.submit(null)}}>Submit</button>
                    </div>

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
