import React, { Component } from "react";
import PersonList from "./PersonList";
import store from "./store";
import { Provider } from "react-redux";

class AlniesApp extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<h1>Alnie's App</h1>
					<PersonList />
				</div>
			</Provider>
		);
	}
}

export default AlniesApp;
