function Ability(props) {
	return (
		<>
			<h2>Abilities</h2>
			<table className="AbilityTable Border">
				<thead>
					<tr>
						<th className="Border" scope="col"></th>

						<th scope="col" style={{ width: "20%" }}>
							Name
						</th>
						<th
							className="Border"
							scope="col"
							style={{ width: "80%" }}
						>
							Description
						</th>
					</tr>
				</thead>

				<tbody>
					{props.descriptions?.map((ability, i) => {
						return (
							<tr className="Border" key={i}>
								<th scope="row">
									{ability.isHidden ? "Hidden" : i + 1}
								</th>
								<td className="Border">
									<div>{ability.name}</div>
								</td>
								<td>{ability.effect}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Ability;
