import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import axios from "axios";
import React, {
  useState,
  useReducer,
  useEffect,
  createContext,
  useContext,
} from "react";
import SpotifyThird from "./suggestion";
import SkeletonCard from './card-skeleton';
import Header from "./header";
import "./spotify.css";
import { getToken } from "../get-token";
import SpotifyLiked from './liked-songs';
import SearchSection from './spotify-search';

export const MainContext = createContext();
const { Search } = Input;


export default function SpotifyProject() {
  const [spotifyInfo, setSpotifyInfo] = useState();
  const [searchArtist, setSearchArtist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [myLikedSong, setMyLikedSong] = useState([])
  const [suggestedTrack, setSuggestedTrack] = useState();
  const [show, setShow]=useState(true)

  const accessT = localStorage.getItem("accessToken");

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  

  // const fetchSpotifyApi = (artistId) => {
  //   axios
  //     .create({
  //       baseURL: "https://api.spotify.com",
  //       headers: {
  //         Authorization: `Bearer ${accessT}`,
  //       },
  //     })
  //     .get(`/v1/artists/${artistId}/top-tracks?country=MN`) // artist top tracks
  //     //   .get("/v1/artists/00icP3tGOMJVmDkwDtY2dX") // artist details
  //     //   .get("/v1/search?q=rokit%20bay&type=artist") // artist search
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setSpotifyInfo(
  //           res.data.id
  //           // .map((spot) => {
  //           //   return {
  //           //     name:spot.name,
  //           //     picture:spot.picture
  //           //   };
  //           // })
  //         );
  //         setTimeout(() => {
  //           setIsLoading(false);
  //         }, 2000);
  //       }
  //     });
  // };

  const onArtistSearch = (searchValue) => {
    console.log(searchValue, accessT);
    axios
      .create({
        baseURL: "https://api.spotify.com",
        headers: {
          Authorization: `Bearer ${accessT}`,
        },
      })
      .get(`/v1/search?q=${searchValue}&type=artist`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.artists.items);
          setSuggestedTrack(res.data.artists.items.map((item)=>{
            return {...item, isLiked: false}
          }));
          // setSearchArtist(res.data.track?.map((artist) => {
          //   return {
          //       name:artist.name,
          //       image:artist.album.images[1]
          //       // track:artist.track.image
          //   }
          // }));
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
        
      });
  };

  useEffect(() => {
    if (accessT) onArtistSearch("rokit bay");
    // setIsLoading(false)
  }, [accessT]);
  // useEffect(() => {
  //   setSuggestedTrack([])
  // },[])

  return (
    <MainContext.Provider
      value={{ spotifyInfo, onArtistSearch, suggestedTrack, setSuggestedTrack, myLikedSong, setMyLikedSong, isLoading }}
    >
      <div style={{ width: "70vw", backgroundColor: "gray", marginTop: "5px" }}>
      <Search
          style={{
            backgroundColor: "#81b71",
            display: "flex",
            justifyContent: "center",
            marginRight: "50px",
            fontWeight: "bolder",
          }}
          color="green"
          placeholder="What do you want to listen to?"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={onArtistSearch}
        />
        <div style={{ padding: 5 }}>
          {accessT ? (
            <span style={{ backgroundColor: "green", color: "white", borderRadius:"5px" }}>
              YES AT
            </span>
          ) : (
            <span style={{ backgroundColor: "red", color: "white" }}>
              NO AT
            </span>
          )}
          
        </div>
        {/* <button onClick={() => fetchSpotifyApi()}>Fetch artist api</button> */}
        {/* <div className="menu-suggest-container"> */}
        {/* <Header/> */}
        {/* <SuggestedTrack/> */}
        <SkeletonCard cards={8}/>
        <SpotifyThird />
        {/* <SearchSection /> */}
        {/* <SpotifyLiked/> */}
        {/* </div> */}
        {/* <div><SpotifyLiked/></div> */}
        {/* <pre>{JSON.stringify(searchArtist, null, 2)}</pre> */}
      </div>
    </MainContext.Provider>
  );
}
