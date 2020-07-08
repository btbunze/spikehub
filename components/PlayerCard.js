import React, { Component } from 'react'
import {fetchUser} from "../utils/user"


export class PlayerCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            canDelete: false
        };
    }

    componentDidMount(){
        this.checkUser()
    }

    componentWillUpdate() {
        this.checkUser()
    }

    checkUser = async () =>{
        const currUser = await fetchUser()

        if(currUser){
            if(currUser.sub == this.props.player.creatorId && this.state.canDelete == false){
                this.setState({canDelete: true})
            }else if(currUser.sub != this.props.player.creatorId && this.state.canDelete == true){
                this.setState({canDelete:false})
            }
        }

    }

    render() {
        return (
            <div className = "player-card" onClick = {this.props.onClick}>
                <div className = "pc-content ">
                    <img src = {this.props.player.img ? this.props.player.img : "/default-prof-pic.png"} className = "prof-pic"></img>
                    <h2 className = "pc-name">{this.props.player.name}</h2>
                    <h3 className = "pc-division">{this.props.player.division}</h3>
                    <p className = "pc-desc">{this.props.player.selfDesc}</p>
                </div>
                <div className = "button-section">
                    {this.state.canDelete ? (
                        <button className = "pc-button" onClick = {() => this.props.deletePlayer(this.props.player)}>
                            DELETE
                        </button>

                    ):(
                        <h3 style = {{margin:'auto', width: '100%',backgroundColor: "#e5e5e5", padding:"7px", borderRadius:'5px'}}>
                            Contact: 
                            <p style = {{margin:"0px", fontSize:"11px"}}>
                                {this.props.player.contact}
                            </p>
                        </h3>
                    )                    
                    }


                </div>
            </div>
        )
    }
}

export default PlayerCard
