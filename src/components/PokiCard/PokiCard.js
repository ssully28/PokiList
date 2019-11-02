import React from 'react';
import classes from './PokiCard.module.css';

const PokiCard = (props) => {
  return (
    <div className={classes.PokiCard}>
      <img className={classes.Img} src={props.img} alt={props.name} />
      <div className={classes.Data}>
        <div className={classes.Name}>{props.name}</div>
        <div className={classes.Info}>Height: {props.height}</div>
        <div className={classes.Info}>Weight: {props.weight}</div>
      </div>
    </div>
  );
};

export default PokiCard;
