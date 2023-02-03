import logo from "./logo.svg";
import "./App.css";
import SpotifyProject from "./my-project/spotify-main";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SpotifyLayOut from "./my-project/spotify-layout";
import SearchSection from "./my-project/spotify-search";
import SpotifyThird from "./my-project/suggestion";
import Header from "./my-project/header";
import ArtistInfo from "./my-project/artist-detail";
import SpotifyLiked from "./my-project/liked-songs";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<SpotifyProject />} />
          <Route path="/" element={<SpotifyThird />} />
          {/* <Route path="search" element={<SearchSection />} /> */}
          <Route path=":artistId" element={<ArtistInfo />} />
          <Route path="/likedsong" element={<SpotifyLiked/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
