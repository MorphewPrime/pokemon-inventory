import React from 'react';

import CsvParse from '@vtex/react-csv-parse'
import PokemonCard from './PokemonCard'
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captureType: 'text',
      data: [],
      origData: [],
      fastMoves: [],
      chargedMoves: [],
      shinyView: false,
    };
  }

  componentDidMount() {
    this.getPokemonTypes();
    this.getFastMoves();
    this.getChargedMoves();

    // listen to scroll for progress bar
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  getPokemonTypes = () => {
    fetch("https://pokemon-go1.p.rapidapi.com/pokemon_types.json", {
      "method": "GET",
      "headers": {
        "Referer": "https://pokemon-inventory.xxx.com/",
        "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
        "x-rapidapi-key": "d34e436671mshd56de8a04738958p10d3f4jsnc66a56df49fb"
      }
    })
    .then(response => response.json().then(data => {
      console.log(data)
      this.setState({ pokemonTypes: data })
    }))
    .catch(err => {
      console.log(err);
    });
  }

  getFastMoves = () => {
    fetch("https://pokemon-go1.p.rapidapi.com/fast_moves.json", {
      "method": "GET",
      "headers": {
        "Access-Control-Allow-Origin-host": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
        "x-rapidapi-key": "d34e436671mshd56de8a04738958p10d3f4jsnc66a56df49fb"
      }
    })
    .then(response => response.json().then(fastMoves => {
      this.setState({ fastMoves: fastMoves })
    }))
    .catch(err => {
      console.log(err);
    });
  }

  getChargedMoves = () => {
    fetch("https://pokemon-go1.p.rapidapi.com/charged_moves.json", {
      "method": "GET",
      "headers": {
        "Access-Control-Allow-Origin-host": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
        "x-rapidapi-key": "d34e436671mshd56de8a04738958p10d3f4jsnc66a56df49fb"
      }
    })
    .then(response => response.json().then(data => {
      this.setState({ chargedMoves: data })
    }))
    .catch(err => {
      console.log(err);
    });
  }

  handleScroll = (e) => {
    let h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';

    let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    let percentStr = percent.toFixed(2) + '%';

    this.refs.progressBar.style.width = percentStr;
  }

  handleData = (data) => {
    this.setState({ 
      data: data,
      origData: data
    });
  }

  toggleShinyView = (e) => {
    this.setState({ shinyView: !this.state.shinyView })
  }

  sortByKey(array, key) {
    console.log( array[0][key].match(/^[. 0-9]+$/) != null)
    if (array[0][key].match(/^[. 0-9]+$/) != null) { // string is only a number
      return array.sort((a,b) => b[key] - a[key] );
    }
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  handleFilter = (e) => {
    let attribute = e.target.value;
    if (attribute === undefined || attribute === '') return;
    let sortedData = this.sortByKey(this.state.data, attribute);
    // this.state.data.filter(poke => poke[attribute])
    this.setState({ data: sortedData });
  }

  handleSearch = (e) => {
    // if (!e.target.value || e.target.value === '') return;
    // let searchData = [];
    console.log(e)
    let searchData = this.state.origData.filter(poke => Object.values(poke).findIndex(val => val.toLowerCase().includes(e.target.value.toLowerCase())) > -1);
    if (!Array.isArray(searchData) || !searchData.length) searchData = this.state.origData;
    console.log(searchData);
    this.setState({
      data: searchData,
    });
  }

  captureTypeChange = (e) => {
    this.setState({
      captureType: e.target.value
    });
  }

  resetData = () => {
    this.setState({
      data: this.state.origData
    })
  }

  parseText = (e) => {
    let input = e.target.value;
    let data = [];

    input.split("\n").map((row, index) => {
      const columns = row.split(",");
      if(index !== 0 && columns.length === 19) { 
        data.push({
          "id": columns[0],
          "pokedex": columns[1],
          "name": columns[2],
          "level": columns[3],
          "iv": columns[4],
          "atk": columns[5],
          "def": columns[6],
          "sta": columns[7],
          "cp": columns[8],
          "weight": columns[9],
          "height": columns[10],
          "gender": columns[11],
          "move1": columns[12],
          "move2": columns[13],
          "shiny": columns[14],
          "lucky": columns[15],
          "form": columns[16],
          "gen": columns[17],
          "candy": columns[18],
        });
    } 
    });
    this.setState({ 
      data: data,
      origData: data
    });
  }

  flipData = (e) => {
    this.setState({data: this.state.data.reverse()});
  }

  saveOrigData = (e) => {
    localStorage.setItem("origData", JSON.stringify(this.state.origData));
  }

  loadSavedData = (e) => {
    let data = JSON.parse(localStorage.getItem('origData'));
    this.setState({
      data: data,
      origData: data
    });
  }
  
  render() {
    const keys = [
      "id",
      "pokedex",
      "name",
      "level",
      "iv",
      "atk",
      "def",
      "sta",
      "cp",
      "weight",
      "height",
      "gender",
      "move1",
      "move2",
      "shiny",
      "lucky",
      "form",
      "gen",
      "candy",
    ]
    return (
      <div style={{minHeight:"100%", position: "relative"}}>
        <div className="header">
          <h2 className="header-inner">Pokemon Inventory</h2> {/* Help button */}
          {/* <div className="help">?</div> */}
        </div>
        <div className="body">
          <div className="capture">
            <div className='capture-type'>Load Pokemon inventory with: </div>
            <label>
              <input type="radio" value="text" checked={this.state.captureType === 'text'} onChange={this.captureTypeChange } />
              Text
            </label>
            <label>
              <input type="radio" value="csv" checked={this.state.captureType === 'csv'} onChange={this.captureTypeChange} />
              CSV
            </label>
            <div className="capture-input">
              { this.state.captureType === 'csv' &&
                <CsvParse
                  keys={keys}
                  onDataUploaded={this.handleData}
                  onError={this.handleError}
                  render={onChange => <input type="file" onChange={onChange} />}
                />
              }
              { this.state.captureType === 'text' &&
                <textarea
                  rows="3"
                  style={{width: "100%", border: "1px solid #404040"}}
                  // value={this.state.capturedText}
                  onChange={this.parseText}
                  placeholder="Past exported data here."
                />
              }
            </div>
            <button onClick={this.saveOrigData}>SAVE</button> <button onClick={this.loadSavedData}>LOAD</button>
            <div>Loaded {this.state.data.length} pokemon</div>
            <hr style={{marginBottom: 0}}/>
          </div>
          {/* add loading status       */}
          
          <div className="filter"> {/* Add reset button? keep original copy? */}
            <div className="filter-row">
              <label>
                Search: <input type="select" name="search" onChange={this.handleSearch} placeholder="Name, IV, CP, Moves, Ect." />
              </label>
              <label>
                Filter by: 
                <select name="attributes" disabled={this.state.data && this.state.data.length <= 0} onChange={this.handleFilter}>
                  <option />
                  <option value="cp">CP</option>
                  <option value="level">Level</option>
                  <option value="iv">IV</option>
                  <option value="pokedex">Pokedex</option>
                  <option value="name">Name</option>
                  <option value="gen">Generation</option>
                  <option value="candy">Candy</option>
                  <option value="atk">Attack</option>
                  <option value="def">Defence</option>
                  <option value="sta">Stamina</option>
                </select>
              </label>
              <button onClick={this.flipData}>Flip Order</button>
              <label>
                Shinys Only 
                <input type="checkbox" name="shiny" disabled={this.state.data && this.state.data.length <= 0} onChange={this.toggleShinyView} />
              </label>
            </div>
            {/* <button onClick={this.resetData}>RESET</button> */}

            <div className="progress-bar-con">
              <div ref="progressBar"></div>
            </div>
            {/* <hr /> */}
          </div>
          {this.state.data[0] && console.log(this.state.chargedMoves.find(move => move.name === this.state.data[0].move2))}
          {console.log()}

          {!this.state.shinyView && this.state.pokemonTypes && this.state.data.map(poke => (
              <PokemonCard
                key={poke.id}
                attributes={poke}
                typeObject={this.state.pokemonTypes.find(type => type.pokemon_id === Number(poke.pokedex))}
                fastMove={this.state.fastMoves.find(move => move.name === poke.move1.replace('-', ' '))}
                chargedMove={this.state.chargedMoves.find(move =>  move.name === poke.move2.replace('-', ' ')) }
              />
          ))}
          {this.state.shinyView && this.state.data.filter(pokemon => pokemon.shiny === 'YES').map(poke => (
              <PokemonCard
                key={poke.id}
                attributes={poke}
                typeObject={this.state.pokemonTypes.find(types =>  types.pokemon_id === Number(poke.pokedex))}
                fastMove={this.state.fastMoves[0]/*.find(move => move.name.includes(poke.move1)) */}
                chargedMove={this.state.chargedMoves.find(move => move.name.includes(poke.move2))}
              />
          ))}
            {/* {this.state.data.length > 0 && <PokemonCard attributes={this.state.data[1]}></PokemonCard>} */}
        </div>

        {/* <div className="footer"><p>HI</p></div> */}
      </div>
    )
  }
}

export default App;
