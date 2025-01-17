import { baseApi } from "@/redux/api/baseApi";
import { TAcademicSemester, TResponseRedux } from "@/types";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item) => {
						params.append(item.name, item.value);
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
	}),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
	academicManagementApi;
