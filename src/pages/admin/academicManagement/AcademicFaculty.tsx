import { useGetAcademicFacultiesQuery } from "@/redux/features/admin/academicManagement.api";
import { TAcademicFacultyTableData, TQueryParam } from "@/types";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useMemo, useState } from "react";

const AcademicFaculty = () => {
	const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: facultiesData, isFetching } =
		useGetAcademicFacultiesQuery(params);

	const tableData = facultiesData?.data?.map(({ _id, name }) => ({
		key: _id,
		name,
	}));

	const nameFilters = useMemo(() => {
		const names = facultiesData?.data?.map(({ name }) => name) || [];
		return [...new Set(names)].map((name) => ({ text: name, value: name }));
	}, [facultiesData]);

	const columns: TableColumnsType<TAcademicFacultyTableData> = [
		{
			title: "Name",
			dataIndex: "name",
			filters: nameFilters,
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

	const onChange: TableProps<TAcademicFacultyTableData>["onChange"] = (
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

			setParams(queryParams);
		}
	};

	return (
		<Table<TAcademicFacultyTableData>
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default AcademicFaculty;
