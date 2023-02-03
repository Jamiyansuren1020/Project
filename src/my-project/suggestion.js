import React, { useContext, useEffect, useReducer, useState } from "react";
import { MainContext } from "./spotify-main";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import SpotifyLiked from "./liked-songs"
import Skeleton from "react-loading-skeleton";


export default function SpotifyThird() {
  const [likeId, setLikeId] = useState([])
  const navigate = useNavigate();
  // const favoriteSong = () => {
  //     setLikedSong(true)
  // }
  const {
    spotifyInfo,
    suggestedTrack,
    isLoading,
    setIsLoading,
    myLikedSong,
    setMyLikedSong,
    // setSpotifyInfo,
    // searchArtist,
    setSuggestedTrack,
    onArtistSearch,
    setArtistTrack,
  } = useContext(MainContext);
  console.log(spotifyInfo);
  console.log(suggestedTrack)

  useEffect(() => {
    localStorage.setItem('likedSong', JSON.stringify(myLikedSong))
  }, [myLikedSong])

  return (
    <div className="suggest-container">
      <h1 style={{ color: "white" }} >Artists</h1>
      <div>
      {isLoading ? <Skeleton className= "skeleton" count={10} width='50px'/> : 
        <Row gutter={[10, 10]}>
          {suggestedTrack?.map((sugg, suggIdx) => {
            return (
              <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
                <div className="spotify-suggestion">
                  <img
                    onClick={() => {
                      navigate(`${sugg.id}`);
                    }}
                    className="spotify-image"
                    src={
                      sugg?.images[1]?.url
                        ? sugg?.images[1]?.url
                        : "https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"
                        
                    }
                    alt="picture" 
                  />
                  <div className="name-heart" >
                    {sugg.isLiked ? (
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
                    )}
                    <SpotifyLiked myLikedSong={myLikedSong}/>
                    {/* {likedSong ? <AiFillHeart style={{color: 'white'}}/> : ''} */}
                    <h3>{sugg.name || <Skeleton/>}</h3>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
}
      </div>
    </div>
  );
}
