export type TPHInputProps = {
	type: string;
	name: string;
	label?: string;
};
export type TPHSelectProps = {
	label: string;
	name: string;
	options: { value: string; label: string; disabled?: boolean }[];
};
