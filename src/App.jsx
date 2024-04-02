import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Data from "./components/Data";
import Type from "./components/Type";
import TypeBST from "./components/TypeBST";
import Header from "./components/Header";
import upperCase from "./util.jsx";

function App() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [totalBST, setBST] = useState(0);
	const [searchPokemon, setSearchPokemon] = useState("");
	const [current, setCurrent] = useState([]);
	const [minBST, setMinBST] = useState(200);
	const [type1, setType1] = useState("");
	const [type2, setType2] = useState("");
	const [numAbilities, setNumAbilities] = useState(0);

	const numPokemon = 1025;

	let pokemon = [];
	useEffect(() => {
		for (let i = 1; i <= numPokemon; i++) {
			getPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => {
				pokemon.push(res);
				setAllPokemon([...pokemon]);
				setCurrent([...pokemon]);
			});
		}
	}, []);

	useEffect(() => {
		if (allPokemon.length === 0) return;
		const total = allPokemon.reduce((acc, val) => (acc += val.bst), 0);
		setBST(total);
	}, [allPokemon]);

	useEffect(() => {
		const seenAbilities = [];
		let num = 0;
		allPokemon.forEach((p) => {
			const abilities = [p.ability1, p.ability2, p.hidden_ability];
			abilities.forEach((ability) => {
				if (ability !== "--" && !seenAbilities.includes(ability)) {
					num++;
					seenAbilities.push(ability);
				}
			});
		});
		setNumAbilities(num);
	}, [allPokemon]);

	return (
		<>
			<Header
				totalBST={totalBST}
				numAbilities={numAbilities}
				numPokemon={numPokemon}
			/>
			<TypeBST data={allPokemon} />
			<div className="data centerDiv">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (searchPokemon !== "") {
							setCurrent(
								allPokemon.filter((p) => {
									return p.name
										.toLowerCase()
										.startsWith(
											searchPokemon.toLowerCase()
										);
								})
							);
						} else {
							setCurrent(allPokemon);
						}
					}}
				>
					<input
						type="text"
						placeholder="Pokemon"
						value={searchPokemon}
						onChange={(e) => setSearchPokemon(e.target.value)}
					/>
					<input type="submit" />
				</form>

				<input
					type="range"
					name="bst"
					id="bst"
					min="200"
					max="720"
					step="5"
					onInput={(e) => {
						setMinBST(e.target.value);
					}}
				/>
				<label>BST</label>

				<div>
					<Type idVal="type1" set={setType1} />
					<Type idVal="type2" set={setType2} />
				</div>
				<Data
					pokemon={current
						.filter((p) => p.bst >= minBST)
						.filter((p) => {
							if (type1 === "" && type2 === "") return true;
							if (type1 === type2) return false;

							if (type1 === "") {
								return type2 === p.type1 || type2 === p.type2;
							}
							if (type2 === "") {
								return type1 === p.type1 || type1 === p.type2;
							}

							return (
								(type1 === p.type1 && type2 === p.type2) ||
								(type1 === p.type2 && type2 === p.type1)
							);
						})}
				/>
			</div>
		</>
	);
}

export default App;

async function getPokemon(query) {
	const data = {};
	return await axios.get(query).then((res) => {
		data.id = res.data.id;
		data.name = res.data.species.name;
		data.type1 = res.data.types[0].type.name;
		data.type2 =
			res.data.types.length > 1 ? res.data.types[1].type.name : "--";

		data.ability1 = res.data.abilities[0].ability.name;

		if (res.data.abilities.length == 2) {
			data.ability2 = "--";
			data.hidden_ability = res.data.abilities[1].ability.name;
		} else if (res.data.abilities.length == 3) {
			data.ability2 = res.data.abilities[1].ability.name;
			data.hidden_ability = res.data.abilities[2].ability.name;
		} else {
			data.ability2 = "--";
			data.hidden_ability = "--";
		}
		data.height = res.data.height / 10;
		data.weight = res.data.weight / 10;
		const wordAttrs = [
			"name",
			"type1",
			"type2",
			"ability1",
			"ability2",
			"hidden_ability",
		];

		wordAttrs.map((word) => {
			if (data[word] !== undefined && data[word] != "--") {
				data[word] = upperCase(data[word]);
			}
		});

		const stats = ["hp", "att", "def", "spAtk", "spDef", "speed"];
		let total = 0;
		stats.forEach((s, i) => {
			data[s] = res.data.stats[i].base_stat;
			total += res.data.stats[i].base_stat;
		});
		data.bst = total;

		data.image = res.data.sprites.front_default;
		return data;
	});
}
