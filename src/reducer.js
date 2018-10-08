const initialState = {
	action: "",
	persons: [],
	id: 0,
	person: {}
};
const reducer = (state = initialState, action) => {
	const data = action.data;

	switch (action.type) {
		case "ADD":
			return Object.assign({}, state, {
				persons: state.persons.concat([action.data]),
				action: ""
			});
		case "UPDATE":
			return Object.assign({}, state, {
				persons: state.persons.map(person => {
					if (person.id == action.id) {
						if (data.profile == "") {
							return { ...data, profile: person.profile };
						}
						return data;
					}
					return person;
				}),
				id: 0,
				action: action.action,
				person: {}
			});
		case "DELETE":
			return Object.assign({}, state, {
				persons: state.persons.filter(person => person.id !== action.id),
				action: ""
			});
		case "FETCH_PERSONS":
			return Object.assign({}, state, {
				persons: action.persons
			});
		case "HIDE_EDIT_ADD_FORM":
			return Object.assign({}, state, {
				action: ""
			});
			break;
		case "SHOW_EDIT_FORM":
			return Object.assign({}, state, {
				action: "edit",
				id: action.id,
				person: action.person
			});
		case "SHOW_ADD_FORM":
			return Object.assign({}, state, {
				action: "add"
			});

		default:
			return state;
	}
};

export default reducer;
