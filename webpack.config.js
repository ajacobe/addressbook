const HtmlWebPackPlugin = require("html-webpack-plugin");

let config = {
	devtool: "eval",
	entry: {
		index: "./src/index.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader"
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		})
	]
};

module.exports = config;
