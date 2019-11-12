import React from 'react';
import ExpandButton from '../ExpandButton/ExpandButton';
import AddTag from '../AddTag/AddTag';
import Tag from '../Tag/Tag';
import classes from './PokiCard.module.css';

/**
 * Poki Card takes a bunch of other components and assembles
 * them to give the user a clean view of the pokimon's info
 */
const PokiCard = (props) => {
  const abilityList = props.abilities.map(ability => {
    return (
      <div key={ability}>{ability}</div>
    );
  });

  const tagList = props.tags.map(tag => {
    return (
      <Tag key={tag} text={tag} />
    );
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
              <div className={classes.TagContainer}>
                {tagList}
              </div>
              <AddTag
                addTagInputText={props.addTagInputText}
                addTagHandler={props.addTagHandler}
                addTagOnEnter={props.addTagOnEnter} />
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
