import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board.jsx';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">
							Welcome to Shortest Path Visualizer
						</h1>
					</header>
				</div>
				<br></br>
				<div style={{ textAlign: 'center' }}>
				   <p>From a given cell, upward, downward, leftward and rightward movement are allowed.</p>
				   <p>Select source and destination. Then manually or randomly make obstacles. </p>
				   <p>Then find shortest path between them.</p>
				   <Board />
				</div>
			</div>
		);
	}
}

export default App;
