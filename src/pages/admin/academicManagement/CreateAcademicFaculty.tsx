import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useAddAcademicFacultyMutation } from "@/redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "@/schemas/academicManagement.schema";
import { TAcademicFaculty, TResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const CreateAcademicFaculty = () => {
	const [addAcademicFaculty] = useAddAcademicFacultyMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const res = (await addAcademicFaculty(
				data
			)) as TResponse<TAcademicFaculty>;

			if (res.error) {
				toast.error(res?.error?.data?.message);
			} else {
				toast.success("Academic faculty is created successfully!");
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
					resolver={zodResolver(academicFacultySchema)}
				>
					<PHInput type="text" label="Name" name="name" />
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicFaculty;
