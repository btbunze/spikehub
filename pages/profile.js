import React, {useState} from 'react'
import PlayerCard from "../components/PlayerCard"



export default function profile() {

    const [player, setPlayer] = useState({name: "Ben Bunze", rpr: "5.0", location: "Fuquay-Varina", selfDesc: "Hey, I'm Ben, and I'm from Fuquay. I've been playing Spikeball for about 6 years now, and I've been premier since it started. Looking to play a bunch of mashups this season, so hit me up if you want to run one!", contact: "919-586-4076", img: "https://res.cloudinary.com/dicfhqxoo/image/upload/v1594401736/profile-pics/benpic_ity2uo.jpg"})

    return (
        <>
            <div className = "profile-content">
                <div className = "card-container">
                    <PlayerCard player = {player} deletePlayer = {null}/>   
                    <div className = "ydp-container">
                        <h3 className ="ydp-text">Your Default Player</h3>
                    </div>

                </div>
                <h1 className = "profile-header">{player.name} - Profile</h1>
                <button className = "profile-edit-button">Edit</button>
                <div className = "profile-info">
                    <h2 className = "profile-section-header">General Info</h2>
                    <div className = "gen-info-grid">
                        <div className = "gen-info-tile">
                            <h3 className = "tile-title">Name</h3>
                            <p className = "tile-content">{player.name}</p>
                        </div>
                        <div className = "gen-info-tile">
                            <h3 className = "tile-title">RPR</h3>
                            <p className = "tile-content">{player.rpr}</p>
                        </div>
                        <div className = "gen-info-tile">
                            <h3 className = "tile-title">Hometown</h3>
                            <p className = "tile-content">{player.location}</p>
                        </div>
                        <div className = "gen-info-tile" style = {{gridColumn: "span 3"}}>
                            <h3 className = "tile-title">Bio</h3>
                            <p className = "tile-content">{player.selfDesc}</p>
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
                            <td>Placeholder</td>
                            <td>Placeholder</td>
                            <td>nth</td>
                        </tr>
                        <tr>
                            <td>Placeholder</td>
                            <td>Placeholder</td>
                            <td>nth</td>
                        </tr>
                    </table>
                    <button className = "add-entry">
                       ADD ENTRY
                    </button>
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
                    <button className = "add-entry">
                        ADD ENTRY
                    </button>
                </div>
            </div>



        </>

    )
}


