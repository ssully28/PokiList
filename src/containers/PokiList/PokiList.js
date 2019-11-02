import React, { Component } from 'react';
import axios from 'axios';
import SearchBox from '../../components/SearchBox/SearchBox';
import PokiCard from '../../components/PokiCard/PokiCard';
import classes from './PokiList.module.css';

const DOC_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

class PokiList extends Component {
  state = {
    pokis: [],
    searchByName: ''
  }

  // Load poki list on mount
  async componentDidMount() {
    const pokiList = [];

    let response = await axios.get(`${DOC_BASE_URL}`);
    let listOfPokis = response.data.results;

    for (let i = 0; i < listOfPokis.length; i++) {
      let pokiResponse = await axios.get(listOfPokis[i].url);

      pokiList.push({
        id: pokiResponse.data.id,
        name: pokiResponse.data.name,
        weight: pokiResponse.data.weight,
        height: pokiResponse.data.height,
        img: pokiResponse.data.sprites.front_default,
        expandedView: false
      });
    }

    this.setState({ pokis: pokiList });
  }

  searchByNameHandler = (event) => {
    this.setState({ searchByName: event.target.value });
  }

  expandCollapseHandler = (cardId) => {

    const pokiCopy = [...this.state.pokis];

    const updatedPokis = pokiCopy.map(card => {
      if (card.id === cardId) {
        card.expandedView = !card.expandedView;
        return card;
      } else {
        return card;
      }
    });

    this.setState(state => ({
      pokis: updatedPokis
    }));
  }

  render() {

    // Let's create a filtered list based on the searb by name:
    const filteredPokis = this.state.pokis.filter(poki => poki.name.includes(this.state.searchByName));

    // Then we'll list all pokis from that filtered list:
    const pokiList = filteredPokis.map(poki => {
      return (
        <PokiCard
          key={poki.id}
          id={poki.id}
          name={poki.name}
          weight={poki.weight}
          height={poki.height}
          img={poki.img}
          expandedView={poki.expandedView}
          expandCollapse={(event) => this.expandCollapseHandler(event)}
        />
      );
    });

    return (
      <div className={classes.PokiList}>
        <SearchBox
          placeholder='Search by name'
          searchTerm={this.state.searchByName}
          changed={(event) => this.searchByNameHandler(event)}
        />
        {pokiList}
      </div>
    );

  };
};

export default PokiList;