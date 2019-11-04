import React from 'react';
import classes from './AddTag.module.css';



const AddTag = ( props ) => {
  return (
    <input 
      type='text'
      className={classes.AddTag}
      value={props.addTagInputText} 
      onChange={props.addTagHandler}
      onKeyPress={props.addTagOnEnter}
      placeholder='Add a tag' />
  );
};

export default AddTag;

