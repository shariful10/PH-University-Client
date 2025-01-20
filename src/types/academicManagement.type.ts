import { TStudent } from "./userManagement.type";

export type TAcademicSemester = {
	_id: string;
	name: string;
	year: number;
	code: string;
	startMonth: string;
	endMonth: string;
	createdAt: string;
	updatedAt: string;
	__v?: number;
};

export type TSemesterData = Pick<
	TAcademicSemester,
	"name" | "year" | "startMonth" | "endMonth"
>;

export type TStudentData = Pick<
	TStudent,
	"fullName" | "id" | "email" | "contactNo"
>;

export type TAcademicFaculty = {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type TAcademicFacultyTableData = Pick<TAcademicDepartment, "name">;

export type TAcademicDepartment = {
	_id: string;
	name: string;
	academicFaculty: TAcademicFaculty;
	createdAt: string;
	updatedAt: string;
};

export type TAcademicDepartmentTableData = Pick<TAcademicDepartment, "name">;
