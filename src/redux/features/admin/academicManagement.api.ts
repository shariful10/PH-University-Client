import { baseApi } from "@/redux/api/baseApi";
import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
	TQueryParam,
	TResponseRedux,
} from "@/types";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/academic-semesters",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicSemester: builder.mutation({
			query: (data) => ({
				url: "/academic-semesters/create-academic-semester",
				method: "POST",
				body: data,
			}),
		}),
		getAcademicFaculties: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}
				console.log("args", args);

				return {
					url: "/academic-faculties",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicFaculty: builder.mutation({
			query: (data) => ({
				url: "/academic-faculties/create-academic-faculty",
				method: "POST",
				body: data,
			}),
		}),
		getAcademicDepartments: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/academic-departments",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicDepartment: builder.mutation({
			query: (data) => ({
				url: "/academic-departments/create-academic-department",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllSemestersQuery,
	useAddAcademicSemesterMutation,
	useAddAcademicFacultyMutation,
	useGetAcademicFacultiesQuery,
	useAddAcademicDepartmentMutation,
	useGetAcademicDepartmentsQuery,
} = academicManagementApi;
