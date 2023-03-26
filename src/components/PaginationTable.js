import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import { useMemo } from "react";
import "./table.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

const PaginationTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	//const columns = useMemo(() => GROUPED_COLUMNS, []);
	const data = useMemo(() => MOCK_DATA, []);
	const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//footerGroups,
		// rows,
		page,
		pageOptions,
		nextPage,
		canNextPage,
		previousPage,
		canPreviousPage,
		gotoPage,
		pageCount,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
		},

		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex } = state;

	return (
		<>
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									<span>
										{column.isSorted ? (column.isSortedDesc ? "⬇️" : "⬆️") : ""}
									</span>
									<div>{column.canFilter ? column.render("Filter") : null}</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
								))}
							</tr>
						);
					})}
				</tbody>
				{/* <tfoot>
					{footerGroups.map((footerGroup) => (
						<tr {...footerGroup.getFooterGroupProps()}>
							{footerGroup.headers.map((column) => (
								<th {...column.getFooterProps()}>{column.render("Footer")}</th>
							))}
						</tr>
					))}
				</tfoot> */}
			</table>
			<div>{`Page : ${pageIndex + 1} Of ${pageOptions.length}`}</div>
			<div>
				Go to Page:{" "}
				<input
					type='number'
					defaultValue={pageIndex + 1}
					onChange={(e) => {
						const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
						gotoPage(pageNumber);
					}}
                    style={{width:"50px"}}
				/>
			</div>
			<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
				{"<<"}
			</button>
			<button onClick={() => previousPage()} disabled={!canPreviousPage}>
				Previous
			</button>
			<button onClick={() => nextPage()} disabled={!canNextPage}>
				Next
			</button>
			<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
				{">>"}
			</button>
		</>
	);
};

export default PaginationTable;
