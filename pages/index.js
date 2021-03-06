
import React, { Component } from 'react'
import {fetchUser} from "../utils/user"
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

import PlayerCard from "../components/PlayerCard"
import AddPlayerCard from "../components/AddPlayerCard"
import TourneyCard from "../components/TourneyCard"
import TourneyInfo from "../components/TourneyInfo"
import Overlay from "../components/Overlay"
import SearchBar from "../components/SearchBar"
import InfoSection from "../components/InfoSection"

import { isBlock } from 'typescript'

export class Home extends Component {

  static async getInitialProps() {

    const res1 = await fetch(`${process.env.baseUrl}/api/tournaments`, {method: "GET"})
    const tArray = await res1.json()

    const res2 = await fetch(`${process.env.baseUrl}/api/free-agents`, {method: "GET"})
    const pArray = await res2.json()

    return { tournamentsArray : tArray, playersArray : pArray}
  }

  constructor(props) {
    super(props);
    this.state = {
      tournaments : this.props.tournamentsArray,
      players : this.props.playersArray,
      tourneyPage : 1,
      displayInfo: false,
      displayPlayers: false,
      addPlayerForm: false,
      tourneyFormOpen: false,
      playerFormOpen:false,
      loginOverlayOpen:false,
      loginOverlayText:"",
      divisionSelect: "all",
      sort: "name.fwd",
      playerQuery: "",
      selectedTournament: null,
    };

  }

  componentDidMount(){
    window.addEventListener("resize", this.maintainPageOnResize)

    const params = new URLSearchParams(window.location.search)
    if(params.has("t")){
      let tournamentID = params.get("t")
      this.selectTourney(null, tournamentID)
    }
  }


  //Visually shifts the tournaments in the upcoming tournament section
  //------------------------------------------------------------------
  shiftTourneys = (direction) => {

    let grid = document.getElementsByClassName("grid")[0];
    let startPos = parseInt(grid.style.left.slice(0,-2));

    if(direction == "right" && this.state.tourneyPage*3 < this.state.tournaments.length && this.state.selectedTournament == null){
      this.setState((prevState) => ({tourneyPage: prevState.tourneyPage + 1}))
      grid.style.left = String(startPos - grid.offsetWidth) + "px";
    }else if (direction == "left" && this.state.tourneyPage >=2 && this.state.selectedTournament == null){
      this.setState((prevState) => ({tourneyPage: prevState.tourneyPage - 1}))
      grid.style.left = String(startPos + grid.offsetWidth) + "px";
    }
  }


  //Keeps grid sizing consistent as page resizes
  //--------------------------------------------
  maintainPageOnResize = () => {
    let grid = document.getElementsByClassName("grid")[0];
    if((this.state.tourneyPage-1) * grid.offsetWidth != -(parseInt(grid.style.left.slice(0,-2)))
        &&
      this.state.displayInfo == false    
    ){
       grid.style.left = String(-(this.state.tourneyPage-1)*grid.offsetWidth) + "px"
    }

  }


  //Render the information for a tournament
    //e.currentTarget is the selected tourneyCard if a click triggers the function
    //id is the id of the selected tournament if the function is triggered without an event
  //---------------------------------------------------------------------------------------
  selectTourney = (e, id = null) =>{
    //CHANGE TO HAVE CLICKING A TOURNAMENT PUSH TO THE URL AND ONLY USE THE ID TO SELECT IT
    let target;
    if(e){
      target = e.currentTarget;
    }

    const tCards = document.getElementsByClassName('tourney-card')

    document.getElementsByClassName("page-changes")[0].classList.add("hidden")

    for (let card of tCards) {
      if(target){
        if(card != target){
          card.classList.add("hidden");
        }else{
          card.classList.add("selected-tourney-card")
        }
      }
      else{
        if(card.id != id){
          card.classList.add("hidden")  
        }else{
          card.classList.add("selected-tourney-card")
        }
      }
    }

    const selected = this.state.tournaments.find((tournament) => tournament._id == id)

    let grid = document.getElementsByClassName("grid")[0];
    grid.classList.add("grid-no-transition");
    grid.style.left = "0px"
    setTimeout(() =>grid.classList.remove("grid-no-transition"), 50)
    
    console.log("2")

    this.setState({selectedTournament: selected})
    this.setState({displayInfo: true}, () => {
        const tourneyContainer = document.getElementsByClassName("tourney-container")[0]
        const tiContainer = document.getElementsByClassName("ti-container")[0]
    
        tourneyContainer.classList.add("tourney-info-mode");
        tiContainer.classList.add("tourney-info-mode")
      }
    )

    console.log("3")
    //history.pushState({},"",`/?t=${id}`)
  }


