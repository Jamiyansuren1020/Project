import React, { useContext, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiSearchAlt, BiLibrary } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { BsBookmarkHeart } from "react-icons/bs";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../get-token";
import { Row, Col } from "antd";
import SearchSection from "./spotify-search";
import axios from "axios";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const accessT = localStorage.getItem("accessToken");
const { Search } = Input;

export default function Header() {
  const [playlist, setPlaylist] = useState([]);
  const [createPlayList, setCreatePlayList] = useState(0);
  const { artistId } = useParams();
  const [artists, setArtists]=useState([])
  const navigate = useNavigate();

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
          setArtists(res.data.artists.items);
          // setSuggestedTrack(res.data.artists.items);
        }
      });
  };
  
  return (
    <div className="main-container-spotify">
      {/* <Row gutter={[10, 10]}>
        <Col xs={2} md={2} lg={2} xl={1} xxl={1}> */}
      <div className="menu-section">
        {/* <span className="search-input">
          <SearchSection />
        </span> */}
        <div
          className="home"
          onClick={() => {
            navigate("/");
          }}
        >
          <AiFillHome />
          Home
        </div>
        <div
          className="search"
          onClick={() => {
            navigate("/search");
          }}
        >
          <BiSearchAlt />
          Search
        </div>
        <div className="library">
          <BiLibrary />
          Your Library
        </div>
        <div
          className="playlist"
          onClick={() =>
            setCreatePlayList((currState) => {
              return currState + 1;
            })
          }
        >
          <MdOutlineLibraryAdd />
          Create Playlist
        </div>
        <div className="liked-songs" onClick={() => navigate("/likedsong")}>
          <BsBookmarkHeart />
          Liked Songs
        </div>
        <button style={{ marginTop: "10px" }} onClick={() => getToken()}>
          Get Token
        </button>
        <br />
        {[...Array(createPlayList)].map((el, idx) => {
          return (
            <div className="created-playlist-container">
              <div className="created-playlist">Playlist #{idx + 1}</div>
            </div>
          );
        })}
        </div>
       
      
      
      {/* <div>
        <Row gutter={[10, 10]}>
         
        {artists.map((art) => {
          return(
            <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <div className="art-info-container">
              <div className="art-image-container">
              <img onClick={() => {
                navigate(`/${art.id}`)
              }}
              className="art-image" style={{cursor:'pointer'}}
               src={art.images?.length > 0
              ? art.images[1].url
              : "https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"}
              />
              </div>
              <div>
                {art.name}
              </div>
              <div>
                {art.genres}
              </div>
            </div>
            </Col>
          )
        })}
          
        </Row>
      </div> */}
      {/* </Col>
      </Row> */}
     
      {/* return (
      <div className="search-second-container">
      <Space direction="vertical" className="search-input">
       
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
      </Space>
      <div>
        <Row gutter={[10, 10]}> */}
         
        {/* {artists.map((art) => {
          return(
            <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
            <div className="art-info-container">
              <div className="art-image-container">
              <img onClick={() => {
                navigate(`/${art.id}`)
              }}
              className="art-image" style={{cursor:'pointer'}}
               src={art.images?.length > 0
              ? art.images[1].url
              : "https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png"}
              />
              </div>
              <div>
                {art.name}
              </div>
              <div>
                {art.genres}
              </div>
            </div>
            </Col>
          )
        })} */}
          
        {/* </Row>
      </div>
    </div>
    </div>
    
    ); */}

      <Outlet style={{ width: "500" }} />
      {/* <div><SearchSection onSearch={(value) => onArtistSearch(value)} /></div> */}
    </div>
    
  );
}
