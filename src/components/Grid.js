import React, { Component } from 'react';
import { Layer, Circle, Rect, Stage } from 'react-konva';
import './styles/Grid.css';

class Grid extends Component {
  render() {
    const {
      players: {
        A: playerA,
        Z: playerZ
      },
      endgame,
      paused,
      onGridFocus,
      onKeyDown,
      onReplay
    } = this.props;

    const isFirstPlay = endgame.score.A + endgame.score.Z === 0;

    const pauseScreen = <h1>{paused ? 'Paused': 'Playing'}</h1>;

    const showLastWinner = endgame.gameOver ? <h3>{endgame.winner.color.toUpperCase()} Player Wins!</h3> : null;

    const startScreen = (
      <div>
        <h1
          className='playButton'
          onClick={onReplay}
        >{ isFirstPlay ? '' : 'RE'}PLAY</h1>
        {isFirstPlay ? null : showLastWinner}
        <h3>Red: {endgame.score.A} - Blue: {endgame.score.Z}</h3>
      </div>
    );
  
    const interimDisplay = isFirstPlay || endgame.gameOver ? startScreen : pauseScreen;

    const gameDisplay = (
      <Stage 
        width={600} 
        height={400}
        >
        <Layer>
          <Rect 
            fill='lightgreen'
            height={400}
            width={600}
          ></Rect>
          <Circle
            radius={playerA.radius}
            fill={playerA.color}
            x={playerA.position.x}
            y={playerA.position.y}
          />
          <Circle
            radius={playerZ.radius}
            fill={playerZ.color}
            x={playerZ.position.x}
            y={playerZ.position.y}
          />
        </Layer>
      </Stage>
    );
    
    return (
      <div
        className="Grid"
        tabIndex="0" 
        onFocus={onGridFocus(true)}
        onBlur={onGridFocus(false)}
        onKeyDown={onKeyDown(true)} 
        onKeyUp={onKeyDown(false)}
      >
        {paused ? interimDisplay : gameDisplay}
      </div>
    );
  }
}

export default Grid;