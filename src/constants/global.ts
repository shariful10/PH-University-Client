export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const genders = ["Male", "Female", "Other"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const monthOptions = monthNames.map((name) => ({
	value: name,
	label: name,
}));

export const genderOptions = genders.map((item) => ({
	value: item.toLowerCase(),
	label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
	value: item,
	label: item,
}));
