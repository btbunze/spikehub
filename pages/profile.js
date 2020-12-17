import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import {fetchUser} from "../utils/user"

import PlayerCard from "../components/PlayerCard"
import Overlay from "../components/Overlay"
import { render } from 'react-dom'
import { EndOfLineState } from 'typescript'



export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            player: {},
            oldPlayer: {},
            isCurrUser: false,
            isEditing: false,
            isAddingTourney: false,
            isAddingTeam: false,
            tourneyTableRows: //this.props.player.pastTourneys ? this.props.player.pastTourneys : 
            [],
            teamTableRows: //this.props.player.pastTeams ? this.props.player.pastTeams : 
            []
        }
    }

    async componentDidMount(){

        const query = new URLSearchParams(window.location.search)

        const user = await fetchUser()
        //if user is null, redirect to 404
        if(user == null){
            return;
        }

        if(query.get("user") == user.sub){
            this.setState({isCurrUser: true})
        }

        const response = await fetch('/api/user-metadata',{
            method: "PUT",
            body: JSON.stringify({
                userId: query.get("user")
            })
        })

        const meta = await response.json()
        this.setState({player: meta, oldPlayer: meta, tourneyTableRows: (meta.pastTourneys ? meta.pastTourneys : []), teamTableRows: (meta.pastTeams ? meta.pastTeams : [])})
    }

    // async componentWillUpdate(){

    //     const response = await fetch('/api/user-metadata',{
    //         method: "GET",
    //     })
    //     const meta = await response.json()
    //     console.log(meta)
    //     this.setState({player: meta, tourneyTableRows: meta.pastTourneys ? meta.pastTourneys : [], teamTableRows: meta.pastTeams ? meta.pastTeams : []})
    // }




    toggleEdit = () => {
        this.setState(prevState => ({isEditing: !prevState.isEditing}));
    }

    openWidget = () => {
        cloudinary.openUploadWidget({
            cloudName: "dicfhqxoo", uploadPreset: "spike_hub" }, (error, result) => { 
                if(result.event == "queues-end"){
                    console.log(result.data.info.files[0].uploadInfo.secure_url)
                    this.setState({player: { ...this.state.player, img: result.data.info.files[0].uploadInfo.secure_url}}, console.log(this.state.player.img))
                }

            });
    }

    processImg = (imgLink) =>{
        console.log(imgLink)
        if (imgLink.includes("cloudinary")){
            const splitImgLink = imgLink.split("upload/");
            const processedImg = splitImgLink[0] + "upload/w_1000,ar_1:1,c_fill,g_auto/" + splitImgLink[1]
            console.log(processedImg)
            return processedImg;
        }
        return imgLink;
    }

    handleChange = (event, inputType) => {
        const changedValue = event.currentTarget.value
        this.setState((prevState) => ({player: {...prevState.player, [inputType]: changedValue}}))
    }

    updateUser = async () => {
        //check if user is same as before to limit api calls

        const user = await fetchUser()

        //if user is null, redirect to 404
        if(user == null){
            return;
        }

        const response = await fetch('/api/user-metadata', {
            method: "PATCH",
            body: JSON.stringify({userId: user.sub, player: this.state.player})
        })
        const json = response.json()
        console.log(json)

        this.setState({oldPlayer: this.state.player})
        this.toggleEdit();
    }

    cancelUpdate = async () => {
        this.setState({player: this.state.oldPlayer})

        this.toggleEdit();
    }

    addPastTourney = () => {
        this.setState({isAddingTourney: true})
        //check if mobile/low-width

        if(window.innerWidth > 750){
            const newRow = [
                <input className = "form-input"></input>,
                <input className = "form-input"></input>,
                <input className = "form-input"></input>,
                <input className = "form-input"></input>
            ]
    
            this.setState({tourneyTableRows: [...this.state.tourneyTableRows, newRow]})
        }

    }

    cancelPastTourney = () => {
        if(window.innerWidth > 750){
            this.setState({tourneyTableRows: this.state.tourneyTableRows.slice(0,-1)})
        }
        this.setState({isAddingTourney: false})
    }

    confirmPastTourney = async () => {
        let newTourneyRows = this.state.tourneyTableRows
        let newTourneyValues;

        if(window.innerWidth > 750){
            const tableRows = document.querySelector("#tourneyTable").children;
            const lastRow = tableRows[tableRows.length-1];
            newTourneyValues = [... lastRow.children]
            newTourneyValues.pop()
            newTourneyValues = newTourneyValues.map((elt) => elt.children[0].value)
    
            newTourneyRows[newTourneyRows.length-1] = newTourneyValues
        }
        else{
            //refactor this class name
            const inputFields = document.getElementsByClassName("add-player-input");
            newTourneyValues = Array.from(inputFields).map(elt => elt.value)
            newTourneyRows.push(newTourneyValues)
        }

        const user = await fetchUser()

        //if user is null, redirect to 404
        if(user == null){
            return;
        }

        const response = await fetch('/api/user-metadata', {
            method: "PATCH",
            body: JSON.stringify({userId: user.sub, player: {pastTourneys: newTourneyRows}})
        })
        const json = response.json()
        console.log(json)


        this.setState({tourneyTableRows: newTourneyRows})
        this.setState({isAddingTourney: false})

        console.log(this.state.tourneyTableRows)
    }

    deletePastTourney = async (event) => {
        if(this.state.isAddingTourney){
            return;
        }

        let currTourneys = this.state.tourneyTableRows
        let delTourneyIndex = event.currentTarget.parentElement.parentElement.getAttribute("index")

        let newTourneysArray = currTourneys.filter((element,index) => index !== parseInt(delTourneyIndex));
        //create new array without deleted element
        const user = await fetchUser()

        //if user is null, redirect to 404
        if(user == null){
            return;
        }

        const response = await fetch('/api/user-metadata', {
            method: "PATCH",
            body: JSON.stringify({userId: user.sub, player: {pastTourneys: newTourneysArray}})
        })

        this.setState({tourneyTableRows: newTourneysArray})
    }

    addPastTeam = () => {
        if(window.innerWidth > 750){
            const newRow = [
                <input className = "form-input"></input>,
                <input className = "form-input"></input>,
                <input className = "form-input"></input>,
                <input className = "form-input"></input>
            ]
            this.setState({teamTableRows: [...this.state.teamTableRows, newRow]})

        }
        else{

        }
        this.setState({isAddingTeam: true})
    }

    cancelPastTeam = () => {
        if(window.innerWidth > 750){
            this.setState({teamTableRows: this.state.teamTableRows.slice(0,-1)})
        }
        this.setState({isAddingTeam: false})
    }

    confirmPastTeam = async () => {
        let newTeamValues;
        let newTeamRows = this.state.teamTableRows;
        if(window.innerWidth > 750){
            const teamRows = document.querySelector("#teamTable").children;
            const lastRow = teamRows[teamRows.length-1];
    
            newTeamValues = [... lastRow.children]
            newTeamValues.pop()
            newTeamValues = newTeamValues.map((elt) => elt.children[0].value)
            newTeamRows[newTeamRows.length-1] = newTeamValues

        }
        else{
            //refactor this class name
            const inputFields = document.getElementsByClassName("add-player-input");
            newTeamValues = Array.from(inputFields).map(elt => elt.value)
            newTeamRows.push(newTeamValues)
        }




        const user = await fetchUser()

        //if user is null, redirect to 404
        if(user == null){
            return;
        }

        const response = await fetch('/api/user-metadata', {
            method: "PATCH",
            body: JSON.stringify({userId: user.sub, player: {pastTeams: newTeamRows}})
        })

        this.setState({teamTableRows: newTeamRows})
        this.setState({isAddingTeam: false})
    }

    deletePastTeam = async (event) => {
        if(this.state.isAddingTeam){
            return;
        }

        let currTeams = this.state.teamTableRows
        let delTeamIndex = event.currentTarget.parentElement.parentElement.getAttribute("index")

        let newTeamsArray = currTeams.filter((element,index) => index !== parseInt(delTeamIndex));
        //create new array without deleted element
        const user = await fetchUser()

        //if user is null, redirect to 404
        if(user == null){
            return;
        }

        const response = await fetch('/api/user-metadata', {
            method: "PATCH",
            body: JSON.stringify({userId: user.sub, player: {pastTeams: newTeamsArray}})
        })

        this.setState({teamTableRows: newTeamsArray})
    }

    //TODO: Componentize tiles
    //      Change input types to make more sense
    render (){
        if(this.state.player == null){
            //Return Loading Icon
            return <></>;
        }
        return (
            <>
                <div className = "profile-content">
                    <div className = "card-container hide-on-small">
                        <PlayerCard player = {this.state.player} deletePlayer = {null}/>
                        <div className = "ydp-container">
                            <h3 className ="ydp-text">Your Default Player</h3>
                        </div>
    
                    </div>
                    <h1 className = "profile-header">{this.state.player.name ? this.state.player.name : "Player Name"} - Profile</h1>
                    
                    {this.state.isCurrUser ?
                        (<>{this.state.isEditing ? 
                        <div className = "profile-edit-button-container">
                            <button className = "profile-edit-button margin-right" onClick = {this.updateUser}>Confirm</button>
                            <button className = "profile-edit-button" onClick = {this.cancelUpdate}>Cancel</button>
                        </div>
                        :<button className = "profile-edit-button" onClick = {this.toggleEdit}>Edit</button>}</>)
                    : null}
                    
                    <div className = "profile-info">
                        {/*<h2 className = "profile-section-header">General Info</h2>*/}
                        <div className = "gen-info-grid">
                            <div className = "prof-pic-tile">
                                {this.state.isEditing ? <button className = "choose-pic-button" onClick = {this.openWidget}>Change Picture</button>
                                :<img src = {this.state.player.img ? this.processImg(this.state.player.img) : "/default-prof-pic.png"} style = {{borderRadius: "50%", width:"100%"}}></img>}
                            </div>
                            <div className = "gen-info-tile">
                                <h3 className = "tile-title">Name</h3>
                                {this.state.isEditing ? 
                                    <input className = "form-input" 
                                           value = {this.state.player.name}
                                           placeholder = "Player Name"
                                           onChange = {(event) => this.handleChange(event, "name")}>
                                    </input> : 
                                    <p className = "tile-content">{this.state.player.name ? this.state.player.name : "[No Name]"}</p>
                                }
                            </div>
                            <div className = "gen-info-tile">
                                <h3 className = "tile-title">Contact Info</h3>
                                {this.state.isEditing ? 
                                    <input className = "form-input" 
                                           value = {this.state.player.contact}
                                           placeholder = "Your Contact Info"
                                           onChange = {(event) => this.handleChange(event, "contact")}>
                                    </input> : 
                                    <p className = "tile-content">{this.state.player.contact ? this.state.player.contact : "[No Contact Info]"}</p>
                                }
                            </div>
                            <div className = "gen-info-tile">
                                <h3 className = "tile-title">RPR</h3>
                                {this.state.isEditing ? 
                                    <input className = "form-input" 
                                           value = {this.state.player.rpr}
                                           placeholder = "Your RPR"
                                           onChange = {(event) => this.handleChange(event, "rpr")}>
                                    </input> : 
                                    <p className = "tile-content">{this.state.player.rpr ? this.state.player.rpr : "[No RPR]"}</p>
                                }
                            </div>
                            <div className = "gen-info-tile">
                                <h3 className = "tile-title">Handedness</h3>
                                {this.state.isEditing ? 
                                    <input className = "form-input" 
                                           value = {this.state.player.hand}
                                           placeholder = "Your Dominant Hand"
                                           onChange = {(event) => this.handleChange(event, "hand")}>
                                    </input> : 
                                    <p className = "tile-content">{this.state.player.hand ? this.state.player.hand : "[No Dominant Hand]"}</p>
                                }
                            </div>
                            <div className = "gen-info-tile full-width" style = {{gridColumn: "1/-1"}}>
                                <h3 className = "tile-title">Bio</h3>
                                {this.state.isEditing ? 
                                    <input className = "form-input" 
                                           value = {this.state.player.selfDesc}
                                           placeholder = "Your Bio"
                                           onChange = {(event) => this.handleChange(event, "selfDesc")}>
                                    </input> : 
                                    <p className = "tile-content">{this.state.player.selfDesc ? this.state.player.selfDesc : "[No Bio]"}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className = "profile-info">
                        <h2 className = "profile-section-header">Past Tournaments</h2>
                        <table id = "tourneyTable">
                            <tr className = "table-head">
                                <th>Tournament</th>
                                <th>Partner</th>
                                <th>Division</th>
                                <th>Result</th>
                                <th>🗑</th>
                            </tr>

                            {this.state.tourneyTableRows.map((row,index)=>{
                                console.log(row)
                                return (<tr index = {index}>
                                    {row.map((cell) => <td>{cell}</td>)}
                                    <td><button onClick = {this.deletePastTourney}>x</button></td>
                                </tr>)
                            })}
                        </table>
                        <table id = "tourneyTableMobile">
                            <tr>
                                <th>Tournament</th>
                                <th>Result</th>
                                <th>🗑</th>
                            </tr>
                            {this.state.tourneyTableRows.map((row, index)=>{
                                console.log(row)
                                return (<tr index = {index}>
                                    <td>{row[0]}</td>
                                    <td>{row[3]} in {row[2]} division</td>
                                    <td> <button onClick = {this.deletePastTourney}>x</button> </td>
                                </tr>)
                            })}
                        </table>
                        {this.state.isCurrUser ? 
                        <>{this.state.isAddingTourney ? 
                            <>
                                <button className = "add-entry" onClick = {this.confirmPastTourney}>Confirm</button>
                                <button className = "add-entry" onClick = {this.cancelPastTourney}>Cancel</button>
                            </>
                            :<button className = "add-entry" onClick = {this.addPastTourney}>ADD ENTRY</button>}
                        </>
                        :null}
                    </div>
                    <div className = "profile-info">
                        <h2 className = "profile-section-header">Previous Teams</h2>
                        <table id = "teamTable">
                            <tr className = "table-head">
                               <th>Team Name</th>
                                <th>Partner</th>
                                <th>Duration</th>
                                <th>Notes</th>
                                <th>🗑</th>
                            </tr>
                            {this.state.teamTableRows.map((row,index)=>{
                                return (<tr index = {index}>
                                    {row.map((cell) => <td>{cell}</td>)}
                                    <td> <button onClick = {this.deletePastTeam}>x</button> </td>
                                </tr>)
                            })}
                        </table>
                        <table id = "teamTableMobile">
                            <tr>
                                <th>Team Name</th>
                                <th>Partner</th>
                                <th>🗑</th>
                            </tr>
                            {this.state.teamTableRows.map((row,index)=>{
                                console.log(row)
                                return (<tr index = {index}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]} </td>
                                    <td><button onClick = {this.deletePastTeam}> x </button></td>
                                </tr>)
                            })}
                        </table>
                        {this.state.isCurrUser ? 
                        <>{this.state.isAddingTeam ? 
                            <>
                                <button className = "add-entry" onClick = {this.confirmPastTeam}>Confirm</button>
                                <button className = "add-entry" onClick = {this.cancelPastTeam}>Cancel</button>
                            </>
                            :<button className = "add-entry" onClick = {this.addPastTeam}>ADD ENTRY</button>}
                        </>
                        :null}
                    </div>
                </div>
                {this.state.isAddingTourney ? 
                                        (window.innerWidth <= 750 ?
                                            (<Overlay 
                                            type = "addPastTournament"
                                            onClick = {this.cancelPastTourney}
                                            submit = {this.confirmPastTourney}
                                            />) : null )
                                        :null}
                {this.state.isAddingTeam ? 
                                    (window.innerWidth <= 750 ?
                                        (<Overlay 
                                        type = "addPastTeam"
                                        onClick = {this.cancelPastTeam}
                                        submit = {this.confirmPastTeam}
                                        />) : null )
                                    :null}
    
            </>
    
        )
    }
    
}


