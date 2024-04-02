import Card from "./Card";

function Header(props) {
	return (
		<>
			<div className="cards">
				<Card title={props.totalBST} value="Total BST"></Card>
				<Card title={props.numAbilities} value="Abilities"></Card>
				<Card
					title={(props.totalBST / props.numPokemon).toFixed(2)}
					value="Average BST"
				></Card>
			</div>
		</>
	);
}

export default Header;
