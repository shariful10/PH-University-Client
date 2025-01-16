import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { monthOptions } from "@/constants/global";
import { semesterOptions } from "@/constants/semester";
import { useAddAcademicSemesterMutation } from "@/redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "@/schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({
	value: String(currentYear + number),
	label: String(currentYear + number),
}));

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
			console.log(semesterData);
			const res = await addAcademicSemester(semesterData).unwrap();
			console.log(res);
		} catch (err) {
			console.log(err);
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
					<Button htmlType="submit">Submit</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicSemester;
