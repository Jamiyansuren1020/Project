import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MainContext } from "./spotify-main";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// export const SecondContext = useContext()
export default function ArtistInfo() {
  // const {
  //   sugg,
  //   suggIdx,
  //   suggLikeId,
  //   setLikeId,
  //   spotifyInfo,
  //   suggestedTrack,
  //   isLoading,
  //   setIsLoading,
  //   myLikedSong,
  //   setMyLikedSong,
  //   // setSpotifyInfo,
  //   // searchArtist,
  //   setSuggestedTrack,
  //   onArtistSearch,
    
  // } = useContext(MainContext);
  const [artistInfo, setArtistInfo] = useState({});
  const [artistTrack, setArtistTrack] = useState([]);
  const [trackId, setTrackId] = useState([])
  const { artistId } = useParams();
  const accessT = localStorage.getItem("accessToken"); // localstorage
  const fetchArtistInfo = useCallback(() => {
    axios
      .create({
        baseURL: "https://api.spotify.com",
        headers: {
          Authorization: `Bearer ${accessT}`,
        },
      })
      .get(`/v1/artists/${artistId}`)
      .then((res) => {
        if (res.status === 200) {
          setArtistInfo(res.data);
          console.log(res.data);
        }
      });
  }, [artistId, accessT]);
  const fetchArtistTrack = () => {
    axios
      .create({
        baseURL: "https://api.spotify.com",
        headers: {
          Authorization: `Bearer ${accessT}`,
        },
      })
      .get(`/v1/artists/${artistId}/top-tracks?country=MN`)
      .then((res) => {
        if (res.status === 200) {
          setArtistTrack(res.data.tracks);
          console.log(res.data);
        }
      });
  };
  const playArtistTrack = () => {
    axios
    .create({
        baseURL:"https://api.spotify.com",
        headers:{
            Authorization: `Bearer ${accessT}`,
        }
    })
    .get(`/v1/tracks/0V3wPSX9ygBnCm8psDIegu`)
    .then((res) => {
        if(res.status === 200) {
            // setTrackId(res.data)
        }
    })
  }
  useEffect(() => {
    fetchArtistInfo();
  }, [fetchArtistInfo]);
  console.log(fetchArtistInfo);
  useEffect(() => {
    fetchArtistTrack();
    // playArtistTrack()
  }, []);
  return (
    <div className="artist-track-container">
        <div className="artist-track">
        <img style={{height:'320px', borderRadius:"10px"}}
        src={
          artistInfo.images?.length > 0
            ? artistInfo.images[1].url
            : "https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"
        }
      />
      {artistInfo.genres?.map((info) => {
        return (
          <div style={{color:'white'}}>
            {info}
            {/* <img
                   src={artistInfo.images[1].url}/> */}
          </div>
        );
      })}
      </div>
      {artistTrack.map((track) => {
        
        return <div className="track-name" style={{display:'flex', justifyContent:'space-between'}}>
          <div className="track">
            {track.name}
            <AiOutlineHeart/>
            </div>
            <audio controls autoplay muted loop style={{height:'30px'}}src={track.preview_url}>
            
            </audio>
            </div>;
            
      })}
      {/* {sugg.isLiked ? (
                      <AiFillHeart key={suggIdx}
                        onClick={() => {
                          const removeFromLocalStorage = localStorage.removeItem('unlickedSong')
                          console.log('test')
                          setSuggestedTrack((curr, removeFromLocalStorage) => {
                            return curr.map((item) => {
                              return(
                                sugg.id === item.id ? {...item, isLiked: false, removeFromLocalStorage} : item
                              )
                            })
                          })
                          setMyLikedSong((curr) => {
                            return curr.filter(curr.id !== sugg.id)
                          })
                          // setLikeId((curr) => {
                          //   return curr.filter()
                          // })
                        }}
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => {
                          
                          // const addToLocalStorage_serialize = JSON.stringify(addToLocalStorage)
                          console.log('test')
                          // setSuggestedTrack((curr) => {
                          //   return curr.map((fav) => {
                          //     return(
                          //       sugg.id === fav.id ? {...fav, isLiked: true} : fav
                          //     )
                          //   })
                          // })
                          const myLikedSong_serialized = JSON.stringify(myLikedSong)
                          localStorage.setItem('likedSong', myLikedSong_serialized)
                          console.log(myLikedSong_serialized)
                          setSuggestedTrack((curr)=>{
                            return curr.map((fav)=>{
                              
                              return sugg.id === fav.id ? {...fav, isLiked: true,} : fav
                            })
                          })
                          setLikeId((curr) => {
                            return[
                              ...curr, sugg.id
                            ]
                          })
                          setMyLikedSong((curr) => {
                            return [...curr,sugg]
                          })
                          // setSuggestedTrack((currState) => {
                          //   return [
                          //     ...currState
                          //   ]
                          // })
                        }}
                      />
                    )} */}
      {trackId.map((song) => {
        return(
            <div>
                {song.id}
            </div>
            
        )
      })}
    </div>
  );
}
