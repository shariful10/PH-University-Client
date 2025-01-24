import {
	useGetAllRegisteredSemestersQuery,
	useUpdateRegisteredSemesterMutation,
} from "@/redux/features/admin/courseManagement";
import {
	TMenuItem,
	TMessage,
	TRegisteredSemesterData,
	TResponse,
	TSemesterStatus,
	TStatusUpdate,
} from "@/types";
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";

const items: TMenuItem[] = [
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
	const [semesterId, setSemesterId] = useState("");
	const { data: semesterData, isFetching } =
		useGetAllRegisteredSemestersQuery(undefined);
	const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

	const tableData = semesterData?.data?.map(
		({ _id, academicSemester, startDate, endDate, status }) => ({
			key: _id,
			name: academicSemester.name,
			status,
			startDate: moment(new Date(startDate)).format("MMMM YYYY"),
			endDate: moment(new Date(endDate)).format("MMMM YYYY"),
		})
	);

	const handleStatusUpdate = async ({ key }: TStatusUpdate) => {
		const updateData = {
			id: semesterId,
			data: { status: key },
		};

		try {
			const res = (await updateSemesterStatus(updateData)) as TResponse<
				TSemesterStatus & TMessage
			>;

			if (res.error) {
				toast.error(res.error.data.message);
			} else {
				toast.success(res?.data!.message);
			}
		} catch (err) {
			toast.error("Something went wrong");
		}
	};

	const menuProps = {
		items,
		onClick: handleStatusUpdate,
	};

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
			render: (item) => {
				return (
					<Dropdown menu={menuProps} trigger={["click"]}>
						<Button onClick={() => setSemesterId(item?.key)}>Update</Button>
					</Dropdown>
				);
			},
		},
	];

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
