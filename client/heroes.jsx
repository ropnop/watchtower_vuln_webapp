import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

function getHashValue() {
    if (window.location.hash) {
        const term = window.location.hash.split('#')[1]
        return decodeURI(term)
    } else {
        return ""
    }
}

function Heroes() {
    const allHeroes = useRef([]);
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(getHashValue());

    useEffect(() => {
        const fetchHeroes = async () => {
            const results = await axios('/api/heroes');
            allHeroes.current = results.data;
            filterResults(searchTerm);
        };
        fetchHeroes();
    }, [])

    useEffect(() => {
        window.location.hash = searchTerm
    });

    const filterResults = (term) => {
        const filteredResults = allHeroes.current.filter(hero =>
            hero.toLowerCase().includes(term.toLowerCase())
        );
        setResults(filteredResults)
    }

    const handleChange = e => {
        setSearchTerm(e.target.value)
        filterResults(searchTerm)
    }
 

    return (
        <div>
            <div className="form-group">
                <label htmlFor="inputHeroName"><h5>Hero Name</h5></label>
                <input type="text" className="form-control" id="inputHeroName" name="search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <br />
            {results.length == 0 &&
                <HelpResults searchTerm={searchTerm} />
            }
            <HeroTable results={results} />
        </div>
    )
}


function HeroTable({ results }) {
    return (
        <div className="heroTable">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Hero Name</th>
                        <th scope="col">More Information</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((hero, index) => <HeroRow hero={hero} index={index} key={hero} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

function HeroRow({ hero, index }) {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{hero}</td>
            <td><a href={`https://en.wikipedia.org/wiki/${hero}`}>More Info</a></td>
        </tr>
    )
}

function HelpResults({ searchTerm }) {
    return (
        <div>
            <h5>No results for {searchTerm}</h5>
            <div dangerouslySetInnerHTML={{__html: `<a href="https://en.wikipedia.org/wiki/${searchTerm}">Try Wikipedia?<a>`}} />
            <br />
        </div>
    )
}




ReactDOM.render(<Heroes />, document.getElementById("Heroes"))