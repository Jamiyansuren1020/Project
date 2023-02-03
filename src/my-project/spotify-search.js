import React, { useContext, useEffect, useState ,} from "react";

import { MainContext } from "./spotify-main";
import ThirdComponent from "./suggestion";
import axios from "axios";
import { MdImageSearch } from "react-icons/md";
import {Row, Col} from "antd"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {fetchArtistTrack} from "./suggestion"

const accessT = localStorage.getItem("accessToken");


export default function SearchSection({ onSearch }) {
  // const {setArtistInfo} = useContext(SecondContext)
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
  // useEffect(() => {
  //   onArtistSearch()
  // },[])
 
  return (
    <div className="search-second-container">
      {/* <Space direction="vertical" className="search-input">
       
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
      </Space> */}
      <div>
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
      </div>
    </div>
    
  );
}
