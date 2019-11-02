import React from 'react';
import ExpandButton from '../ExpandButton/ExpandButton';
import classes from './PokiCard.module.css';

const PokiCard = (props) => {
  return (
    <div className={classes.PokiCard}>
      <img className={classes.Img} src={props.img} alt={props.name} />
      <div className={classes.Data}>
        <div className={classes.Name}>{props.name}</div>
        <div className={classes.Info}>Height: {props.height}</div>
        <div className={classes.Info}>Weight: {props.weight}</div>
        {
          props.expandedView
            ? <div className={classes.ExpandedData}>
              I am expanded text....only visible when in expanded view!
            </div>
            : null
        }
      </div>
      <div className={classes.Btn}>
        <ExpandButton expandedView={props.expandedView} cardId={props.id} expandCollapse={props.expandCollapse} />
      </div>
    </div>
  );
};

export default PokiCard;
