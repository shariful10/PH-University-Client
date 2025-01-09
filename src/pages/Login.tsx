import { useLoginMutation } from "@/redux/features/auth/auhApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			id: "A-0001",
			password: "admin123",
		},
	});

	const [login] = useLoginMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const userInfo = {
			id: data.id,
			password: data.password,
		};

		const res = await login(userInfo).unwrap();

		const user = verifyToken(res.data.accessToken);

		dispatch(setUser({ user: user, token: res.data.accessToken }));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="id">Id</label>
				<input type="text" id="id" {...register("id")} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="text" id="password" {...register("password")} />
			</div>
			<Button htmlType="submit">Login</Button>
		</form>
	);
};

export default Login;
