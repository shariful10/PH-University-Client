import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { monthOptions } from "@/constants/global";
import { semesterOptions, yearOptions } from "@/constants/semester";
import { useAddAcademicSemesterMutation } from "@/redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "@/schemas/academicManagement.schema";
import { TAcademicSemester, TResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const CreateAcademicSemester = () => {
	const [addAcademicSemester] = useAddAcademicSemesterMutation();
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const name = semesterOptions[Number(data.name) - 1]?.label;

		const semesterData = {
			name,
			code: data.name,
			year: data.year,
			startMonth: data.startMonth,
			endMonth: data.endMonth,
		};

		try {
			const res = (await addAcademicSemester(
				semesterData
			)) as TResponse<TAcademicSemester>;

			if (res.error) {
				toast.error(res.error.data.message);
			} else {
				toast.success("Academic semester created successfully!");
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
					resolver={zodResolver(academicSemesterSchema)}
				>
					<PHSelect label="Name" name="name" options={semesterOptions} />
					<PHSelect label="Year" name="year" options={yearOptions} />
					<PHSelect
						label="Start Month"
						name="startMonth"
						options={monthOptions}
					/>
					<PHSelect label="End Month" name="endMonth" options={monthOptions} />
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicSemester;
