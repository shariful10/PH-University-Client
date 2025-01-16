import { TPHSelectProps } from "@/types/form.type";
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const PHSelect = ({ label, name, options }: TPHSelectProps) => {
	return (
		<Controller
			name={name}
			render={({ field }) => (
				<Form.Item label={label}>
					<Select style={{ width: "100%" }} {...field} options={options} />
				</Form.Item>
			)}
		/>
	);
};

export default PHSelect;
