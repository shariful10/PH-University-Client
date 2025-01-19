import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import {
	useAddAcademicDepartmentMutation,
	useGetAcademicFacultiesQuery,
} from "@/redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "@/schemas/academicManagement.schema";
import { TAcademicDepartment, TResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const CreateAcademicDepartment = () => {
	const { data: facultiesData } = useGetAcademicFacultiesQuery(undefined);
	const [addAcademicDepartment] = useAddAcademicDepartmentMutation(undefined);

	const facultyOptions =
		facultiesData?.data?.map(({ _id, name }) => ({
			value: _id,
			label: name,
		})) || [];

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const res = (await addAcademicDepartment(
				data
			)) as TResponse<TAcademicDepartment>;

			if (res.error) {
				toast.error(res?.error?.data?.message);
			} else {
				toast.success("Academic department is created successfully!");
			}
		} catch (err) {
			toast.error("Something went wrong! Please try again.");
		}
	};

	return (
		<Flex justify="center" align="center">
			<Col span={6}>
				<PHForm
					onSubmit={onSubmit}
					resolver={zodResolver(academicDepartmentSchema)}
				>
					<PHInput type="text" label="Name" name="name" />
					<PHSelect
						label="Academic Faculty"
						name="academicFaculty"
						options={facultyOptions}
					/>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicDepartment;
