import { useGetAllStudentsQuery } from "@/redux/features/admin/userManagement.api";
import { TQueryParam, TStudentData } from "@/types";
import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

const StudentData = () => {
	const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: studentData, isFetching } = useGetAllStudentsQuery(params);

	const tableData = studentData?.data?.map(({ _id, fullName, id, email }) => ({
		key: _id,
		fullName,
		id,
		email,
	}));

	// const nameFilters = useMemo(() => {
	// 	const names = studentData?.data?.map(({ name }) => name) || [];
	// 	return [...new Set(names)].map((name) => ({ text: name, value: name }));
	// }, [studentData]);

	// const yearFilters = useMemo(() => {
	// 	const years = studentData?.data?.map(({ year }) => year) || [];
	// 	return [...new Set(years)].map((year) => ({ text: year, value: year }));
	// }, [studentData]);

	const columns: TableColumnsType<TStudentData> = [
		{
			title: "Name",
			key: "fullName",
			dataIndex: "fullName",
			// filters: nameFilters,
		},
		{
			title: "Roll No.",
			key: "id",
			dataIndex: "id",
			// filters: nameFilters,
		},
		{
			title: "Email Address",
			key: "email",
			dataIndex: "email",
			// filters: nameFilters,
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<Space>
						<Button color="purple" variant="outlined">
							Details
						</Button>
						<Button color="primary" variant="outlined">
							Update
						</Button>
						<Button color="danger" variant="outlined">
							Block
						</Button>
					</Space>
				);
			},
			width: "10%",
		},
	];

	const onChange: TableProps<TStudentData>["onChange"] = (
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
		<Table<TStudentData>
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default StudentData;
