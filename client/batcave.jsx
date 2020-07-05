import React, { useEffect, useState } from "react";
import axios from 'axios';

function Batcave() {
    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchCurrentUser = async () => {
        const result = await axios("/api/me");
        setUser(result.data)
        setIsLoaded(true)
    }

    const isBatman = () => {
        return user.username === "Batman" ? true : false
    }

    if (!isLoaded) {
        return (
            <div>
            <button type="button" className="btn btn-dark" onClick={fetchCurrentUser}>Enter Batcave</button>
            </div>
        )
    } else if (!isBatman()) {
        return (
            <div className="alert alert-danger">
            <i className="fa fa-times"></i> Nice try! You're not <b>Batman</b>!
            </div>
        )
    } else {
        return (
           <div className="jumbotron">
               <h1 className="display-4">Batcave</h1>
               <p className="lead">Welcome the the Batcave, Mr. Wayne</p>
               <hr className="my-4"/>
               <img src="https://media.giphy.com/media/xT1XGWH0TFPkKiCMiQ/giphy.gif"></img>
           </div>
        )
    }
}

export default Batcave