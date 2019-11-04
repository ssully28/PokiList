import React from 'react';
import classes from './Tag.module.css';

const Tag = (props) => {
  return (
    <div className={classes.Tag}>{props.text}</div>
  );
};

export default Tag;
