import PHForm from "@/components/form/PHForm";
import PHSelect from "@/components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

const nameOptions = [
	{
		value: "01",
		label: "Autumn",
	},
	{
		value: "02",
		label: "Summer",
	},
	{
		value: "03",
		label: "Fall",
	},
];

const CreateAcademicSemester = () => {
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const semesterData = {
			name: "name",
			code: "code",
		};

		console.log(semesterData);
	};

	return (
		<Flex justify="center" align="center">
			<Col span={6}>
				<PHForm onSubmit={onSubmit}>
					<PHSelect label="Name" name="Name" options={nameOptions} />
					{/* <PHSelect label="Code" name="Code" options={codeOptions} /> */}
					<Button htmlType="submit">Submit</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicSemester;
