import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester, TResponseRedux } from "@/types";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				params.append(args[0].name, args[0].value);

				return {
					url: "/academic-semesters",
					method: "GET",
					params: params,
				};
			},
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
