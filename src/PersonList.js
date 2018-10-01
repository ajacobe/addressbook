import React, { Component } from "react";
import Person from "./Person";
import { connect } from "react-redux";

class PersonList extends Component {
	constructor(props) {
		super(props);
		this.state = { id: 0, person: {} };
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newId = this.state.id + 1;

		this.setState({ id: newId });
		const data = {
			id: newId,
			name: e.target.name.value,
			age: e.target.age.value
		};

		this.props.dispatch({ type: "ADD", data, action: "" });
	}

	handleUpdate(e) {
		e.preventDefault();

		const data = {
			id: e.target.id.value,
			name: e.target.name.value,
			age: e.target.age.value
		};

		this.props.dispatch({ type: "UPDATE", data, action: "", id: e.target.id.value });
	}

	handleAddClick(e) {
		e.preventDefault();

		this.props.dispatch({ type: "SHOW_ADD_FORM", action: "add" });
	}

	render() {
		let props = this.props;
		let action = props.action;
		const person = props.person;
		const btnLabel = action === "add" ? "Add" : "Update";
		const PersonForm = () => (
			<form onSubmit={action === "edit" ? this.handleUpdate : this.handleSubmit}>
				<input type="hidden" defaultValue={person.id ? person.id : null} name="id" />
				<input type="text" defaultValue={person.name ? person.name : ""} name="name" />
				<input type="number" defaultValue={person.age ? person.age : 0} name="age" />
				<button>{btnLabel}</button>
			</form>
		);

		let renderForm;
		if (action === "") {
			renderForm = <button onClick={this.handleAddClick}>Add New Person </button>;
		} else if (action === "add" || action === "edit") {
			renderForm = <PersonForm />;
		}

		let persons = props.persons;
		return (
			<div>
				{renderForm}

				<table>
					<thead>
						<tr>
							<td>Id</td>
							<td>Name</td>
							<td>Age</td>
						</tr>
					</thead>
					<tbody>
						{persons.map(person => (
							<Person key={person.id} person={person} />
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapsStatetoProps = state => ({
	persons: state.persons,
	id: state.id,
	person: state.person,
	action: state.action
});
export default connect(mapsStatetoProps)(PersonList);
