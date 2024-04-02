import { useState } from "react";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Cell,
	LabelList,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	Legend,
} from "recharts";
const colors = {
	lessThan30: "#f34444",
	lessThan60: "#ff7f0f",
	lessThan90: "#ffdd57",
	lessThan125: "#a0e515",
	lessThan150: "#23cd5e",
	other: "#00c2b8",
};

export default function StatsChart(props) {
	const [chartType, setChartType] = useState("0");

	return (
		<>
			<div
				className="data centerDiv"
				style={{ backgroundColor: "#070f2b" }}
			>
				<select
					name="chartType"
					onInput={(e) => {
						setChartType(e.target.value);
					}}
				>
					<option value="0">Bar Graph</option>
					<option value="1">Radar Graph</option>
				</select>
			</div>

			{chartType === "0" ? (
				<BarChart width={1000} height={400} data={props.data}>
					<XAxis dataKey="stat_name" />
					<YAxis />
					<Bar dataKey="base_stat">
						<LabelList dataKey="base_stat" position="top" />
						{props.data?.map((s, index) => (
							<Cell
								key={`cell-${index}`}
								fill={
									props.data[index].base_stat < 30
										? colors.lessThan30
										: props.data[index].base_stat < 60
										? colors.lessThan60
										: props.data[index].base_stat < 90
										? colors.lessThan90
										: props.data[index].base_stat < 125
										? colors.lessThan125
										: props.data[index].base_stat < 150
										? colors.lessThan150
										: colors.other
								}
							/>
						))}
					</Bar>
				</BarChart>
			) : (
				<RadarChart
					outerRadius={90}
					width={1280}
					height={250}
					data={props.data}
				>
					<PolarGrid />
					<PolarAngleAxis dataKey="stat_name" />
					<PolarRadiusAxis angle={30} domain={[0, props.maxStat]} />
					<Radar
						name="Stats"
						dataKey="base_stat"
						stroke="#8884d8"
						fill="#8884d8"
						fillOpacity={0.6}
					/>
					<Legend />
				</RadarChart>
			)}
		</>
	);
}
