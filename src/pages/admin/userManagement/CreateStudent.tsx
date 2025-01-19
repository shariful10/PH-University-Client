import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

const studentDummyData = {
	student: {
		password: "student123",
		student: {
			name: {
				firstName: "Md. Shariful2",
				middleName: "",
				lastName: "Islam",
			},
			email: "sksf212@gmail.com",
			gender: "male",
			dateOfBirth: "1996-02-10",
			contactNo: "123-456-7890",
			emergencyContactNo: "098-765-4321",
			presentAddress: "123 Main St, Anton, USA",
			permanentAddress: "456 Elm St, Anton, USA",
			guardian: {
				fatherName: "James Doe",
				fatherContactNo: "123-456-7890",
				fatherOccupation: "Engineer",
				motherName: "Jane Doe",
				motherContactNo: "098-765-4321",
				motherOccupation: "Teacher",
			},
			localGuardian: {
				name: "Uncle Bob",
				occupation: "Doctor",
				contactNo: "111-222-3333",
				address: "789 Oak St, Anton, USA",
			},
			bloodGroup: "B+",
			admissionSemester: "676f0e31a052231319e7c659",
			academicDepartment: "676f0ae2a052231319e7c656",
		},
	},
};

const CreateStudent = () => {
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		// console.log(data);

		const formDta = new FormData();
		formDta.append("data", JSON.stringify(data));
		console.log(Object.fromEntries(formDta));
	};

	return (
		<PHForm onSubmit={onSubmit}>
			<PHInput type="text" label="First Name" name="firstName" />
			<PHInput type="text" label="Middle Name" name="middleName" />
			<PHInput type="text" label="Last Name" name="lastName" />
			<Button type="primary" htmlType="submit">
				Submit
			</Button>
		</PHForm>
	);
};

export default CreateStudent;
