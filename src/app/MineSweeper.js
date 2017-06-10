import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table.js'

class MineSweeper extends React.Component {

	constructor (props) {
		super (props);
		window.ms = this;

		this.gameOver = this.gameOver.bind(this);
		this.reset = this.reset.bind(this);
		this.diffused = this.diffused.bind(this);

		this.state = {
			row: props.row || 9,
			col: props.col || 9,
			mineCount: props.mine || 10,
			maxDiffuseLimit: props.mine ? props.mine + 5 : 10 + 5,
			diffusedTryCount: 0,
			gameOver: false,
			isWon: false,
			successMsg: props.successMsg || "Yay!! You Won..All Mines Diffused... Congrats",
			failMsg: props.failMsg || "You clicked a Mine.. Bad Luck"

		}
	}

	gameOver (obj) {
		if (obj.won) {
			this.setState ({
				isWon: true
			})
		}
		else {
			this.setState ({
				gameOver: true
			})			
		}
	}

	diffused () {
		let count = ++this.state.diffusedTryCount;
		this.setState ({
			diffusedTryCount: count,
			reset: false
		})
		// if (count === this.state.maxDiffuseLimit) {
		// 	this.setState ({
		// 		gameOver: true
		// 	})
		// }
	}

	reset () {
		this.setState ({
			row: this.props.row,
			col: this.props.col,
			mineCount: this.props.mine,
			diffusedTryCount: 0,
			gameOver: false,
			isWon: false,
			reset: true
		})
	}
	render () {
		console.log("diffCount",this.state)
		return (
				<div className = "MineSweeper_component">
					<div className = "ms-header"> 
						<div className = "diffuseTry">
							{this.state.diffusedTryCount}
						</div>
						<div className = "resetLayout">
							<button onClick = {this.reset}>
								Reset
							</button>
						</div>
					</div>
					<div className = {"sucessOverlay ms-msg " + (this.state.isWon ? "" : "hide")}>
						{this.state.successMsg}
					</div>
					<div className = {"gameFailOverlay ms-msg " + (this.state.gameOver ? "" : "hide")}>
						{this.state.failMsg}
					</div>
					<Table row = {this.state.row} col = {this.state.col} mineCount = {this.state.mineCount} isGameOver = {this.state.gameOver} isWon = {this.state.isWon} gameOver = {this.gameOver} diffused = {this.diffused} reset = {this.state.reset}/>
					
				</div>
			)
	}
}

export default MineSweeper;