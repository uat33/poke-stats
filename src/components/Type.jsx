function Type(props) {
	return (
		<>
			<select
				name="types"
				id={props.idVal}
				onInput={(e) => {
					props.set(e.target.value);
				}}
			>
				<option value="">--</option>
				<option value="Fire">Fire</option>
				<option value="Water">Water</option>
				<option value="Grass">Grass</option>
				<option value="Electric">Electric</option>
				<option value="Flying">Flying</option>
				<option value="Normal">Normal</option>
				<option value="Dark">Dark</option>
				<option value="Psychic">Psychic</option>
				<option value="Fighting">Fighting</option>
				<option value="Ice">Ice</option>
				<option value="Dragon">Dragon</option>
				<option value="Fairy">Fairy</option>
				<option value="Steel">Steel</option>
				<option value="Rock">Rock</option>
				<option value="Ground">Ground</option>
				<option value="Ghost">Ghost</option>
				<option value="Bug">Bug</option>
				<option value="Poison">Poison</option>
			</select>
		</>
	);
}

export default Type;
