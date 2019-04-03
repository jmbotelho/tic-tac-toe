import React, { Component } from "react";
import Board from "./board";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      movesInAscendingOrder: true
    };
  }

  handleClick = i => {
    const { xIsNext, stepNumber } = { ...this.state };
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  };

  handleReverseOrder = () => {
    this.setState({ movesInAscendingOrder: !this.state.movesInAscendingOrder });
  };

  handleJumpTo = step => {
    console.log(step);
    this.setState({
      xIsNext: step % 2 === 0,
      stepNumber: step
    });
  };

  calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  render() {
    const { stepNumber, xIsNext, movesInAscendingOrder } = {
      ...this.state
    };
    const history = this.state.history.slice();
    const squares = history[stepNumber].squares.slice();
    const winner = this.calculateWinner(squares);

    movesInAscendingOrder || history.reverse();

    const moves = history.map(move => {
      const step = move.squares.filter(s => s !== null).length;
      const desc = step ? "Go to move #: " + step : "Go to start";
      return (
        <li key={step}>
          <button onClick={() => this.handleJumpTo(step)}>
            <span
              style={{
                fontWeight: stepNumber === step ? "bold" : ""
              }}
            >
              {desc}
            </span>
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player: ${xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={this.handleReverseOrder}>Reverse Order</button>
        </div>
      </div>
    );
  }
}

export default Game;
