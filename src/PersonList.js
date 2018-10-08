import React, { Component } from "react";
import Person from "./Person";
import { connect } from "react-redux";

class PersonList extends Component {
	constructor(props) {
		super(props);
		this.state = { id: 0, person: {}, completed: 1, toShow: { display: "block" } };
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);

		this.updateProfileData = this.updateProfileData.bind(this);
		this.resetForm = this.resetForm.bind(this);
		this.uploadInProgress = this.uploadInProgress.bind(this);
		this.uploadInComplete = this.uploadInComplete.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newId = this.state.id + 1;

		this.setState({ id: newId });
		const data = {
			id: newId,
			name: e.target.name.value,
			age: e.target.age.value,
			profile: ""
		};

		this.props.dispatch({ type: "ADD", data, action: "" });
	}

	handleUpdate(e) {
		e.preventDefault();

		let target = e.target;
		const file = target.profile.files[0] ? target.profile.files[0] : "";
		const data = {
			id: target.id.value,
			name: target.name.value,
			age: target.age.value,
			profile: file ? file.name : ""
		};

		let apiUrl = "http://testreact.local/data-api.php";
		this.updateProfileData(data, apiUrl, file);

		if (data.profile != "") {
			this.props.dispatch({ type: "UPDATE", data, action: "edit", id: data.id });
		} else {
			this.props.dispatch({ type: "UPDATE", data, action: "", id: data.id });
		}
	}

	updateProfileData(data, apiUrl, file) {
		let merged = this.props.persons.map(person => {
			if (person.id == data.id) {
				if (data.profile == "") {
					return { ...data, profile: person.profile };
				}
				return data;
			}
			return person;
		});

		let persons_data = { persons: merged };
		var xhr = new XMLHttpRequest();
		xhr.open("POST", apiUrl + "?action=update_profile");
		if (data.profile != "") {
			xhr.upload.addEventListener("progress", this.uploadInProgress);
			xhr.upload.addEventListener("load", this.uploadInComplete);
			xhr.setRequestHeader("Accept", "application/json");

			let reader = new FileReader();
			reader.onload = function(e) {
				let img_file = { persons_data, title: file.name, file: reader.result };
				xhr.send(JSON.stringify(img_file));
			};

			reader.readAsDataURL(file);
		} else {
			xhr.send(JSON.stringify({ persons_data }));
		}
	}

	uploadInComplete(e) {
		this.setState({ completed: 100 });
		setTimeout(this.resetForm, 1000);
	}

	resetForm() {
		this.props.dispatch({ type: "HIDE_EDIT_ADD_FORM", action: "" });
		this.setState({ completed: 1 });
	}

	uploadInProgress(e) {
		if (e.lengthComputable) {
			let percentage = Math.round((e.loaded * 100) / e.total);
			this.setState({ completed: percentage });
		}
	}

	handleAddClick(e) {
		e.preventDefault();

		this.props.dispatch({ type: "SHOW_ADD_FORM", action: "add" });
	}

	componentDidMount() {
		fetch("http://testreact.local/data-api.php?action=fetch")
			.then(res => {
				var contentType = res.headers.get("content-type");
				if (contentType && contentType == "application/json") {
					return res.json();
				} else {
					return { persons: [] };
				}
			})
			.then(data => {
				this.props.dispatch({ type: "FETCH_PERSONS", action: "", persons: data.persons });
			});
	}

	render() {
		let props = this.props;
		let action = props.action;

		const person = props.person;
		const btnLabel = action === "add" ? "Add" : "Update";

		let width = this.state.completed ? this.state.completed : 1;
		const style = { width: width + "%", backgroundColor: "#4caf50", height: "30px" };

		const toShow = this.state.toShow;
		const PersonForm = () => (
			<form onSubmit={action === "edit" ? this.handleUpdate : this.handleSubmit}>
				<input type="hidden" defaultValue={person.id ? person.id : null} name="id" />
				<input type="text" defaultValue={person.name ? person.name : ""} name="name" />
				<input type="number" defaultValue={person.age ? person.age : 0} name="age" />
				{action === "edit" ? <input name="profile" type="file" accept="image/*" /> : ""}
				<button>{btnLabel}</button>
				{action === "edit" ? (
					<div style={toShow} className="progress">
						<div style={style} />
					</div>
				) : (
					""
				)}
			</form>
		);

		let renderForm;
		if (action === "") {
			renderForm = <button onClick={this.handleAddClick}>Add New Person </button>;
		} else if (action === "add" || action === "edit") {
			renderForm = <PersonForm />;
		}

		let persons = props.persons;
		let rows = persons.map(person => <Person key={person.id} person={person} />);
		return (
			<div>
				{renderForm}

				<table>
					<thead>
						<tr>
							<td>Id</td>
							<td>Profile</td>
							<td>Name</td>
							<td>Age</td>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
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
