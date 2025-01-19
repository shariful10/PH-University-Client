import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from ".";

export type TName = {
	_id: string;
	lastName: string;
	firstName: string;
	middleName: string;
};

export type TGuardian = {
	_id: string;
	fatherName: string;
	motherName: string;
	motherContactNo: string;
	fatherContactNo: string;
	fatherOccupation: string;
	motherOccupation: string;
};

export type TLocalGuardian = {
	_id: string;
	name: string;
	address: string;
	contactNo: string;
	occupation: string;
};

export type TStudent = {
	id: string;
	_id: string;
	user: TUser;
	name: TName;
	email: string;
	gender: string;
	fullName: string;
	contactNo: string;
	bloodGroup: string;
	profileImg: string;
	isDeleted: boolean;
	guardian: TGuardian;
	dateOfBirth: string;
	presentAddress: string;
	permanentAddress: string;
	emergencyContactNo: string;
	localGuardian: TLocalGuardian;
	academicFaculty: TAcademicFaculty;
	admissionSemester: TAcademicSemester;
	academicDepartment: TAcademicDepartment;
};

export type TUser = {
	id: string;
	_id: string;
	role: string;
	email: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	isDeleted: boolean;
	needsPasswordChange: boolean;
	__v: number;
};
