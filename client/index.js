import React from 'react';
import ReactDOM from "react-dom";
import Heroes from "./heroes";
import Batcave from "./batcave";

if ( document.getElementById("Heroes") ) {
    ReactDOM.render(<Heroes />, document.getElementById("Heroes"))
}

if ( document.getElementById("Batcave") ) {
    ReactDOM.render(<Batcave />, document.getElementById("Batcave"))
}