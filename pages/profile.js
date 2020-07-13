import React from 'react'



export default function profile() {
    return (
        <>
            <h1 className = "profile-header">Benjamin Bunze</h1>
            <button className = "profile-edit-button">Edit</button>
            <div className = "profile-content">
                <sidebar>
                    <img className = "prof-pic-large" src = "/benpic.jpeg"></img>
                </sidebar>
                <content>

                </content>
            </div>
        </>

    )
}


