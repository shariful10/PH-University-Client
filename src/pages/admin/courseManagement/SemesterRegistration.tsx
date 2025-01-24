import PHDatePicker from "@/components/form/PHDatePicker";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import { semesterStatusOptions } from "@/constants/semester";
import { useGetAllSemestersQuery } from "@/redux/features/admin/academicManagement.api";
import { useAddRegisteredSemesterMutation } from "@/redux/features/admin/courseManagement";
import { TMessage, TRegistrationSemester, TResponse } from "@/types";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const SemesterRegistration = () => {
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
					<PHSelect
						label="Academic Semester"
						name="academicSemester"
						options={academicSemesterOptions}
					/>

					<PHSelect
						name="status"
						label="Status"
						options={semesterStatusOptions}
					/>
					<PHDatePicker name="startDate" label="Start Date" />
					<PHDatePicker name="endDate" label="End Date" />
					<PHInput type="number" name="minCredit" label="Min Credit" />
					<PHInput type="number" name="maxCredit" label="Max Credit" />

					<Button htmlType="submit" type="primary">
						Submit
					</Button>
				</PHForm>
			</Col>
		</Flex>
	);
};

export default SemesterRegistration;
