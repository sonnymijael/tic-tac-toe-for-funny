import React from 'react'
import './App.css'
// Components
import { Square } from './core/components'
import { GameTurns } from './core/enums'

interface AppState {
  board: string[]
  turn: GameTurns
  winner: GameTurns | null
}

interface _ {}

export class App extends React.Component<_, AppState> {
  constructor(props: _) {
    super(props)

    this.state = {
      board: Array(9).fill(''),
      turn: GameTurns.X,
      winner: null
    }

    // bind updateBoard to this
    this.updateBoard = this.updateBoard.bind(this)
    this.checkWinner = this.checkWinner.bind(this)
  }

  // check if there is a winner
  checkWinner(board: string[]): GameTurns | null {
    const winningCombos = [
      // horizontal
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // vertical
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // diagonal
      [0, 4, 8], [2, 4, 6]
    ]

    for (const combo of winningCombos) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // set winner to the winner value (X or O)
        return board[a] as GameTurns
      }
    }
    return null
  }

  updateBoard(index: number) {
    // not update position if already filled
    if (this.state.board[index] || this.state.winner) return
    // New turn
    const turn = this.state.turn === GameTurns.X ? GameTurns.O : GameTurns.X
    // New board
    const board = this.state.board.map((value, i) => i === index ? this.state.turn : value)
    // Update state with new turn and board
    const winner = this.checkWinner(board)
    this.setState({ board, turn, winner })
  }

  render() {
    return (
      <main className='board'>
        <h1> Tic tac toe  </h1>
        <section className='game'>
          {
            this.state.board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={this.updateBoard}
                  isSelected={false}
                >
                  {this.state.board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className='turn'>
          <Square
            isSelected={(this.state.turn === GameTurns.X)}
            updateBoard={() => {}}
            index={0}
          > 
            {GameTurns.O}
          </Square>
          <Square 
            isSelected={(this.state.turn === GameTurns.O)}
            updateBoard={() => {}}
            index={0}
          > 
            {GameTurns.X}
          </Square>
        </section>
        {/* Display winner check and equals or close game */}
        {
          this.state.winner === null && !this.state.board.includes('') && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  It's a draw!
                </h2>

                <footer>
                  <button onClick={() => this.setState({ board: Array(9).fill(''), winner: null })}>
                    Play again
                  </button>
                </footer>
              </div>
            </section>
          )
        }
        {/* Display winner */}
        {  
          this.state.winner && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  Player {this.state.winner} wins!
                </h2>

                <header className='win'>
                  {
                    this.state.winner && ( 
                      <Square
                        isSelected={true}
                        updateBoard={() => {}}
                        index={0}
                      >
                        {this.state.winner}
                      </Square>
                    )
                  }
                </header>

                <footer>
                  <button onClick={() => this.setState({ board: Array(9).fill(''), winner: null })}>
                    Play again
                  </button>
                </footer>
              </div>
            </section>
          ) 
        }
      </main>
    )
  }
}

export default App
