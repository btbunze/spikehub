import React, { Component } from 'react'
import {fetchUser, useUser} from '../utils/user'

export class header extends Component {

    constructor(props) {
        super(props);
    }




    render() {


        return (
            <div className = "header">
                <div className = "login-status">
                   
                    {this.props.userObj.user ? 
                        (
                        <>
                            <span className = "login-text">Logged in as <strong>{this.props.userObj.user.nickname}</strong></span>                
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
                        </>
                        ):(
                            <>
                                <span className = "login-text">Please login or sign up</span>
                                <a href = "/api/login" className = "login-button">
                                    <p className = "login-button-text">Login 
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" class = "arrow-svg">
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
                <h1 className = "title">SPIKE HUB</h1>
                <h2 className = "subtitle">Be Your New Favorite Mashup</h2>
            </div>
        )
        
    }
}

export default header
