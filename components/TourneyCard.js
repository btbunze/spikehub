import React, { Component } from 'react'


export class TourneyCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            deleteHover: false
        }
    } 

    //get date every second from when it mounts to when it unmounts
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {


        return (
            <div className = "tourney-card" onClick = {(e) => this.props.handleClick(e, this.props.tournament._id)}>
                <button 
                    className = "delete-button" 
                    onClick = {(e) => this.props.deleteTourney(e, this.props.tournament)} 
                    onMouseEnter = {() => this.setState({deleteHover: true})}
                    onMouseLeave = {() => this.setState({deleteHover: false})}
                    >
                        {this.state.deleteHover ? "DELETE" : "X"}
                </button>
                <div className = "img-container">
                    <img src = { ("img" in this.props.tournament) ? this.props.tournament.img : "/trophy.png"} className = {("img" in this.props.tournament) ? "tourney-img" : "tourney-img default-img"}></img>
                </div>
                <div className = "tourney-infobar">
                    <div className = "infobar-left">
                        <h2 className = "tc-title">{this.props.tournament.name}</h2>
                    </div>
                    <div className = "infobar-right">
                        <span className = "countdown-text">Registration <br/> closes in <br/> <strong>10 Days</strong></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default TourneyCard