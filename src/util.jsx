function upperCase(word) {
	word = word.replaceAll("-", " ");
	const words = [];
	word.split(" ").map((el) =>
		words.push(el.replace(el[0], el[0].toUpperCase()))
	);
	word = words.toString().replaceAll(",", " ");

	return word;
}

export default upperCase;
