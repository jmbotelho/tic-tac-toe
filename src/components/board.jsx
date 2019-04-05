import React, { Component } from "react";
import Square from "./square";

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        id={i}
        winningSquares={this.props.winningSquares}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard() {
    let board = [];
    let rows = 3;
    let cols = 3;
    let square = 0;

    for (let row = 0; row < rows; row++) {
      const columns = [];
      for (let col = 0; col < cols; col++) {
        columns.push(this.renderSquare(square++));
      }
      board.push(
        <div key={row} className="board-row">
          {columns}
        </div>
      );
    }

    return board;
  }

  render() {
    return (
      <div>
        <div className="status" />
        {this.createBoard()}
      </div>
    );
  }
}

export default Board;
