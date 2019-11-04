import React from 'react';
import ExpandButton from '../ExpandButton/ExpandButton';
import classes from './PokiCard.module.css';

const PokiCard = (props) => {
  const abilityList = props.abilities.map(ability => {
    return (
      <div key={ability}>{ability}</div>
    )
  });

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
              <div className={classes.SubTitle}>Abilities:</div>
              {abilityList}
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
