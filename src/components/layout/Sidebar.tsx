import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import { facultyPaths } from "@/routes/faculty.routes";
import { studentPaths } from "@/routes/student.routes";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const userRole = {
	ADMIN: "admin",
	FACULTY: "faculty",
	STUDENT: "student",
};

const Sidebar = () => {
	const user = useAppSelector(selectCurrentUser);

	let sidebarItems;
	switch (user?.role) {
		case userRole.ADMIN:
			sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
			break;
		case userRole.FACULTY:
			sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
			break;
		case userRole.STUDENT:
			sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
			break;
		default:
			break;
	}

	return (
		<Sider breakpoint="lg" collapsedWidth="0">
			<div
				style={{
					color: "white",
					height: "4rem",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h1>PH University</h1>
			</div>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={["4"]}
				items={sidebarItems}
			/>
		</Sider>
	);
};

export default Sidebar;
