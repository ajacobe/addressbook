import React, { Component } from "react";
import { connect } from "react-redux";

class Person extends Component {
	constructor(props) {
		super(props);

		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEditClick(e) {
		e.preventDefault();
		this.props.dispatch({ type: "SHOW_EDIT_FORM", id: this.props.person.id, person: this.props.person });
	}

	handleDelete(e) {
		e.preventDefault();
		this.props.dispatch({ type: "DELETE", id: this.props.person.id });
	}

	render() {
		let person = this.props.person;

		return (
			<tr>
				<td>{person.id}</td>
				<td>{person.name}</td>
				<td>{person.age}</td>
				<td>
					<button onClick={this.handleEditClick}>Edit</button>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		);
	}
}

export default connect()(Person);
