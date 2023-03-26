import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

/* Simple w/o debouncing : const GlobalFilter = ({ filter, setFilter }) => {
	return (
		<span>
			Search :{" "}
			<input
				type='text'
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</span>
	);
}; */

const GlobalFilter = ({ filter, setFilter }) => {
	const [value, setValue] = useState(filter);
	const onChange = useAsyncDebounce((value) => {
		setFilter(value || undefined);
	}, 1000);
	return (
		<span>
			Search :{" "}
			<input
				type='text'
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
			/>
		</span>
	);
};

export default GlobalFilter;
