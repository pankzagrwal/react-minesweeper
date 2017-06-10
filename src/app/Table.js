import React from 'react';
import Row from './Row.js';

class Table extends React.Component {
	constructor (props) {
		super (props);

		this.mineDiffusedCount = 0;

		this.cellClicked = this.cellClicked.bind(this);
		this.difuseBomb = this.difuseBomb.bind(this);

		this.state = {
			mineTable: this.createMineTable (props)
		}

	}

	// Create 2-d Array for Row and Column
	createMineTable (nProps) {
		let row = nProps.row,
			col = nProps.col,
			mineCount = nProps.mineCount,
			mineTable = [],
			mineRow = [],
			mineCell = null;

		for (let i = 0; i < row; i++) {
			mineRow = [];
			mineCell = {};
			for (let k = 0; k < col; k++) {
				mineCell = {
					row: i,
					col: k,
					isMine: false,
					isProcessed: false,
					adjacentMine: "",
					dispalyMine: false
				}

				mineRow.push(mineCell)
			}

			mineTable.push(mineRow);
		}
		mineTable = this.createMine (mineTable, nProps)

		return mineTable;
	}

	// create Mine Column
	createMine (list, nProps) {
		let mineCount = nProps.mineCount,
			rowCount = nProps.row,
			colCount = nProps.col,
			mineTable = list;
		for (let i = 0; i < mineCount;) {
			let randomRow = this.getRandomArbitrary (0, rowCount),
				randomCol = this.getRandomArbitrary (0, colCount);

			if (!mineTable[randomRow][randomCol].isMine) {

				mineTable[randomRow][randomCol].isMine = true;
				mineTable[randomRow][randomCol].isDiffused = false;
				i++;
			}
		}
		return mineTable;
		//this.state.mineTable = mineTable;
	}

	// Generate Random Number
	getRandomArbitrary(min, max) {
	    return Math.floor(Math.random() * (max - min) + min);
	}

	cellClicked (e, cell) {
		let mineTable = this.state.mineTable,
			gameOver = this.props.isGameOver;

		if (!mineTable[cell.row][cell.col].isMine) {
			this.openCell(cell, mineTable, true);
		}
		else {
			this.props.gameOver({
				fail: true
			});
			this.showMine(mineTable);
		}

		this.setState ({
			mineTable: mineTable
		})
	}

	openCell (cell, mineTable, isprogramaticaly) {
		let row = cell.row,
			col = cell.col,
			adjacentMine = 0;

		if (!mineTable[row] || !mineTable[row][col] || mineTable[row][col].isMine || mineTable[row][col].isProcessed) {
			return;
		}

		mineTable[row][col].isProcessed = true;

		adjacentMine = this.countAdjacentMine(cell, mineTable);
		if (adjacentMine !== 0) {
			mineTable[row][col].adjacentMine = adjacentMine;
		}
		
		else {
			for (let i = row -1; i < row + 2; i++) {
				for (let j = col -1; j < col + 2; j++) {

					if (mineTable[i] && mineTable[i][j] && !mineTable[i][j].isProcessed && !mineTable[i][j].isMine) {
						this.openCell ({row: i, col: j}, mineTable, true)		
					}

				}
			}
		}

		mineTable[row][col].adjacentMine = adjacentMine;
	}

	countAdjacentMine (cell, mineTable) {
		var row = cell.row,
			col = cell.col,
			adjacentMine = 0;

		for (let i = row - 1; i < row + 2; i++) {

			for (let j = col - 1; j < col + 2; j++) {
				if (mineTable[i] && mineTable[i][j] && mineTable[i][j].isMine) {
					adjacentMine++;
				}
			}
		}

		return adjacentMine;
	}

	showMine (mineTable) {
		let count = 0;
		for (let i = 0; i < mineTable.length; i++) {

			for (let j = 0; j < mineTable[i].length; j++) {
				console.log(count++);
				if (mineTable[i][j].isMine) {
					mineTable[i][j].isProcessed = true;
					mineTable[i][j].dispalyMine = true;

				}
			}
		}
	}

	difuseBomb (e, cell) {
		let mines = this.mines;
		let mineTable = this.state.mineTable;
		if (mineTable[cell.row][cell.col].isMine) {
			mineTable[cell.row][cell.col].isDiffused = true;
			this.mineDiffusedCount++;
		}

		this.setState({
			mineTable: mineTable
		})

		this.props.diffused()
		this.checkGame();
	}

	checkGame () {
		if (this.mineDiffusedCount === this.props.mineCount) {
			this.props.gameOver({
				won: true
			})
		}
	}

	componentWillReceiveProps (nextProps) {
		console.log("nextProps", nextProps)
		if (nextProps.reset && !nextProps.isGameOver && !nextProps.isWon) {
			let mineTable = this.createMineTable(nextProps);
			this.mineDiffusedCount = 0;
			this.setState ({
				mineTable: mineTable
			})			
		}

	}

	render () {
		let Rows = this.state.mineTable.map ((row, index) => {
			return  (
				<Row key = {index + "_row"} row = {row} onCellClicked = {this.cellClicked} difuseBomb = {this.difuseBomb} />
				)
		})
		return (
			<div className = {"ms-table-component " + (this.props.isGameOver ? "ms-gameOver " : "") + (this.props.isWon ? "ms-gameWon": "")}>
				{Rows}
			</div>
			)
	}
}

export default Table;