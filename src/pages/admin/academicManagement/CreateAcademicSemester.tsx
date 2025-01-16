import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicSemester = () => {
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data);
	};

	return (
		<PHForm onSubmit={onSubmit}>
			<PHInput type="text" name="name" label="label" />
			<Button htmlType="submit">Submit</Button>
		</PHForm>
	);
};

export default CreateAcademicSemester;
