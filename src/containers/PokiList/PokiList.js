import React, { Component } from 'react';
import axios from 'axios';
import SearchBox from '../../components/SearchBox/SearchBox';
import PokiCard from '../../components/PokiCard/PokiCard';
import classes from './PokiList.module.css';

// Base URL to pull pokimon info from:
const DOC_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Meat and potatoes of the app. 
 */
class PokiList extends Component {
  state = {
    pokis: [],
    searchByName: '',
    searchByTags: ''
  }

  // Load poki list on mount
  async componentDidMount() {
    const pokiList = [];

    let response = await axios.get(`${DOC_BASE_URL}`);
    let listOfPokis = response.data.results;

    for (let i = 0; i < listOfPokis.length; i++) {
      let pokiResponse = await axios.get(listOfPokis[i].url);

      const abilities = pokiResponse.data.abilities.map(ability => {
        return (
          ability.ability.name
        )
      });

      pokiList.push({
        id: pokiResponse.data.id,
        name: pokiResponse.data.name,
        weight: pokiResponse.data.weight,
        height: pokiResponse.data.height,
        img: pokiResponse.data.sprites.front_default,
        tagInputText: '',
        tags: [],
        abilities: abilities,
        expandedView: false
      });
    }

    this.setState({ pokis: pokiList });
  }

  searchByNameHandler = (event) => {
    this.setState({ searchByName: event.target.value });
  }

  searchByTagsHandler = (event) => {
    this.setState({ searchByTags: event.target.value });
  }

  // Need to update the add tag input box of the right poki
  addTagHandler = (event, cardId) => {
    const pokiCopy = [...this.state.pokis];

    const updatedPokis = pokiCopy.map(card => {
      if (card.id === cardId) {
        card.tagInputText = event.target.value;
        return card;
      } else {
        return card;
      }
    });

    this.setState(state => ({
      pokis: updatedPokis
    }));
  }

  addTagOnEnter = (event, cardId) => {
    // We'll want to take the current tagInputText from this cardIDs
    // state and push it into this cardIds tags array!
    // Then clear the text field...
    // Then update the state!
    if (event.key === 'Enter') {
      const pokiCopy = [...this.state.pokis];

      const updatedPokis = pokiCopy.map(card => {
        if (card.id === cardId) {
          card.tags.push(card.tagInputText);
          card.tagInputText = '';
          return card;
        } else {
          return card;
        }
      });

      this.setState(state => ({
        pokis: updatedPokis
      }));
    }
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

    let pokiArray = [];

    // The instructions from the assessment weren't completely clear on this part...
    // I'm not sure if we want to filter BY name AND tag or name OR tag:
    
    // First:
    // Let's create a filtered list based on the search by name:
    
    if (this.state.searchByName !== '') {
      const filteredPokis = this.state.pokis.filter(poki => poki.name.includes(this.state.searchByName));
      pokiArray = [...filteredPokis];
    } else {
      pokiArray = this.state.pokis;
    }

    // Note to self regarding the ambiguity from the assessment:
    // If it's "AND", then we'll do the second filter against filteredPokis
    // If it's "OR", then we need to create a second filtered list and combine results

    // I'm going to *assume* they meant to filter by name AND tag so....
    // Now let's filter the pokiArray (created above) by tags:

    if (this.state.searchByTags !== '') {
      const filteredByTagPokis = pokiArray.filter(poki => poki.tags.join(' ').includes(this.state.searchByTags));
      pokiArray = [...filteredByTagPokis];
    }

    // Then we'll list all pokis from that filtered list:
    const pokiList = pokiArray.map(poki => {
      return (
        <PokiCard
          key={poki.id}
          id={poki.id}
          name={poki.name}
          weight={poki.weight}
          height={poki.height}
          img={poki.img}
          abilities={poki.abilities}
          addTagInputText={poki.tagInputText}
          addTagHandler={(event) => this.addTagHandler(event, poki.id)}
          addTagOnEnter={(event) => this.addTagOnEnter(event, poki.id)}
          tags={poki.tags}
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
        <SearchBox
          placeholder='Search by tags'
          searchTerm={this.state.searchByTags}
          changed={(event) => this.searchByTagsHandler(event)}
        />
        {pokiList}
      </div>
    );
  };
};

export default PokiList;