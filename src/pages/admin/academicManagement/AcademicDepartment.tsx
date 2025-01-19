import { useGetAcademicDepartmentsQuery } from "@/redux/features/admin/academicManagement.api";
import { TAcademicDepartmentTableData, TQueryParam } from "@/types";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useMemo, useState } from "react";

const AcademicDepartment = () => {
	const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: departmentData, isFetching } =
		useGetAcademicDepartmentsQuery(params);

	const tableData = departmentData?.data?.map(({ _id, name }) => ({
		key: _id,
		name,
	}));

	const nameFilters = useMemo(() => {
		const names = departmentData?.data?.map(({ name }) => name) || [];
		return [...new Set(names)].map((name) => ({ text: name, value: name }));
	}, [departmentData]);

	const columns: TableColumnsType<TAcademicDepartmentTableData> = [
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

	const onChange: TableProps<TAcademicDepartmentTableData>["onChange"] = (
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
		<Table<TAcademicDepartmentTableData>
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default AcademicDepartment;
