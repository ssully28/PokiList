import React from 'react';
import classes from './SearchBox.module.css';

const SearchBox = (props) => {
  return (
    <div className={classes.SearchBoxContainer}>
      <input type='text' className={classes.SearchBox} placeholder={props.placeholder} value={props.searchTerm} onChange={props.changed} />
    </div>
  );
};

export default SearchBox;
