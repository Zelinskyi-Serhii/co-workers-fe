import { axiosBaseQuery } from "@/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface IReview {
  id: number;
  employeeId: string;
  review: string;
  createdAt: Date;
}

interface NewReview extends Omit<IReview, "id" | "createdAt"> {}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllReviews: builder.query<IReview[], { employeeId: string }>({
      query: ({ employeeId }) => {
        return {
          url: `/review/getAll/${employeeId}`,
        };
      },
    }),
    addNewReview: builder.mutation<IReview, NewReview>({
      query: (newReview) => {
        return {
          url: "/review/create",
          method: "POST",
          data: newReview,
        };
      },
    }),
  }),
});

export const { useGetAllReviewsQuery, useAddNewReviewMutation } = reviewApi;
