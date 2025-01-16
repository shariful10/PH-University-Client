import { ReactNode } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

type TFormProps = {
	onSubmit: (data: FieldValues) => void;
	children: ReactNode;
};

const PHForm = ({ onSubmit, children }: TFormProps) => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default PHForm;
