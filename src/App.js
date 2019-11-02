import React from 'react';
import PokiList from './containers/PokiList/PokiList';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <PokiList />
    </div>
  );
}

export default App;
