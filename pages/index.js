
import React, { Component } from 'react'
import {fetchUser} from "../utils/user"
import auth0 from "../utils/auth0"
import fetch from 'isomorphic-unfetch'


import PlayerCard from "../components/PlayerCard"
import AddPlayerCard from "../components/AddPlayerCard"
import TourneyCard from "../components/TourneyCard"
import TourneyInfo from "../components/TourneyInfo"
import Overlay from "../components/Overlay"
import SearchBar from "../components/SearchBar"
import InfoSection from "../components/InfoSection"

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
      divisionSelect: "all",
      sort: "name.fwd",
      playerQuery: "",
      selectedTournament: null,
    };

  }

  componentDidMount(){
    window.addEventListener("resize", this.maintainPageOnResize)
  }

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

  maintainPageOnResize = () => {
    let grid = document.getElementsByClassName("grid")[0];
    if((this.state.tourneyPage-1) * grid.offsetWidth != -(parseInt(grid.style.left.slice(0,-2)))
        &&
      this.state.displayInfo == false    
    ){
       grid.style.left = String(-(this.state.tourneyPage-1)*grid.offsetWidth) + "px"
    }

  }



  selectTourney = (e, id) =>{
    const target = e.currentTarget;
    const tCards = document.getElementsByClassName('tourney-card')

    document.getElementsByClassName("page-changes")[0].classList.add("hidden")

    for (let card of tCards) {
      if(card != target){
        card.classList.add("hidden");
      }else{
        card.classList.add("selected-tourney-card")
      }
    }

    const selected = this.state.tournaments.find((tournament) => tournament._id == id)



    let grid = document.getElementsByClassName("grid")[0];
    grid.classList.add("grid-no-transition");
    grid.style.left = "0px"
    setTimeout(() =>grid.classList.remove("grid-no-transition"), 50)
    
    this.setState({selectedTournament: selected})
    this.setState({displayInfo: true}, () => {
        const tourneyContainer = document.getElementsByClassName("tourney-container")[0]
        const tiContainer = document.getElementsByClassName("ti-container")[0]
    
        tourneyContainer.classList.add("tourney-info-mode");
        tiContainer.classList.add("tourney-info-mode")
      }
    )

    

  }

  togglePlayerDisplay = (e) => {
    if(this.state.addPlayerForm == true){
      this.toggleAddPlayerForm()

    }

    this.setState({displayPlayers: !this.state.displayPlayers}, () =>{
        document.getElementsByClassName('player-container')[0].classList.toggle("players-fullheight");
        document.getElementsByClassName('arrow')[0].classList.toggle("visible");
        
        let canScrollTo = document.getElementsByClassName("canScrollTo")[0];
        canScrollTo.classList.toggle("visible")
        if(this.state.displayPlayers){
         // canScrollTo.scrollIntoView(true)
        }

      }
    )


  }

  updateDivision = (e) => {
    this.setState({divisionSelect: e.target.value})
  }

  changePlayerSort = (e) => {
    let selectedSort = e.target.options[e.target.selectedIndex].value;
    this.setState({sort: selectedSort})
  }

  searchPlayers = (query) => {
    this.setState({playerQuery: query})
  }

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
  }

  toggleAddPlayerForm = () => {

    if(this.props.userObj.user){
      this.setState({playerFormOpen: !this.state.playerFormOpen})
    }
    else{
      this.setState({loginOverlayOpen: !this.state.loginOverlayOpen})
    }

  }

  submitPlayer = async (imgLocation) => {
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

  deletePlayer = async (delPlayer) => {
    await fetch('/api/free-agents', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(delPlayer)
    })

    this.setState((prevState) => ({players: prevState.players.filter((player) =>
       player != delPlayer 
    )}))
  }

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

  getUser = async () => {
    const userState = await fetchUser();
    const session = await fetch('/api/me')
  }



  render() {
    let tourneyInfo = null;
    let playerCards = null;

    let html = null
    try{
      html = document.querySelector("html");
      if(([this.state.loginOverlayOpen,this.state.tourneyFormOpen,this.state.playerFormOpen].some((elt) => elt))){
        html.style.overflow = "hidden";
      }else{
        html.style.overflow = "scroll"
      }
    }catch{

    }


    if(this.state.displayInfo){
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


      //return a player card for each free agent attending this tournament 
      playerCards = (
        <div className = "card-container player-grid">
          <AddPlayerCard onClick = {this.toggleAddPlayerForm} submit = {this.submitPlayer} formOpen = {this.state.addPlayerForm}/>
          {players.map((player) =>{
            return (<PlayerCard player = {player} deletePlayer = {this.deletePlayer}/>)
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
                })}
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
                                        onClick = {() => this.setState({loginOverlayOpen: false})}
                                      />) : null }
        {this.state.tourneyFormOpen ? (<Overlay 
                                        type = "addTournament" 
                                        onClick = {() => this.setState({tourneyFormOpen: false})} 
                                        submit = {this.submitTourney}
                                      />) : null}
        {this.state.playerFormOpen ? (<Overlay
                                        type = "addPlayer" 
                                        onClick = {() => this.setState({playerFormOpen: false})} 
                                        submit = {this.submitPlayer}
                                        divisions = {this.state.selectedTournament.divisions}
                                      />) : null}
      </>
    )
  
  }
}

export default Home

