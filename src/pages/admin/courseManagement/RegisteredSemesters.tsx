import { useGetAllRegisteredSemestersQuery } from "@/redux/features/admin/courseManagement";
import { TRegisteredSemesterData } from "@/types";
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";

const items = [
	{
		label: "Upcoming",
		key: "UPCOMING",
	},
	{
		label: "Ongoing",
		key: "ONGOING",
	},
	{
		label: "Ended",
		key: "ENDED",
	},
];

const RegisteredSemester = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: semesterData, isFetching } =
		useGetAllRegisteredSemestersQuery(undefined);

	const tableData = semesterData?.data?.map(
		({ _id, academicSemester, startDate, endDate, status }) => ({
			key: _id,
			name: academicSemester.name,
			status,
			startDate: moment(new Date(startDate)).format("MMMM YYYY"),
			endDate: moment(new Date(endDate)).format("MMMM YYYY"),
		})
	);

	const handleStatusDropdown = (data) => {
		console.log("data", data);
	};

	const menuProps = {
		items,
		onClick: handleStatusDropdown,
	};

	// const nameFilters = useMemo(() => {
	// 	const names = semesterData?.data?.map(({ name }) => name) || [];
	// 	return [...new Set(names)].map((name) => ({ text: name, value: name }));
	// }, [semesterData]);

	// const yearFilters = useMemo(() => {
	// 	const years = semesterData?.data?.map(({ year }) => year) || [];
	// 	return [...new Set(years)].map((year) => ({ text: year, value: year }));
	// }, [semesterData]);

	const columns: TableColumnsType<TRegisteredSemesterData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (item) => {
				let color;
				if (item === "UPCOMING") {
					color = "blue";
				} else if (item === "ONGOING") {
					color = "green";
				} else {
					color = "red";
				}
				return <Tag color={color}>{item}</Tag>;
			},
		},
		{
			title: "Start Date",
			key: "startDate",
			dataIndex: "startDate",
		},
		{
			title: "End Date",
			key: "endDate",
			dataIndex: "endDate",
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<Dropdown menu={menuProps}>
						<Button>Update</Button>
					</Dropdown>
				);
			},
		},
	];

	// const onChange: TableProps<TSemesterData>["onChange"] = (
	// 	_pagination,
	// 	filters,
	// 	_sorter,
	// 	extra
	// ) => {
	// 	if (extra.action === "filter") {
	// 		const queryParams: TQueryParam[] = [];

	// 		filters.name?.forEach((item) =>
	// 			queryParams.push({ name: "name", value: item })
	// 		);

	// 		filters.year?.forEach((item) =>
	// 			queryParams.push({ name: "year", value: item })
	// 		);

	// 		setParams(queryParams);
	// 	}
	// };

	return (
		<Table<TRegisteredSemesterData>
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			// onChange={onChange}
		/>
	);
};

export default RegisteredSemester;
