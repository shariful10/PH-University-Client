import { useGetAllStudentsQuery } from "@/redux/features/admin/userManagement.api";
import { Button, Modal } from "antd";

type TStudentBlockModal = {
	studentId: string;
	showModal: () => void;
	handleOk: () => void;
	isModalOpen: boolean;
	handleCancel: () => void;
};

const StudentBlockModal = ({
	studentId,
	handleOk,
	showModal,
	isModalOpen,
	handleCancel,
}: TStudentBlockModal) => {
	const { data: studentData } = useGetAllStudentsQuery(undefined);
	const student = studentData?.data?.find(
		(student) => student._id === studentId
	);

	return (
		<>
			<Button onClick={showModal} color="danger" variant="outlined">
				Block
			</Button>
			<Modal
				title="Are you sure you want to block this student!"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<h3>Name: {student?.fullName}</h3>
				<p>Role No: {student?.id}</p>
				<p>Email: {student?.email}</p>
			</Modal>
		</>
	);
};

export default StudentBlockModal;
