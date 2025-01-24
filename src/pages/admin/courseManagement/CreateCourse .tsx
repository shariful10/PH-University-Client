import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { useAddRegisteredSemesterMutation } from "@/redux/features/admin/courseManagement";
import { TMessage, TRegistrationSemester, TResponse } from "@/types";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const CreateCourse = () => {
	const [addSemester] = useAddRegisteredSemesterMutation();
	const { data: academicSemester } = useGetAllSemestersQuery([
		{ name: "sort", value: "year" },
	]);

	const academicSemesterOptions = academicSemester?.data?.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const semesterData = {
			...data,
			minCredit: Number(data.minCredit),
			maxCredit: Number(data.maxCredit),
		};

		try {
			const res = (await addSemester(semesterData)) as TResponse<
				TRegistrationSemester & TMessage
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
					<PHInput type="number" name="prefix" label="Prefix" />
					<PHInput type="number" name="code" label="Code" />
					<PHInput type="number" name="Credits" label="Credits" />
					<PHSelect
						mode="multiple"
						options={academicSemesterOptions}
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
