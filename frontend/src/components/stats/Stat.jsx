import React, { useState, setState } from "react";
import { DateRes, Genres } from "../api/callAPI";

function Selection() {
	const date = new DateRes();
	const genres = new Genres();
	const [object, setObject] = useState({});
	return (
		<div className="buttons">
			<button
				name="genre"
				onClick={async (e) => {
					const apiResult = await genres.getGenres();
					setObject(apiResult);
				}}
			>
				Genre
			</button>
			<button
				name="day"
				onClick={async (e) => {
					const apiResult = await date.getDaateStat();
					setObject(apiResult);
				}}
			>
				Day
			</button>

			<div>{object.genres}</div>
		</div>
	);
}

export default Selection;