  //Opens or closes the free agent list, depending on its current state
  //-------------------------------------------------------------------
  togglePlayerDisplay = (e) => {
    if(this.state.addPlayerForm == true){
      this.toggleAddPlayerForm()

    }

    this.setState({displayPlayers: !this.state.displayPlayers}, () =>{

        //flip svg arrow
        const arrow = document.querySelector(".ti-button path");
        this.state.displayPlayers ? arrow.setAttribute('d', "M0,2 L5,8 L10,2") : arrow.setAttribute('d', "M0,8 L5,2 L 10,8")

        //open player panel
        document.getElementsByClassName('player-container')[0].classList.toggle("players-fullheight");
        document.getElementsByClassName('arrow')[0].classList.toggle("visible");
        
        let canScrollTo = document.getElementsByClassName("canScrollTo")[0];
        canScrollTo.classList.toggle("visible")
      }
    )


  }

  //update selected division filter
  //-------------------------------
  updateDivision = (e) => {
    this.setState({divisionSelect: e.target.value})
  }

  //update player sort method
  //-------------------------
  changePlayerSort = (e) => {
    let selectedSort = e.target.options[e.target.selectedIndex].value;
    this.setState({sort: selectedSort})
  }

  //uses passed query to search players
  //-----------------------------------
  searchPlayers = (query) => {
    this.setState({playerQuery: query})
  }


  //Closes all open information panes for the current toruanment and re-renders the tourneyCards
  //--------------------------------------------------------------------------------------------
  closeInfo = (e) => {
    let cards = document.getElementsByClassName("tourney-card")

    const tourneyContainer = document.getElementsByClassName("tourney-container")[0]
    const tiContainer = document.getElementsByClassName("ti-container")[0]

    document.getElementsByClassName("page-changes")[0].classList.remove("hidden")

    if(tiContainer){
      tourneyContainer.classList.remove("tourney-info-mode");
      tiContainer.classList.remove("tourney-info-mode")
    }

    for(let card of cards){
      card.classList.remove("hidden")
      card.classList.remove("selected-tourney-card")
    }

    document.getElementsByClassName('player-container')[0].classList.remove("players-fullheight")
    document.getElementsByClassName('arrow')[0].classList.remove("visible");
    setTimeout(() => document.getElementsByClassName("canScrollTo")[0].classList.remove("visible"), 500);

    let grid = document.getElementsByClassName("grid")[0];
    grid.classList.add("grid-no-transition");
    grid.style.left = String(-((this.state.tourneyPage-1) * grid.offsetWidth)) + "px"
    setTimeout(() =>grid.classList.remove("grid-no-transition"), 50)

    this.setState({selectedTournament: null})
    this.setState({displayInfo: false})
    this.setState({displayPlayers: false})
    this.setState({divisionSelect: "all"})

    //history.pushState({},"",`/`)
  }


  //opens or closes the form to add a free agent depending on its current state
  //---------------------------------------------------------------------------
  toggleAddPlayerForm = () => {
    if(this.props.userObj.user){
      this.setState({defaultPlayerPrompt: !this.state.playerFormOpen})
      this.setState({playerFormOpen: !this.state.playerFormOpen})      
    }
    else{
      this.toggleLoginOverlay("add players.")
    }
  }


  //opens or closes login prompt overlay depending on its current state
  //-------------------------------------------------------------------
  toggleLoginOverlay = (text = "") => {
    this.setState({loginOverlayOpen: !this.state.loginOverlayOpen, loginOverlayText: text})
  }


  //adds player (based on user's inputs) to state and database
  //----------------------------------------------------------
  submitPlayer = async (imgLocation) => {
    [... document.querySelectorAll(".add-player-button")].forEach(elt => elt.disabled = true);
    const inputFields = document.getElementsByClassName("add-player-input");
    const currUser = await fetchUser(); 
    if(currUser == null){
      return;
    }

    const newPlayer = {
      name: inputFields[0].value,
      division: inputFields[1].value,
      contact: inputFields[2].value, 
      selfDesc: inputFields[3].value,
      tournamentId: this.state.selectedTournament._id,
      creatorId: currUser.sub,
      img: imgLocation
    }

    let invalidInputs = false;

    if(newPlayer.name == ""){
      invalidInputs = true
      inputFields[0].classList.add("invalid-input");
    }else{
      inputFields[0].classList.remove("invalid-input");
    }


    if(newPlayer.division == ""){
      invalidInputs = true
      inputFields[1].classList.add("invalid-input")
    }else{
      inputFields[1].classList.remove("invalid-input")
    }

    if(newPlayer.contact == ""){
      invalidInputs = true
      inputFields[2].classList.add("invalid-input")
    }else{
      inputFields[2].classList.remove("invalid-input")
    }

    if(invalidInputs){
      [... document.querySelectorAll(".add-player-button")].forEach(elt => elt.disabled = false)
      return;
    }

    await fetch('/api/free-agents', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    })

