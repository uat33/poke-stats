function Card(props) {
	return (
		<div className="Card">
			<h1>{props.title}</h1>
			<h2>{props.value}</h2>
		</div>
	);
}

export default Card;
