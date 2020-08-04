import React, { Component } from 'react';
import './Grid.css'

function findClass(grid,i,j)
{
  switch(grid[i][j])
  {
	 case 1:return 'Obst';
	 case 2:return 'Source';
	 case 3:return 'Dest'; 
	 case 4:return 'Path';
	 default:return '';
  }
}

export default class Grid extends Component {
	render() {
		const { grid, onToggleCell } = this.props;
		let display = grid.map((row, i) =>
			row.map((col, j) => (
				<div
				className={`Cell ${findClass(grid,i,j)}`}
				onClick={e => {onToggleCell(i, j)}}
				key={`${i}_${j}`}
				/>
			))
		);
		console.log(display);
		return (
			<div
				className="Grid"
				style={{
					width: this.props.columns * 14
				}}>
				{display}
			</div>
		);
	}
}
