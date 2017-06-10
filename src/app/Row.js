import React from 'react';
import Col from "./Column";

class Row extends React.Component {

	constructor (props) {
		super (props);


	}
	render () {
		let cols = this.props.row.map ( (column, index) => {
			//console.log("Row", this.props)
			return (
				<Col colInfo = {column} key = {index + "_col"} onCellClicked = {this.props.onCellClicked} difuseBomb = {this.props.difuseBomb}/>
				)
		})
		return (
			<div className = "ms-row-component ms-row">
			{cols}
			</div>
			)
	}
}

export default Row;