import React from 'react'

interface SquareProps {
    children: React.ReactNode;
    isSelected: boolean;
    updateBoard: (index: number) => void;
    index: number;
}

export class Square extends React.Component<SquareProps> {
  constructor(props: SquareProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.updateBoard(this.props.index)
  }

  render() {
    const className = `square ${this.props.isSelected ? 'is-selected': ''}`

    return (
      <div className={className} onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}

export default Square