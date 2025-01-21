export const semesterOptions = [
	{
		value: "01",
		label: "Autumn",
	},
	{
		value: "02",
		label: "Summer",
	},
	{
		value: "03",
		label: "Fall",
	},
];

const currentYear = new Date().getFullYear();

export const yearOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => ({
	value: String(currentYear + number),
	label: String(currentYear + number),
}));

export const semesterStatusOptions = [
	{ value: "UPCOMING", label: "Upcoming" },
	{ value: "ONGOING", label: "Ongoing" },
	{ value: "ENDED", label: "Ended" },
];
