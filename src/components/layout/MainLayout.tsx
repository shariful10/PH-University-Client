import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const { Header, Content } = Layout;

const MainLayout = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logOut());
	};

	return (
		<Layout style={{ height: "100%" }}>
			<Sidebar />
			<Layout>
				<Header style={{ position: "sticky", top: 0, zIndex: 1 }}>
					<Button onClick={handleLogout}>Logout</Button>
				</Header>
				<Content style={{ margin: "24px 16px 0" }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
						}}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
