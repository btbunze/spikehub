import React, { Component } from 'react'
import {fetchUser, useUser} from '../utils/user'

export class header extends Component {

    constructor(props) {
        super(props);
    }




    render() {


        return (
            <div className = "header">
                {//this.props.userObj.user ? 
                    (                
                    <a href = "/api/logout" className = "login-button">
                        <p className = "login-button-text">Logout → </p>
                    </a>
                    )//:(
                    //<a href = "/api/login" className = "login-button">
                   //     <p className = "login-button-text">Login → </p>
                    //</a>  
                    //)
                }

                <div className = "color-overlay">
                </div>
                <h1 className = "title">SPIKE HUB</h1>
                <h2 className = "subtitle">Be Your New Favorite Mashup</h2>
            </div>
        )
        
    }
}

export default header
