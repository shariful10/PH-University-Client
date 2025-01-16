import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Layout } from "antd";
import { toast } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logOut());
		toast.success("Logout successful!");
		navigate("/login");
	};

	return (
		<Layout style={{ height: "100vh" }}>
			<Sidebar />
			<Layout>
				<Header>
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
				<Footer style={{ textAlign: "center" }}>
					PH University © {new Date().getFullYear()} | Powered by PH University
				</Footer>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
