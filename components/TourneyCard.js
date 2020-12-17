import React, { Component } from 'react'
import {fetchUser} from "../utils/user"
import { isForOfStatement } from 'typescript';



export class TourneyCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            canDelete: false,
            deleteHover: false

        }
    } 

    //get date every second from when it mounts to when it unmounts
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    
    componentWillUpdate(){
        this.checkUser()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    checkUser = async () =>{
        const currUser = await fetchUser()

        if(currUser){
            if(currUser.sub == this.props.tournament.creatorId && this.state.canDelete == false){
                this.setState({canDelete: true})
            }else if(currUser.sub != this.props.tournament.creatorId && this.state.canDelete == true){
                this.setState({canDelete:false})
            }
        }

    }

    getMonthText(dateString){
        const monthNum = dateString.split('-').map((curr) => parseInt(curr))[1]

        const monthText =["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."][monthNum-1]

        return monthText
    }



    render() {

        return (
            <div className = "tourney-card" onClick = {(e) => this.props.handleClick(e, this.props.tournament._id)} id = {this.props.tournament._id}>
                {this.state.canDelete ? (
                    <button 
                        className = "delete-button" 
                        onClick = {(e) => this.props.deleteTourney(e, this.props.tournament)} 
                        onMouseEnter = {() => this.setState({deleteHover: true})}
                        onMouseLeave = {() => this.setState({deleteHover: false})}
                        >
                            {this.state.deleteHover ? "DELETE" : "X"}
                    </button>
                ): null
                }
                <div className = "date-bubble">
                    <span>{this.getMonthText(this.props.tournament.date)}<br/> <span className = "date-num">{this.props.tournament.date.split("-")[2]}</span></span>
                </div>
                <img src = { ("img" in this.props.tournament) ? this.props.tournament.img : "/trophy.png"} className = "tourney-img"></img>
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