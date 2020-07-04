import React from 'react';
import ReactDOM from "react-dom";
import Heroes from "./heroes";

if ( document.getElementById("Heroes") ) {
    ReactDOM.render(<Heroes />, document.getElementById("Heroes"))
}