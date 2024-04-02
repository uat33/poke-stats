import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import PokemonInfo from "./components/PokemonInfo.jsx";

function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index={true} element={<App />} />
					<Route path="/pokemon/:name" element={<PokemonInfo />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
ReactDOM.createRoot(document.getElementById("root")).render(<Routing />);

export default Routing;
