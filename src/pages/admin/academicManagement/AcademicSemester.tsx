import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { TQueryParam, TSemesterData } from "@/types";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useMemo, useState } from "react";

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

	const nameFilters = useMemo(() => {
		const names = semesterData?.data?.map(({ name }) => name) || [];
		return [...new Set(names)].map((name) => ({ text: name, value: name }));
	}, [semesterData]);

	const yearFilters = useMemo(() => {
		const years = semesterData?.data?.map(({ year }) => year) || [];
		return [...new Set(years)].map((year) => ({ text: year, value: year }));
	}, [semesterData]);

	const columns: TableColumnsType<TSemesterData> = [
		{
			title: "Name",
			dataIndex: "name",
			filters: nameFilters,
		},
		{
			title: "Year",
			dataIndex: "year",
			filters: yearFilters,
		},
		{
			title: "Start Month",
			dataIndex: "startMonth",
		},
		{
			title: "End Month",
			dataIndex: "endMonth",
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<div>
						<Button>Update</Button>
					</div>
				);
			},
		},
	];

	const onChange: TableProps<TSemesterData>["onChange"] = (
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
		<Table<TSemesterData>
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default AcademicSemester;
