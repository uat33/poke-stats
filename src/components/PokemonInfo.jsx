import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import "../index.css";
import StatsChart from "./StatsChart.jsx";
import TypeCard from "./TypeCard.jsx";
import upperCase from "../util.jsx";
import Ability from "./Ability.jsx";

function PokemonInfo() {
	let params = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [abilityDescriptions, setAbilityDescriptions] = useState([]);
	useEffect(() => {
		const getPokemonDetail = async () => {
			const details = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${params.name
					.toLowerCase()
					.replaceAll(" ", "-")}`
			);

			const detailsJson = await details.json();

			setPokemon({ data: detailsJson });
		};

		getPokemonDetail().catch(console.error);
	}, [params.name]);

	const abilities = pokemon?.data.abilities;
	useEffect(() => {
		const current = [...abilityDescriptions];
		const getAbilityDetails = async (query, isHidden, slot) => {
			if (!query) return;
			const details = await fetch(query);

			const detailsJson = await details.json();
			const duplicate = abilityDescriptions.find((a) => {
				return upperCase(a.name) === upperCase(detailsJson.name);
			});
			if (duplicate) {
				return;
			}

			const data = { isHidden: isHidden };
			data.name = upperCase(detailsJson.name);
			data.effect = detailsJson.effect_entries.find(
				(e) => e.language.name === "en"
			)?.effect;

			if (!data.effect) {
				data.effect = detailsJson.flavor_text_entries.find(
					(e) => e.language.name === "en"
				)?.flavor_text;
			}

			data.slot = slot;
			current.push(data);
			setAbilityDescriptions([...current]);
		};

		abilities?.map((a, i) => {
			const url = a.ability.url;
			const hidden = a.is_hidden;
			getAbilityDetails(url, hidden, i);
		});
	}, [pokemon]);
	abilityDescriptions.sort((a, b) => a.slot - b.slot);
	let max = 0;
	const statData = pokemon?.data.stats.map((stat) => {
		const data = {
			base_stat: stat.base_stat,
			stat_name: stat.stat.name,
		};
		if (stat.base_stat > max) max = stat.base_stat;
		return data;
	});
	return (
		<>
			<h1>{params.name}</h1>
			<img src={pokemon?.data.sprites.front_default} alt="" />
			<img src={pokemon?.data.sprites.back_default} alt="" />
			<img src={pokemon?.data.sprites.front_shiny} alt="" />
			<img src={pokemon?.data.sprites.back_shiny} alt="" />

			<div style={{ display: "flex", justifyContent: "center" }}>
				{pokemon?.data.types.map((type, i) => (
					<TypeCard name={type.type.name} key={i} />
				))}
			</div>

			<StatsChart data={statData} maxStat={max} />
			<Ability descriptions={abilityDescriptions} />
		</>
	);
}

export default PokemonInfo;
