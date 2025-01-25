import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import {
	useAddFacultiesMutation,
	useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagement";
import { useGetAllFacultiesQuery } from "@/redux/features/admin/userManagement.api";
import {
	TCourseColumnData,
	TFaculty,
	TFacultyInfoProps,
	TMessage,
	TResponse,
} from "@/types";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const Courses = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

	const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

	const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
		key: _id,
		title,
		code: `${prefix}${code}`,
	}));

	const columns = [
		{
			title: "Title",
			key: "title",
			dataIndex: "title",
		},
		{
			title: "Code",
			key: "code",
			dataIndex: "code",
		},
		{
			title: "Action",
			key: "x",
			render: (item: TCourseColumnData) => {
				console.log(item.key);
				return <AddFacultyModal facultyInfo={item} />;
			},
		},
	];

	// const onChange: TableProps<TCourseTableData>['onChange'] = (
	//   _pagination,
	//   filters,
	//   _sorter,
	//   extra
	// ) => {
	//   if (extra.action === 'filter') {
	//     const queryParams: TQueryParam[] = [];
	//     setParams(queryParams);
	//   }
	// };

	return (
		<Table
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			// onChange={onChange}
		/>
	);
};

const AddFacultyModal = ({ facultyInfo }: TFacultyInfoProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
	const [addFaculties] = useAddFacultiesMutation();

	const facultiesOption = facultiesData?.data?.map((item) => ({
		value: item._id,
		label: item.fullName,
	}));

	const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
		const facultyData = {
			courseId: facultyInfo.key,
			data,
		};

		try {
			const res = (await addFaculties(facultyData)) as TResponse<
				TFaculty & TMessage
			>;

			if (res.error) {
				toast.error(res.error.data.message);
			} else {
				toast.success(res?.data!.message);
			}
		} catch (error) {
			toast.error("Failed to assign faculties!");
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button onClick={showModal}>Add Faculty</Button>
			<Modal
				title="Basic Modal"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<PHForm onSubmit={handleSubmit}>
					<PHSelect
						mode="multiple"
						options={facultiesOption}
						name="faculties"
						label="Faculty"
					/>
					<Button htmlType="submit" type="primary">
						Submit
					</Button>
				</PHForm>
			</Modal>
		</>
	);
};

export default Courses;
