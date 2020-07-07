import React, { Component } from 'react'

export class SearchBar extends Component {
    constructor(props){
        super(props)
        this.searchInput = React.createRef()
        this.state = {
            currentlyOpen: null
        }
    }

    /*make this react-y by having the state decide what to render*/
    toggleQueryInput = (type) => {
        //close currently open one if applicable
        let closing = this.state.currentlyOpen;

        if(closing != null){
            this.setState({currentlyOpen: null});
        }

        switch(closing){
            case "search":
                document.getElementsByClassName("search-div")[0].classList.remove("visible-inline")
                break;
            case "filter":
                document.getElementsByClassName("filter-div")[0].classList.remove("visible-inline")
                break;
            case "sort":
                document.getElementsByClassName("sort-div")[0].classList.remove("visible-inline")
                break;
        }

        //open clicked
        if(type != closing){
            this.setState({currentlyOpen: type})
            if(type == "search"){
                document.getElementsByClassName("search-div")[0].classList.add("visible-inline")
            }
            if(type == "filter"){
                document.getElementsByClassName("filter-div")[0].classList.add("visible-inline")
            }
            if(type == "sort"){
                document.getElementsByClassName("sort-div")[0].classList.add("visible-inline")
            }

        }

        

    }

    render() {
        return (
            <div className = "search-bar" >
                <button className = "mobile-toggle-search" onClick = {() => this.toggleQueryInput("search")}>Search</button>
                <div className = "search-div">
                    <input className = "search-input" type = "text" placeholder = "Search" ref ={this.searchInput}></input>
                    <button className = "search-button" onClick = {() => this.props.searchPlayers(this.searchInput.current.value)}>Search</button>
                </div>

                <button className = "filter-sort-button"onClick = {() => this.toggleQueryInput("filter")}>Filter</button>
                <div className = "filter-div">
                    <span className = "select-label">Division: </span>
                    <select id = "divisionSelector" onChange = {this.props.updateDivision}>
                        <option value = "all">All Divisions</option>
                        {this.props.selectedTournament ? 
                            this.props.selectedTournament.divisions.map((division) => {
                                return (<option value = {division}> {division}</option>)
                            }) 
                            : ""}
                    </select>
                </div>
                <button className = "filter-sort-button" onClick = {() => this.toggleQueryInput("sort")}>Sort</button>
                <div className = "sort-div">
                    <span className = "select-label">Sort By: </span>
                    <select onChange = {this.props.changePlayerSort}>
                        <option value = "name.fwd">Name (A-Z)</option>
                        <option value = "name.rev">Name (Z-A)</option>
                        <option value = "div.fwd">Division (A-Z)</option>
                        <option value = "div.rev">Division (Z-A)</option>
                    </select>
                </div>
               
          </div>
        )
    }
}

export default SearchBar
