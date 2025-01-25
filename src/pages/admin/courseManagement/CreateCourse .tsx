import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import {
	useAddCourseMutation,
	useGetAllCoursesQuery,
} from "@/redux/features/admin/courseManagement";
import { TCourse, TMessage, TResponse } from "@/types";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const CreateCourse = () => {
	const [createCourse] = useAddCourseMutation();
	const { data: courses } = useGetAllCoursesQuery(undefined);
	// const { data: academicSemester } = useGetAllSemestersQuery([
	// 	{ name: "sort", value: "year" },
	// ]);

	const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
		value: item._id,
		label: item.title,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const courseData = {
			...data,
			code: Number(data.code),
			credits: Number(data.credits),
			isDeleted: false,
			preRequisiteCourses: data.preRequisiteCourses
				? data.preRequisiteCourses?.map((item: string) => ({
						course: item,
						isDeleted: false,
				  }))
				: [],
		};

		try {
			const res = (await createCourse(courseData)) as TResponse<
				TCourse & TMessage
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

	return (
		<Flex justify="center" align="center">
			<Col span={6}>
				<PHForm onSubmit={onSubmit}>
					<PHInput type="text" name="title" label="Title" />
					<PHInput type="text" name="prefix" label="Prefix" />
					<PHInput type="number" name="code" label="Code" />
					<PHInput type="number" name="credits" label="Credits" />
					<PHSelect
						mode="multiple"
						options={preRequisiteCoursesOptions}
						name="preRequisiteCourses"
						label="Pre Requisite Courses"
					/>

					<Button htmlType="submit" type="primary">
						Submit
					</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default CreateCourse;
