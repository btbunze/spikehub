
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'

import PlayerCard from "../components/PlayerCard"
import AddPlayerCard from "../components/AddPlayerCard"
import TourneyCard from "../components/TourneyCard"
import TourneyInfo from "../components/TourneyInfo"
import OverlayForm from "../components/OverlayForm"
import SearchBar from "../components/SearchBar"

export class Home extends Component {


  static async getInitialProps() {
    const res1 = await fetch('/api/tournaments', {method: "GET"})
    const tArray = await res1.json()

    const res2 = await fetch('/api/free-agents', {method: "GET"})
    const pArray = await res2.json()

    return { tournamentsArray : tArray, playersArray : pArray }
  }

  constructor(props) {
    super(props);
    this.state = {
      tournaments : this.props.tournamentsArray,
      players : this.props.playersArray,
      displayInfo: false,
      displayPlayers: false,
      addPlayerForm: false,
      overlayOpen: false,
      divisionSelect: "all",
      sort: "name.fwd",
      selectedTournament: null
    };
  }



  selectTourney = (e, id) =>{
    const target = e.currentTarget;
    const tCards = document.getElementsByClassName('tourney-card')

    for (let card of tCards) {
      if(card != target){
        card.classList.add("hidden");
      }
    }

    const selected = this.state.tournaments.find((tournament) => tournament._id == id)

    this.setState({selectedTournament: selected})
    this.setState({displayInfo: true})
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
          canScrollTo.scrollIntoView(true)
        }

      }
    )


  }

  updateDivision = (e) => {
    this.setState({divisionSelect: e.target.value})
  }

  closeInfo = (e) => {
    let cards = document.getElementsByClassName("tourney-card")

    for(let card of cards){
      card.classList.remove("hidden")

    }

    document.getElementsByClassName('player-container')[0].classList.remove("players-fullheight")
    document.getElementsByClassName('arrow')[0].classList.remove("visible");
    setTimeout(() => document.getElementsByClassName("canScrollTo")[0].classList.remove("visible"), 500);

    this.setState({selectedTournament: null})
    this.setState({displayInfo: false})
    this.setState({displayPlayers: false})
    this.setState({divisionSelect: "all"})
  }

  toggleAddPlayerForm = () => {
    document.getElementById("addPlayer").classList.toggle("add-player")
    document.getElementById("addPlayer").classList.toggle("add-player-form")
    this.setState({addPlayerForm: !this.state.addPlayerForm})
  }

  submitPlayer = async () => {
    const inputFields = document.getElementsByClassName("add-player-input");
    const newPlayer = {
      name: inputFields[0].value,
      division: inputFields[1].value,
      selfDesc: inputFields[2].value,
      tournamentId: this.state.selectedTournament._id
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

  submitTourney = async () => {
    const inputFields = document.getElementsByClassName("form-input");
    const newTourney = {
      name: inputFields[0].value,
      location: inputFields[1].value,
      date: inputFields[2].value,
      divisions: inputFields[3].value.split(","),
      desc: inputFields[4].value,
      link: inputFields[5].value
    }

    await fetch('/api/tournaments', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTourney),
    })

    this.setState((prevState) => ({tournaments: [...prevState.tournaments, newTourney]}))
  }

  render() {

    let tourneyInfo = null;
    let playerCards = null;

    if(this.state.displayInfo){
      tourneyInfo = (<TourneyInfo tournament = {this.state.selectedTournament} togglePlayerDisplay = {this.togglePlayerDisplay} closeInfo = {this.closeInfo}/>)
    }

    if(this.state.displayPlayers){
      console.log('rerendered player display')
      //const divisionSelect = document.getElementById("divisionSelector")

      //filter out free agents not attending this tournament
      console.log(this.state.players )
      console.log(this.state.selectedTournament)
      let players = this.state.players.filter((player) => player.tournamentId == this.state.selectedTournament._id)
      //filter out free agents in the wrong division
      if(this.state.divisionSelect != "all"){
        players = players.filter((player) => player.division == this.state.divisionSelect)
      }

      console.log(players)

      //return a player card for each free agent attending this tournament 
      playerCards = (
        <div className = "card-container grid">
          <AddPlayerCard onClick = {this.toggleAddPlayerForm} submit = {this.submitPlayer} formOpen = {this.state.addPlayerForm}/>
          {players.map((player) =>{
            return (<PlayerCard player = {player}/>)
          })}
        </div>
      )
    }

    return (
      <>

        <div className = "content">
          <h1 className = "cont-title">Upcoming Tournaments </h1>
          <button className = "new-tournament button-invert" onClick = {()=> this.setState({overlayOpen: true})}>Add New</button>
          <div className = "main">
            <div className="container container-shadow">
              <div className = "grid">
                {this.state.tournaments.map((tourney) =>{
                  return (<TourneyCard handleClick = {this.selectTourney} tournament = {tourney}/>)
                })}
                {/*<TourneyCard handleClick = {this.selectTourney} tournament = {this.state.tournaments[0]}/>
                <TourneyCard handleClick = {this.selectTourney} tournament = {this.state.tournaments[1]}/>
                <TourneyCard handleClick = {this.selectTourney} tournament = {this.state.tournaments[1]}/>*/}
                {tourneyInfo}
              </div>
            </div>
            <div className =  "arrow"></div>
            <div className = "canScrollTo">
              <div className = 'container player-container' id = "playerContainer">
                <SearchBar selectedTournament = {this.state.selectedTournament} updateDivision = {this.updateDivision}/>
                {playerCards}
              </div>
            </div>
          </div>


        </div>
        {this.state.overlayOpen ? (<OverlayForm onClick = {() => this.setState({overlayOpen: false})} submit = {this.submitTourney}/>) : null}
      </>
    )
  
  }
}

export default Home

