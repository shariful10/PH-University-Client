import StudentBlockModal from "@/components/userManagement/StudentBlockModal";
import { useGetAllStudentsQuery } from "@/redux/features/admin/userManagement.api";
import { TQueryParam, TStudentData } from "@/types";
import {
	Button,
	Pagination,
	Space,
	Table,
	TableColumnsType,
	TableProps,
} from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const StudentData = () => {
	const [page, setPage] = useState<number>(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [params, setParams] = useState<TQueryParam[]>([]);
	const { data: studentData, isFetching } = useGetAllStudentsQuery([
		{ name: "limit", value: 10 },
		{ name: "page", value: page },
		{ name: "sort", value: "id" },
		...params,
	]);

	const metaData = studentData?.meta;

	const tableData = studentData?.data?.map(
		({ _id, fullName, id, email, contactNo }) => ({
			key: _id,
			fullName,
			id,
			email,
			contactNo,
		})
	);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const emailFilters = useMemo(() => {
		const emails = studentData?.data?.map(({ email }) => email) || [];
		return [...new Set(emails)].map((email) => ({ text: email, value: email }));
	}, [studentData]);

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
			filters: emailFilters,
		},
		{
			title: "Contact No.",
			key: "contactNo",
			dataIndex: "contactNo",
			// filters: emailFilters,
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				return (
					<Space>
						<Link to={`/admin/student-data/${item.key}`}>
							<Button color="purple" variant="outlined">
								Details
							</Button>
						</Link>
						<Button color="primary" variant="outlined">
							Update
						</Button>
						<StudentBlockModal
							studentId={item?.key}
							handleOk={handleOk}
							showModal={showModal}
							handleCancel={handleCancel}
							isModalOpen={isModalOpen}
						/>
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

			filters.email?.forEach((item) =>
				queryParams.push({ name: "email", value: item })
			);

			filters.year?.forEach((item) =>
				queryParams.push({ name: "year", value: item })
			);

			setParams(queryParams);
		}
	};

	return (
		<>
			<Table<TStudentData>
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
				onChange={onChange}
				pagination={false}
			/>
			<Pagination
				style={{ marginTop: "10px" }}
				current={page}
				onChange={(value) => setPage(value)}
				pageSize={metaData?.limit}
				total={metaData?.total}
			/>
		</>
	);
};

export default StudentData;
