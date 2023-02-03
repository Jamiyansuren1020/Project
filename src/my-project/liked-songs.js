import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MainContext } from "./spotify-main";
import SpotifyThird from "./suggestion";

export default function SpotifyLiked(props) {
    const [likedSection, setLikedSection] = useState()
    // navigate = useNavigate
    // const {myLikedSong, setMyLikedSong} = useContext(MainContext)
    const [parsedItem, setParsedItem] = useState([])
    useEffect(() => {
        const parsed = JSON.parse(localStorage.getItem('likedSong'))
        
    }, [])
    return(
        <div>
            {localStorage.map((liked) => {
                return(
                    <div>
                        <div>
                            {liked.name}
                        </div>
                        <div>
                            <img />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}