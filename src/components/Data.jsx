import Pokemon from "./Pokemon";

function Data(props) {
	return (
		<table>
			<thead>
				<tr>
					<th>Sprite</th>
					<th>Name</th>
					<th>Type 1</th>
					<th>Type 2</th>
					<th>Ability 1</th>
					<th>Ability 2</th>
					<th>Hidden Ability</th>
					<th>BST</th>
					<th>HP</th>
					<th>Attack</th>
					<th>Defense</th>
					<th>Sp. Attack</th>
					<th>Sp. Defense</th>
					<th>Speed</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				{props.pokemon
					.sort((a, b) => sort(a, b, 0))
					.map((p, i) => {
						return <Pokemon data={p} key={i} />;
					})}
			</tbody>
		</table>
	);
}

function sort(a, b, type) {
	switch (type) {
		case 0:
			return a.id - b.id;
		case 1:
			return a.name.localeCompare(b.name);
		case 2:
			return a.bst - b.bst;
		case 3:
			return a.hp - b.hp;
		case 4:
			return a.att - b.att;
		case 5:
			return a.def - b.def;
		case 6:
			return a.spAtk - b.spAtk;
		case 7:
			return a.spDef - b.spDef;
		case 8:
			return a.speed - b.speed;
	}
}

export default Data;
