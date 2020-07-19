import React, { Component } from 'react'
import {fetchUser} from "../utils/user"
import { HighlightSpanKind } from 'typescript';


export class PlayerCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            canDelete: false,
            seeMore:false
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

    processImg = () =>{

        let processedImg = this.props.player.img

        const splitImgLink = processedImg.split("upload/");
        if (splitImgLink[0].includes("cloudinary")){
           processedImg = splitImgLink[0] + "upload/w_1000,ar_1:1,c_fill,g_auto/" + splitImgLink[1]
        }
        return processedImg;
    }

    toggleMore = () => {
        this.setState({seeMore: !this.state.seeMore})
    }

    render() {
        return (
            <div className = "player-card" onClick = {this.props.onClick}>
                <div className = "pc-content ">
                    <img src = {this.props.player.img ? this.processImg() : "/default-prof-pic.png"} className = "prof-pic"></img>
                    <h2 className = "pc-name">{this.props.player.name}</h2>
                    <h3 className = "pc-division">{this.props.player.division}</h3>
                    <p className = "pc-desc">{}{this.props.player.selfDesc.length >=75 ? (<> {this.props.player.selfDesc.substring(0,64)}... <button style = {{position:"relative", zIndex: "2"}}onClick = {this.toggleMore}>See More</button></>): (this.props.player.selfDesc.substring(0,75))}</p>
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
                {this.state.seeMore ? 
                    <div style = {{position:"absolute", top: "0px", left: "0px", width: "calc(100% - 20px)", height: "calc(100% - 20px)", padding:"10px", backgroundColor:"white", borderRadius: "10px", zIndex:"3"}}>
                        <h2 style = {{marginTop:"0px", marginBottom:"2px"}}>About</h2>
                        <p style = {{marginTop:"5px", marginBottom:"8px"}}>{this.props.player.selfDesc}</p>
                        <button style = {{margin:"auto"}} onClick = {this.toggleMore}>Close</button>
                    </div> 
                    : null
                }
            </div>
        )
    }
}

export default PlayerCard
