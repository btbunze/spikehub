import React, { Component } from 'react'

export class SearchBar extends Component {
    constructor(props){
        super(props)
        this.searchInput = React.createRef()
    }

    render() {
        return (
            <div className = "search-bar" >
                <input className = "search-input" type = "text" placeholder = "Search" ref ={this.searchInput}></input>
                <button className = "search-button" onClick = {() => this.props.searchPlayers(this.searchInput.current.value)}>Search</button>
                <div className = "filter-and-sort">
                    <span className = "select-label">Division: </span>
                    <select id = "divisionSelector" onChange = {this.props.updateDivision}>
                        <option value = "all">All Divisions</option>
                        {this.props.selectedTournament ? 
                            this.props.selectedTournament.divisions.map((division) => {
                                return (<option value = {division}> {division}</option>)
                            }) 
                            : ""}
                    </select>

                    <span className = "select-label">Sort By: </span>
                    <select onChange = {this.props.changePlayerSort}>
                        <option value = "name.fwd">Name (A-Z)</option>
                        <option value = "name.rev">Name (Z-A)</option>
                        <option value = "div.fwd">Division (A-Z)</option>
                        <option value = "div.rev">Division (Z-A)</option>
                    </select>

                </div>
                <div className = "mobile-filter-and-sort">
                    <button className = "filter-sort-button">Filter</button>
                    <button className = "filter-sort-button">Sort</button>
                </div>

          </div>
        )
    }
}

export default SearchBar
