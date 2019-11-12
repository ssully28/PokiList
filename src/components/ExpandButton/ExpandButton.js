import React from 'react';
import classes from './ExpandButton.module.css';

/**
 * Simple +/- button on right side of card to
 * toggle the expanded view.
 */
const ExpandButton = (props) => {
  return (
    <div className={classes.ExpandButton} onClick={() => props.expandCollapse(props.cardId)}>
      {props.expandedView ? '-' : '+'}
    </div>
  );
};

export default ExpandButton;
