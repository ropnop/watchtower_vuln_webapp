import React, { useEffect, useState } from "react";
import axios from 'axios';

function Batcave() {
    const [isBatman, setIsBatman] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const authorizeUser = async () => {
        const result = await axios("/api/batcave/authorize");
        setIsBatman(result.data.isBatman)
        setIsLoaded(true)
    }

    if (!isLoaded) {
        return (
            <div>
            <button type="button" className="btn btn-dark" onClick={authorizeUser}>Enter Batcave</button>
            </div>
        )
    } else if (!isBatman) {
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