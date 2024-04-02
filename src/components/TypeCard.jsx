import "../App.css";

const types = {
	fire: "#f42",
	water: "#39f",
	grass: "#7c5",
	electric: "#fc3",
	flying: "#89f",
	fairy: "#e9e",
	dark: "#654",
	psychic: "#f59",
	ghost: "#66b",
	dragon: "#76e",
	bug: "#ab2",
	steel: "#aab",
	rock: "#ba6",
	ground: "#db5",
	ice: "#6cf",
	fighting: "#b54",
	poison: "#a59",
	normal: "#aa9",
};

function TypeCard(props) {
	const name = props.name[0].toUpperCase() + props.name.slice(1);
	return (
		<div
			style={{
				backgroundColor: types[name.toLowerCase()],
			}}
			className="TypeCard"
		>
			{name}
		</div>
	);
}

export default TypeCard;
