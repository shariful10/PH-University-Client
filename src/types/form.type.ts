import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TPHInputProps = {
	type: string;
	name: string;
	label?: string;
};

export type TPHSelectProps = {
	label: string;
	name: string;
	options: { value: string; label: string; disabled?: boolean }[] | undefined;
	disabled?: boolean;
	mode?: "multiple" | undefined;
};

export type TFormConfig = {
	defaultValues?: Record<string, any>;
	resolver?: any;
};

export type TFormProps = {
	onSubmit: SubmitHandler<FieldValues>;
	children: ReactNode;
} & TFormConfig;

export type TDatePickerProps = {
	name: string;
	label?: string;
};
