import { TPHInputProps } from "@/types";
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({ type, name, label }: TPHInputProps) => {
	return (
		<div style={{ marginBottom: "1rem" }}>
			<Controller
				name={name}
				render={({ field }) => (
					<Form.Item label={label}>
						<Input {...field} type={type} id={name} size="large" />
					</Form.Item>
				)}
			/>
		</div>
	);
};

export default PHInput;
