import React from 'react';

class Column extends React.Component {

	constructor (props) {
		super (props);

		this.cellClicked = this.cellClicked.bind(this);
		this.difuseBomb = this.difuseBomb.bind(this);
	}

	cellClicked (e) {
		this.props.onCellClicked(e, {
			row: this.props.colInfo.row,
			col: this.props.colInfo.col
		})
	}

	difuseBomb (e) {
		e.preventDefault();
		e.stopPropagation();
		this.props.difuseBomb(e, {
			row: this.props.colInfo.row,
			col: this.props.colInfo.col
		})
	}

	render () {
		return (
			<button className = {"ms-column-component box " + ((this.props.colInfo.isProcessed) ? "ms-opened " : "") } onClick = {this.cellClicked} onContextMenu = {this.difuseBomb}> 
				<div className = {(this.props.colInfo.isDiffused ? "ms-diffused " : "") + (this.props.colInfo.dispalyMine ? "ms-bomb " : "")}>
				{this.props.colInfo.adjacentMine}
				</div>
			</button>
			)
	}
}

export default Column;