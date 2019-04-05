import React from "react";

const Square = props => {
  let classes = "square";

  if (props.winningSquares && ~props.winningSquares.indexOf(props.id)) {
    classes += " winner";
  }

  return (
    <button className={classes} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
