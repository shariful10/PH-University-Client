import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester, TResponseRedux } from "@/types";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: () => ({
				url: "/academic-semesters",
				method: "GET",
			}),
			transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
				console.log("inside redux", response);
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
	}),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
	academicManagementApi;
