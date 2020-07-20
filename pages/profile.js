import React from 'react'
import PlayerCard from "../components/PlayerCard"



export default function profile() {



    return (
        <>
            <div className = "profile-content">
                <div className = "card-container">
                    <PlayerCard player = {{img: "https://res.cloudinary.com/dicfhqxoo/image/upload/v1594401736/profile-pics/benpic_ity2uo.jpg", selfDesc: 'yee'}}deletePlayer = {null}/>   
                    <div className = "ydp-container">
                        <h3 className ="ydp-text">Your Default Player</h3>
                    </div>

                </div>
                <h1 className = "profile-header">Benjamin Bunze</h1>
                <button className = "profile-edit-button">Edit</button>
                <div className = "profile-info">
                    <h2 className = "profile-section-header">General Info</h2>
                    <div className = "gen-info-grid">
                        <div className = "gen-info-tile">
                            <h3 className = "tile-title">Name</h3>
                            <p className = "tile-content">Ben Bunze</p>
                        </div>
                        <div className = "gen-info-tile">
                            <h3 className = "tile-title">RPR</h3>
                            <p className = "tile-content">5.0</p>
                        </div>
                        <div className = "gen-info-tile">
                            <h3 className = "tile-title">Hometown</h3>
                            <p className = "tile-content">Fuquay-Varina</p>
                        </div>
                        <div className = "gen-info-tile" style = {{gridColumn: "span 3"}}>
                            <h3 className = "tile-title">Bio</h3>
                            <p className = "tile-content">Hey, I'm Ben, and I'm from Fuquay. I've been playing Spikeball for about 6 years now, and I've been premier since its inception. My partner (Connor Harte) and I are splitting up for the season, so I'm looking to mash up a lot!</p>
                        </div>
                    </div>
                </div>
                <div className = "profile-info">
                    <h2 className = "profile-section-header">Past Tournaments</h2>
                    <table>
                        <tr>
                            <th>Tournament</th>
                            <th>Partner</th>
                            <th>Placement</th>
                        </tr>
                        <tr>
                            <td>RVA Goes Coastal</td>
                            <td>Tommy Drake</td>
                            <td>3rd</td>
                        </tr>
                        <tr>
                            <td>RVA Goes Coastal</td>
                            <td>Tommy Drake</td>
                            <td>3rd</td>
                        </tr>
                        <tr>
                            <td>RVA Goes Coastal</td>
                            <td>Tommy Drake</td>
                            <td>3rd</td>
                        </tr>
                    </table>
                </div>
                <div className = "profile-info">
                    <h2 className = "profile-section-header">Previous Teams</h2>
                    <table>
                        <tr>
                            <th>Team Name</th>
                            <th>Partner</th>
                            <th>Duration</th>
                            <th>Notes</th>
                        </tr>
                        <tr>
                            <td>Sonic Boom</td>
                            <td>Connor Harte</td>
                            <td>2018-2019</td>
                            <td>PR #15 at peak</td>
                        </tr>
                        <tr>
                            <td>Unicorn Rampage</td>
                            <td>David Thole</td>
                            <td>2015-2017</td>
                        </tr>

                    </table>
                </div>
            </div>



        </>

    )
}


