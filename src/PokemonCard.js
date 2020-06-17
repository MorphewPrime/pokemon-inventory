import React from 'react';
import Move from './Move'
import './App.css';

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      colors:[]
    };
  }

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors] }))


  render() {
    const { attributes, fastMove, chargedMove } = this.props;
    // const shiny = attributes.shiny === 'YES' ? '-shiny' : '';
    // const shiny = attributes.shiny === 'YES' ? '_shiny' : '';
    // const shiny = attributes.shiny === 'YES' ? '_shiny' : '';

    const shiny = attributes.shiny === 'YES' ? 'shiny' : '';


    let formNumber = '';
    let pokeIndex = '';

    switch(true) {
        case attributes.pokedex <= 9:
          pokeIndex = `00${attributes.pokedex}`
          break;
        case attributes.pokedex <= 99:
          pokeIndex = `0${attributes.pokedex}`
          break;
        default: 
          pokeIndex = attributes.pokedex
    }
    
    switch(attributes.form){
        case 'ALOLA':
          formNumber = "61"
          break;
        case 'A':
          formNumber = "10"
          break;
        case 'PLANT':
          formNumber = '11'
          break;
        case 'SANDY':
          formNumber = '12'
          break;
        case 'TRASH':
          formNumber = '13'
          break;
        case 'SUNNY':
          formNumber = '11'
          break;
        default:
          formNumber = "00"
    }

    // var sourceImage = document.createElement("img")
    // sourceImage.src = 'https://pokemon.gameinfo.io/images/pokemon-go/043-00.png'

    // const {data, loading, error } = usePalette('https://pokemon.gameinfo.io/images/pokemon-go/043-00.png');
    return (
      <div className="pokemon-card">
          {/* <ColorExtractor getColors={this.getColors}>
            <img
                src={'https://pokemon.gameinfo.io/images/pokemon-go/043-00.png'}
                crossOrigin="anonymous"
                style={{ width: 700, height: 500 }}
            />
            
          </ColorExtractor> */}
          <div className="image-group">
              <div className="image-frame">
                  {/* { attributes.lucky === 'YES' && <img className="image" src="./src/lucky.png" width/>} */}
                  {/* {console.log(this.props.typeObject.type[0])} */}
                  <div >
                    <img className="poke-image"
                    // src={`https://images.gameinfo.io/pokemon/256/${pokeIndex}-${formNumber}${shiny}.png`}
                    // src={`https://github.com/ZeChrales/PogoAssets/blob/master/pokemon_icons/pokemon_icon_${pokeIndex}_${formNumber}${shiny}.png?raw=true.png`}
                    // src={`url(${ require(`./Images/pokemon_icons/pokemon_icon_${pokeIndex}_${formNumber}${shiny}.png`)})`}
                    src={`https://serebii.net/pokemongo/pokemon/${shiny}/${pokeIndex}.png`}


                    style={{backgroundImage: `${attributes.shiny === 'YES' ? `url(${require('./shiny-bg.png')}),` : '' }` +
                                             `${attributes.lucky === 'YES' ? `url(${require('./lucky.png')}),` : '' }` +
                                             `url(${ require(`./Images/${this.props.typeObject.type[0]}.png`)})`   
                          
                          }}
                    />
                  </div>
                  {/* <img id="test"src={require('./shiny.png')} /> */}
                  { attributes.shiny === 'YES' && <i className="shiny-icon" /> }
              </div>
              <div><i className="candy-icon" /><div style={{paddingLeft: "18px"}}>{ attributes.candy }</div></div>
          </div>
          <div className="info-group">
            <div className="name">{attributes.name}{(attributes.form === '(null)' || attributes.form === " ") ? '': ` (${attributes.form})`}</div>
            {/* <div className="name">{attributes.name}</div> */}
            <div className="cp"><font size="2" style={{ color: 'grey' }}>CP</font>{attributes.cp} <font size="2" style={{ color: 'grey' }}>LVL</font>{attributes.level}</div>
            {/* <div className="lvl"><font size="2" style={{ color: 'grey' }}>lvl</font>{attributes.lvl}</div> */}
            <table className="stat-table" cellSpacing="1" cellPadding="1">
              <tr>
                <th>Atk.</th>
                <th>Def.</th>
                <th>Sta.</th>
                <th>IV</th>
              </tr>
              <tr>
                <td style={attributes.atk === '15' ? {color: 'green', fontWeight: "500"}: {}}>{attributes.atk}</td>
                <td style={attributes.def === '15' ? {color: 'green', fontWeight: "500"}: {}}>{attributes.def}</td>
                <td style={attributes.sta === '15' ? {color: 'green', fontWeight: "500"}: {}}>{attributes.sta}</td>
                <td style={attributes.iv === "100.0" ? {color: 'darkorange', fontWeight: "500"}: {}}>{attributes.iv}</td>
              </tr>
            </table>
          </div>
          <div className="moves-group">
            <Move name={attributes.move1} move={fastMove} botMar/>
            <Move name={attributes.move2} move={chargedMove} />

            {/* <a href={`//https://pokemon.gameinfo.io/en/pokemon/movesets?id=${pokeIndex}&form=${formNumber}`} >all ratings</a> */}
          </div>
          <a href={`https://pokemon.gameinfo.io/en/pokemon/${pokeIndex}`} target="_blank" ><i className="external-link" /></a>
          <div className="gen">{attributes.gen.split(' ')[1]}</div>

          
      </div>
    )
  }
}

export default PokemonCard;