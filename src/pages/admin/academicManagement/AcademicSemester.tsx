import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { TQueryParam, TTableData } from "@/types";
import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

const AcademicSemester = () => {
	const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

	const tableData = semesterData?.data?.map(
		({ _id, name, year, startMonth, endMonth }) => ({
			key: _id,
			name,
			year,
			startMonth,
			endMonth,
		})
	);

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
			filters: [
				{
					text: "Autumn",
					value: "Autumn",
				},
				{
					text: "Summer",
					value: "Summer",
				},
				{
					text: "Fall",
					value: "Fall",
				},
			],
		},
		{
			title: "Year",
			dataIndex: "year",
			filters: [
				{
					text: 2025,
					value: 2025,
				},
				{
					text: 2026,
					value: 2026,
				},
				{
					text: 2027,
					value: 2027,
				},
			],
		},
		{
			title: "Start Month",
			dataIndex: "startMonth",
		},
		{
			title: "End Month",
			dataIndex: "endMonth",
		},
	];

	// const data: DataType[] = [
	// 	{
	// 		key: "1",
	// 		name: "John Brown",
	// 		age: 32,
	// 		address: "New York No. 1 Lake Park",
	// 	},
	// 	{
	// 		key: "2",
	// 		name: "Jim Green",
	// 		age: 42,
	// 		address: "London No. 1 Lake Park",
	// 	},
	// 	{
	// 		key: "3",
	// 		name: "Joe Black",
	// 		age: 32,
	// 		address: "Sydney No. 1 Lake Park",
	// 	},
	// 	{
	// 		key: "4",
	// 		name: "Jim Red",
	// 		age: 32,
	// 		address: "London No. 2 Lake Park",
	// 	},
	// ];

	const onChange: TableProps<TTableData>["onChange"] = (
		_pagination,
		filters,
		_sorter,
		extra
	) => {
		if (extra.action === "filter") {
			const queryParams: TQueryParam[] = [];

			filters.name?.forEach((item) =>
				queryParams.push({ name: "name", value: item })
			);

			filters.year?.forEach((item) =>
				queryParams.push({ name: "year", value: item })
			);

			setParams(queryParams);
		}
	};

	return (
		<Table<TTableData>
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default AcademicSemester;
