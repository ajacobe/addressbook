import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

if (process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept();
}

const render = (root, Component) => {
	ReactDOM.render(<Component />, root);
};

render(document.getElementById("root"), App);