    this.setState((prevState) => ({players: [...prevState.players, newPlayer]}))
    this.toggleAddPlayerForm()
  }

  //adds player (based on user's profile) to state and database
  submitDefaultPlayer = async () => {
    [... document.querySelectorAll(".add-player-button")].forEach(elt => elt.disabled = true)
    const inputFields = document.getElementsByClassName("add-player-input");
    const user = await fetchUser();
    //get user metadata
    const response = await fetch('/api/user-metadata',{
      method: "PUT",
      body: JSON.stringify({
          userId: user.sub
      })
    })

    const meta = await response.json()
    console.log(meta)

    const newPlayer = {
      name: meta.name,
      division: inputFields[0].value,
      contact: meta.contact, 
      selfDesc: meta.selfDesc,
      tournamentId: this.state.selectedTournament._id,
      creatorId: user.sub,
      img: meta.img,
      linkToProfile: true
    }

    let invalidInputs = false;

    if(newPlayer.name == undefined || newPlayer.name == "" || newPlayer.contact == undefined || newPlayer.contact == ""){
      invalidInputs = true
      console.log(document.querySelectorAll(".profile-error-message"))
      document.querySelectorAll(".profile-error-message")[0].classList.remove("hidden")
    }else{
      document.querySelectorAll(".profile-error-message")[0].classList.add("hidden")
    }

    if(newPlayer.division == ""){
      invalidInputs = true
      inputFields[0].classList.add("invalid-input")
    }else{
      inputFields[0].classList.remove("invalid-input")
    }

    if(invalidInputs){
      [... document.querySelectorAll(".add-player-button")].forEach(elt => elt.disabled = false)
      return;
    }

    await fetch('/api/free-agents', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    })

    this.setState((prevState) => ({players: [...prevState.players, newPlayer]}))
    this.toggleAddPlayerForm()
  }

  //NOT IN USE
  //Adds tournament (based on user inputs) to state and database
  //------------------------------------------------------------
  submitTourney = async (imgLocation) => {
    const inputFields = document.getElementsByClassName("form-input");
    const currUser = await fetchUser(); 
    const newTourney = {
      name: inputFields[0].value,
      location: inputFields[1].value,
      date: inputFields[2].value,
      divisions: inputFields[3].value.split(","),
      desc: inputFields[4].value,
      link: inputFields[5].value,
      creatorId: currUser.sub,
      img: imgLocation
    }

    await fetch('/api/tournaments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTourney),
    })

    this.setState((prevState) => ({tournaments: [...prevState.tournaments, newTourney], tourneyFormOpen: false}))
  }


  //deletes player from state and database
  //--------------------------------------
  deletePlayer = async (delPlayer) => {
    const del = await fetch('/api/free-agents', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(delPlayer)
    }).then((res) => console.log(res.body))



    this.setState((prevState) => ({players: prevState.players.filter((player) =>
       player != delPlayer 
    )}))
  }


  //deletes tournament from state and database
  //------------------------------------------
  deleteTourney = async (e, delTourney) => {
    e.stopPropagation()
    this.closeInfo(e)

    await fetch('/api/tournaments', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(delTourney)
    })

    this.setState((prevState) => ({tournaments: prevState.tournaments.filter((tourney) =>
      tourney != delTourney
    )}))
  }



  render() {
    let tourneyInfo = null;
    let playerCards = null;


    //Disable scrolling if overlay is open
    let html = null
    try{
      html = document.querySelector("html");
      if(([this.state.loginOverlayOpen,this.state.tourneyFormOpen,this.state.playerFormOpen].some((elt) => elt))){
        html.style.overflow = "hidden";
      }else{
        html.style["overflow-y"] = "scroll"
      }
    }catch{
      //
    }


    if(this.state.displayInfo){
      //populate the tourney info section
      tourneyInfo = (<TourneyInfo tournament = {this.state.selectedTournament} togglePlayerDisplay = {this.togglePlayerDisplay} closeInfo = {this.closeInfo}/>)
    }

    if(this.state.displayPlayers){
      //const divisionSelect = document.getElementById("divisionSelector")

      //filter out free agents not attending this tournament
      let players = this.state.players.filter((player) => player.tournamentId == this.state.selectedTournament._id)
      //filter out free agents in the wrong division
      if(this.state.divisionSelect != "all"){
        players = players.filter((player) => player.division == this.state.divisionSelect)
      }

      //sort according to sort choice
      players = players.sort((a,b) => {
        switch(this.state.sort){
          case "name.fwd":
            return a.name > b.name ? 1 : -1
          case "name.rev":
            return a.name < b.name ? 1 : -1
          case "div.fwd":
            return a.division > b.division ? 1 : -1
          case "div.rev":
            return a.division < b.division ? 1 : -1
        }
      })

      //filter according to search query
      if(this.state.playerQuery != "") players = players.filter((player) => player.name.includes(this.state.playerQuery))

      //render a player card for each free agent for this tournament 
      playerCards = (
        <div className = "card-container player-grid">
          <AddPlayerCard onClick = {this.toggleAddPlayerForm} submit = {this.submitPlayer} formOpen = {this.state.addPlayerForm}/>
          {players.map((player) =>{
            return (<PlayerCard player = {player} deletePlayer = {this.deletePlayer} toggleLoginOverlay = {this.toggleLoginOverlay}/>)
          })}
        </div>
      )
    }

    return (
      <>

        <img src="https://res.cloudinary.com/dicfhqxoo/image/upload/v1594781483/thumbnails/Screenshot_67_l9wiq3.png" width= "0px" height = "0px"/>
        <div className = "content">
          <h1 className = "cont-title" onClick = {this.closeInfo}>Upcoming Tournaments </h1>
          <a href = "https://docs.google.com/forms/d/e/1FAIpQLSc26lCFtWMyCPwblbcRpk-3_flsy_louCor5tQUsD55IKH1WA/viewform?usp=sf_link" target = "_blank">
          <button className = "new-tournament button-invert" onClick = {()=> this.closeInfo()}>ADD NEW</button>
          </a>
          <div className = "page-changes">
            <button className = "page-change-button" onClick = {() => {this.shiftTourneys("left")}}>←</button>
            <span className = "page-change-text">
              {this.state.tourneyPage * 3 - 2}-{Math.min(this.state.tourneyPage*3, this.state.tournaments.length)} of {this.state.tournaments.length}
            </span>
            <button className = "page-change-button" onClick = {() => {this.shiftTourneys("right")}}>→</button>
          </div>
          <div className = "main">
            <div className="container tourney-container">
              <div className = "grid" style = {{left:'0px'}}>
                {this.state.tournaments
                  .map((tourney) =>{
                  return (<TourneyCard handleClick = {this.selectTourney} tournament = {tourney} deleteTourney = {this.deleteTourney}/>)
                  })
                }
                {tourneyInfo}
              </div>
            </div>
            <div className =  "arrow"></div>
            <div className = "canScrollTo">
              <div className = 'container player-container' id = "playerContainer">
                <SearchBar selectedTournament = {this.state.selectedTournament} updateDivision = {this.updateDivision} changePlayerSort = {this.changePlayerSort} searchPlayers = {this.searchPlayers}/>
                {playerCards}
              </div>
            </div>
          </div>
        </div>
        <InfoSection></InfoSection>
        
        {this.state.loginOverlayOpen ? (<Overlay 
                                        type = "loginPrompt"
                                        text = {this.state.loginOverlayText}
                                        onClick = {this.toggleLoginOverlay}
                                      />) : null }
        {this.state.tourneyFormOpen ? (<Overlay 
                                        type = "addTournament" 
                                        onClick = {() => this.setState({tourneyFormOpen: false})} 
                                        submit = {this.submitTourney}
                                      />) : null}
        {this.state.playerFormOpen ? 
            (this.state.defaultPlayerPrompt ?
                                      (<Overlay
                                        type = "defaultPlayer"
                                        onClick = {() => this.setState({defaultPlayerPrompt: false})}
                                        submit = {(event) => {console.log("clicked"); this.submitDefaultPlayer(event)}}
                                        divisions = {this.state.selectedTournament.divisions}
                                      />)
                                      :(<Overlay
                                        type = "addPlayer" 
                                        onClick = {/*() => this.setState({playerFormOpen: false})*/this.toggleAddPlayerForm} 
                                        submit = {this.submitPlayer}
                                        divisions = {this.state.selectedTournament.divisions}
                                      />))
                                    : null}
      </>
    )
  
  }
}

export default Home

