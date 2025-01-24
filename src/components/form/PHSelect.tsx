import { TPHSelectProps } from "@/types";
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const PHSelect = ({ label, name, options, mode }: TPHSelectProps) => {
	return (
		<Controller
			name={name}
			render={({ field, fieldState: { error } }) => (
				<Form.Item label={label}>
					<Select
						mode={mode}
						style={{ width: "100%" }}
						{...field}
						options={options}
						size="large"
					/>
					{error && <small style={{ color: "red" }}>{error.message}</small>}
				</Form.Item>
			)}
		/>
	);
};

export default PHSelect;
