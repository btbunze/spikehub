import React, { Component } from 'react'

export class SearchBar extends Component {
    render() {
        return (
            <div className = "search-bar" >
                <input className = "search-input"type = "text" placeholder = "Search"></input>
                <button className = "search-button">Search</button>

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
                    <select>
                        <option value = "name.fwd">Name (A-Z)</option>
                        <option value = "name.rev">Name (Z-A)</option>
                        <option value = "div.fwd">Division (High-Low)</option>
                        <option value = "div.rev">Division (Low-High)</option>
                    </select>

                </div>

          </div>
        )
    }
}

export default SearchBar
