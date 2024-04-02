import {
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ScatterChart,
	Scatter,
} from "recharts";
import { Link } from "react-router-dom";
import "../App";

function TypeBST(props) {
	return (
		<div className="centerDiv">
			<ScatterChart
				width={730}
				height={250}
				margin={{
					top: 20,
					right: 20,
					bottom: 10,
					left: 10,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" fill="" />
				<XAxis dataKey="height" type="number" name="height" unit="m" />
				<YAxis dataKey="weight" type="number" name="weight" unit="kg" />

				<Tooltip cursor={{ strokeDasharray: "3 3" }} />
				<Legend />

				<Link></Link>
				<Scatter
					name="Height vs Weight"
					data={props.data}
					fill="#8884d8"
				/>
			</ScatterChart>
		</div>
	);
}

export default TypeBST;
