import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useLoginMutation } from "@/redux/features/auth/auhApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@/types/redux.type";
import { verifyToken } from "@/utils/verifyToken";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// const { register } = useForm({
	// 	defaultValues: {
	// 		id: "A-0001",
	// 		password: "admin123",
	// 	},
	// });

	const defaultValues = {
		id: "A-0001",
		password: "admin123",
	};

	const [login] = useLoginMutation();

	const onSubmit = async (data: FieldValues) => {
		console.log(data);
		const toastId = toast.loading("Logging in...");
		try {
			const userInfo = {
				id: data.id,
				password: data.password,
			};

			const res = await login(userInfo).unwrap();
			const user = verifyToken(res.data.accessToken) as TUser;
			dispatch(setUser({ user: user, token: res.data.accessToken }));
			toast.success("Login successful!", { id: toastId, duration: 2000 });
			navigate(`/${user?.role}/dashboard`);
		} catch (err) {
			toast.error("Login failed!", { id: toastId, duration: 2000 });
		}
	};

	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
				<PHInput label="Id:" type="text" name="id" />
				<PHInput label="Password:" type="text" name="password" />
				<Button htmlType="submit">Login</Button>
			</PHForm>
		</Row>
	);
};

export default Login;
