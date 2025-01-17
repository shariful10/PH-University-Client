import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { TTableData } from "@/types";
import { Table, TableColumnsType, TableProps } from "antd";

const AcademicSemester = () => {
	const { data: semesterData } = useGetAllSemestersQuery([
		{ name: "year", value: 2025 },
	]);

	const tableData = semesterData?.data?.map(
		({ _id, name, year, startMonth, endMonth }) => ({
			_id,
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
					text: "Joe",
					value: "Joe",
				},
				{
					text: "Category 1",
					value: "Category 1",
				},
				{
					text: "Category 2",
					value: "Category 2",
				},
			],
		},
		{
			title: "Year",
			dataIndex: "year",
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
		pagination,
		filters,
		sorter,
		extra
	) => {
		console.log(filters);
	};

	return (
		<Table<TTableData>
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default AcademicSemester;
