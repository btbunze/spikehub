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
                                <p className = "login-button-text">Logout → </p>
                            </a>    
                        </>
                        ):(
                            <>
                                <span className = "login-text">Please login or sign up</span>
                                <a href = "/api/login" className = "login-button">
                                    <p className = "login-button-text">Login → </p>
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
