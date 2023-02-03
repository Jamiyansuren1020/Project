import { Outlet, useNavigate } from "react-router-dom";
import "../App.js"
import Header from "./header.js";
import SearchSection from "./spotify-search.js";

const SpotifyLayOut = () => {
    const navigate = useNavigate();
    return(
        <div style={{display:'flex'}}>
            <Header/>
            {/* <SearchSection/> */}
            {/* <Outlet/> */}
        </div>
    )
}

export default SpotifyLayOut;