import { TFormConfig, TFormProps } from "@/types/form.type";
import { Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";

const PHForm = ({
	onSubmit,
	children,
	defaultValues,
	resolver,
}: TFormProps) => {
	const formConfig: TFormConfig = {};

	if (defaultValues) {
		formConfig["defaultValues"] = defaultValues;
	}

	if (resolver) {
		formConfig["resolver"] = resolver;
	}

	const methods = useForm(formConfig);

	return (
		<FormProvider {...methods}>
			<Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
				{children}
			</Form>
		</FormProvider>
	);
};

export default PHForm;
