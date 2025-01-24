import { TAcademicSemester } from "./academicManagement.type";

export type TSemester = {
	_id: string;
	academicSemester: TAcademicSemester;
	status: string;
	startDate: string;
	endDate: string;
	minCredit: number;
	maxCredit: number;
	createdAt: string;
	updatedAt: string;
};

export type TRegisteredSemesterData = Pick<
	TSemester,
	"status" | "startDate" | "endDate"
>;

export type TCourse = {
	_id: string;
	title: string;
	prefix: string;
	code: number;
	credits: number;
	preRequisiteCourses: { course: string | null; isDeleted: boolean }[];
	isDeleted: boolean;
};

export type TSemesterStatus = "UPCOMING" | "ONGOING" | "ENDED";

export type TRegistrationSemester = {
	_id: string;
	academicSemester: string;
	status: TSemesterStatus;
	startDate: Date;
	endDate: Date;
	minCredit: number;
	maxCredit: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
};

export type TMenuItem = {
	key: string;
	label?: string;
};

export type TStatusUpdate = {
	key: string;
};
