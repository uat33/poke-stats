import { Link } from "react-router-dom";

function Pokemon(props) {
	return (
		<tr>
			<td>
				<img src={props.data.image} alt="sprite" />
			</td>

			<td>{props.data.name}</td>
			<td>{props.data.type1}</td>
			<td>{props.data.type2}</td>
			<td>{props.data.ability1}</td>
			<td>{props.data.ability2}</td>
			<td>{props.data.hidden_ability}</td>
			<td>{props.data.bst}</td>
			<td>{props.data.hp}</td>
			<td>{props.data.att}</td>
			<td>{props.data.def}</td>
			<td>{props.data.spAtk}</td>
			<td>{props.data.spDef}</td>
			<td>{props.data.speed}</td>
			<td>
				<Link to={"/pokemon/" + props.data.name}>🔗</Link>
			</td>
		</tr>
	);
}

export default Pokemon;
