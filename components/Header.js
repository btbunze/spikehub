import React, { Component } from 'react'
import {fetchUser, useUser} from '../utils/user'

export class header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        const currUser = await fetchUser();
        this.setState({user: currUser})

        if(currUser == null){
            return;
        }

        const response = await fetch('/api/user-metadata',{
            method: "PUT",
            body: JSON.stringify({
                userId: currUser.sub
            })
        })

        const meta = await response.json()
        this.setState({user: meta})
        //animation (doesn't work on iphone ???)

        /*const [topLine, botLine] = Array.from(document.querySelectorAll(".border-line"));

        let topY1 = parseFloat(topLine.getAttribute("y1"));
        let topY2 = parseFloat(topLine.getAttribute("y1"));

        let botY1 = parseFloat(botLine.getAttribute("y1"));
        let botY2 = parseFloat(botLine.getAttribute("y1"));

        var animate = setInterval(()=>{
            topY1 = topY1 + 1
            topLine.setAttribute("y1", String(topY1));
            topY2 = topY2 + 1
            topLine.setAttribute("y2", String(topY2));

            botY1 = botY1 - 1
            botLine.setAttribute("y1", String(botY1));
            botY2 = botY2 - 1
            botLine.setAttribute("y2", String(botY2));

            if(topY1 == 85.5 && botY1 == 1.5){
                clearInterval(animate)

                setTimeout(() => document.querySelector(".svg-subtitle").classList.add("full-opacity"), 100)
            }
        }
        ,10)
    
        document.querySelector(".svg-title").classList.add("title-animate-in")*/

    }


    render() {


        return (
            <div className = "header">
                <div className = "login-status">
                    <div style = {{padding: "10px 0px"}}><h1 className = "header-title"><a href = {process.env.baseUrl} style = {{textDecoration: "none", color:"white"}}>SPIKEHUB</a></h1></div>
                    {this.props.userObj.user ?
                        (
                        <>
                            <span className = "login-text">{this.state.user.name ? <>Logged in as <br></br><strong>{this.state.user.name}</strong></> : "Logged in"}</span>            
                            <a href = "/api/logout" className = "login-button">
                                <p className = "login-button-text">Logout 
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class = "arrow-svg">
                                    <g id="arrowMain">
                                        <line id="arrowLine" y1="5.5" x2="10" y2="5.5" stroke="white"/>
                                        <path id="arrow" d="M9.57799 5.5L5 0.746881L5.71936 0L10.806 5.28124L11 5.5L10.806 5.71876L5.71936 11L5 10.2531L9.57799 5.5Z" fill="white"/>
                                    </g>
                                </svg>
                                </p>
                            </a>    
                            <a href = {`/profile?user=${this.props.userObj.user.sub}`} className = "login-button">
                                <p className = "login-button-text">Profile 
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class = "arrow-svg">
                                    <g id="arrowMain">
                                        <line id="arrowLine" y1="5.5" x2="10" y2="5.5" stroke="white"/>
                                        <path id="arrow" d="M9.57799 5.5L5 0.746881L5.71936 0L10.806 5.28124L11 5.5L10.806 5.71876L5.71936 11L5 10.2531L9.57799 5.5Z" fill="white"/>
                                    </g>
                                </svg>
                                </p>
                            </a>
                        </>
                        ):(
                            <>
                                <span className = "login-text">Please login or sign up</span>
                                <a href = "/api/login" className = "login-button">
                                    <p className = "login-button-text">Login 
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" className = "arrow-svg">
                                        <g id="arrowMain">
                                            <line id="arrowLine" y1="5.5" x2="10" y2="5.5" stroke="white"/>
                                            <path id="arrow" d="M9.57799 5.5L5 0.746881L5.71936 0L10.806 5.28124L11 5.5L10.806 5.71876L5.71936 11L5 10.2531L9.57799 5.5Z" fill="white"/>
                                        </g>
                                    </svg>
                                    </p>
                                </a>  
                            </>
                        )
                    }

                </div>


                <div className = "color-overlay">
                </div>
                    
                <svg  viewBox="0 0 350 121" fill="none" className = "header-svg" xmlns="http://www.w3.org/2000/svg">
                    <rect width="349" height="121" fill="none"/>
                    <line className = "border-line" x1="3" y1="43.5" x2="346" y2="43.5" stroke="white" strokeWidth="3"/>
                    <line className = "border-line" x1="3" y1="43.5" x2="346" y2="43.5" stroke="white" strokeWidth="3"/>
                    <text className = "svg-subtitle" fill="white" style={{whiteSpace: "pre"}} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" fontSize="20" fontWeight="bold" letterSpacing="0em"><tspan x="39" y="115.336">Be Your New Favorite Mashup</tspan></text>
                    <text className = "svg-title" fill="white"  style= {{whiteSpace: "pre"}} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" fontSize="72" fontWeight="bold" letterSpacing="0em"><tspan x="3" y="69.6094">SPIKEHUB</tspan></text>
                </svg>

                <h1 className = "title">SPIKE HUB</h1>
                <h2 className = "subtitle">Be Your New Favorite Mashup</h2>
            </div>
        )
        
    }
}

export default header
