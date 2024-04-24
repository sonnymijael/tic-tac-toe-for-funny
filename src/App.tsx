import React from 'react'
import './App.css'
// Components
import { Square } from './components'
import { GameTurns } from './core/enums'

interface AppState {
  board: string[]
  turn: GameTurns
}

interface _ {}

export class App extends React.Component<_, AppState> {
  constructor(props: _) {
    super(props)

    this.state = {
      board: Array(9).fill(''),
      turn: GameTurns.X
    }

    // bind updateBoard to this
    this.updateBoard = this.updateBoard.bind(this)
  }

  updateBoard(index: number) {
    const turn = this.state.turn === GameTurns.X ? GameTurns.O : GameTurns.X
    const board = this.state.board.map((value, i) => i === index ? this.state.turn : value)
    this.setState({ turn, board })
  }

  render() {
    return (
      <main className='board'>
        <h1> Tic tac toe </h1>
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
      </main>
    )
  }
}

export default App
