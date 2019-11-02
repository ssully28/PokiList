import React from 'react';
import classes from './ExpandButton.module.css';

const ExpandButton = (props) => {
  return (
    <div className={classes.ExpandButton} onClick={() => props.expandCollapse(props.cardId)}>
      {props.expandedView ? '-' : '+'}
    </div>
  );
};

export default ExpandButton;
