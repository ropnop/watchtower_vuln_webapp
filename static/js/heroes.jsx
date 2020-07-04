'use strict';

const e = React.createElement;

class HeroTable extends React.Component {
    constructor(props) {
        super(props)
        this.allHeroes = []
        this.state = {
            searchTerm: "",
            heroes: []
        }
    }

    async componentDidMount() {
        try {
            const heroes = await this.fetchHeroes()
            this.allHeroes = heroes;
            if (window.location.hash) {
                let term = window.location.hash.split('#')[1]
                this.filterResults(decodeURI(term))
            } else {
                this.setState({ heroes: heroes })
            }

        } catch (error) {
            console.log(error);
        }
    }

    async fetchHeroes() {
        const response = await fetch('/api/heroes')
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const heroes = await response.json();
        return heroes
    }

    renderTableData() {
        return this.state.heroes.map((hero, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{hero}</td>
                    <td><a href="#">foobar</a></td>
                </tr>
            )
        })
    }

    createWikiLink() {
        return { __html: 
            `<h5>No results!</h5><a href="https://en.wikipedia.org/wiki/${this.state.searchTerm}">Try searching on Wikipedia?</a><br/>` }
    }

    handleChange = (event) => {
        this.filterResults(event.target.value)
    }

    filterResults = (searchTerm) => {
        window.location.hash = `${searchTerm}`
        this.setState({ searchTerm: searchTerm })
        const filteredResults = this.allHeroes.filter(hero =>
            hero.toLowerCase().includes(searchTerm.toLowerCase()))
        this.setState({ heroes: filteredResults })
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="inputHeroName"><h5>Hero Name</h5></label>
                    <input type="text" className="form-control" id="inputHeroName" name="search"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                </div>
                <br />
                {this.state.searchTerm && this.state.heroes.length == 0 &&
                    <div dangerouslySetInnerHTML={this.createWikiLink()} />
                }
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Hero Name</th>
                            <th scope="col">More Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const domContainer = document.querySelector('#heroes_container');
ReactDOM.render(e(HeroTable), domContainer);