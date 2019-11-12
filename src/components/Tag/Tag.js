import React from 'react';
import classes from './Tag.module.css';

// Simple "pill" like tag
const Tag = (props) => {
  return (
    <div className={classes.Tag}>{props.text}</div>
  );
};

export default Tag;
