import React from 'react';
import './App.css';
import './Move.css';

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      move: {},
    };
  }

  render() {
    const { name, move, botMar } = this.props;

    return (
      <div className={`move-con ${move !== undefined ? move.type : 'Unknown'}`} style={botMar && {marginBottom: "5px"}}>
        <div className="move">{name}</div>
      </div>
    )
  }
}

export default PokemonCard;