import React, { Component } from 'react'
import {fetchUser} from "../utils/user"



export class PlayerCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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

    toProfile = async () => {
        const user = await fetchUser();
        if (user == null){
            this.props.toggleLoginOverlay("see players' profiles.")
        }
        else{
            window.location.href = `/profile?user=${this.props.player.creatorId}` 
        }
    }

    render() {

        // if(this.props.player == null || Object.keys(this.props.player).length == 0){
        //     return <></>
        // }else{
        //     console.log(this.props.player)
        // }

        return (
            <div className = "player-card" onClick = {this.props.onClick}>
                <div className = "pc-content ">
                    <img src = {this.props.player.img ? this.processImg() : "/default-prof-pic.png"} className = "prof-pic"></img>
                    <h2 className = "pc-name">{this.props.player.name ? this.props.player.name : "NAME"}</h2>
                    <h3 className = "pc-division">{this.props.player.division ? this.props.player.division : "Division"}</h3>
                    <p className = "pc-desc">
                        {this.props.player.selfDesc ? 
                            <>
                                {this.props.player.selfDesc.length >=75 ? (<> {this.props.player.selfDesc.substring(0,61)}...{!this.props.player.linkToProfile ? <button style = {{position:"relative", zIndex: "2"}} onClick = {this.toggleMore}>Read More</button>:null}</>) : (this.props.player.selfDesc.substring(0,75))} 
                            </>:
                            "No bio"
                        }
                        {this.props.player.linkToProfile ? <><br/><button style = {{position:"relative", zIndex: "2"}} onClick = {this.toProfile}>See More</button> </>: null}
                    </p>
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
                                {this.props.player.contact ? this.props.player.contact : "[Contact Info]"}
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
