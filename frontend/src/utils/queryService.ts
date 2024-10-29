import { LoaderFunctionArgs } from "react-router-dom";
import reqUtil from "./reqUtil";
import {
  QueryClient,
  queryOptions,
} from "@tanstack/react-query";

export type QueryParams = {
  query: string;
  queryName: string;
  id?: string;
}
export type DualQueryParams = {
  queryParamsOne: QueryParams;
  queryParamsTwo: QueryParams;
}
export type HomePageMovies = {
  id: number;
  title: string;
  createdAt: string;
  categories: string;
  slideURL: string;
  posterURL: string;
  releaseYear: string;
};
export type HomePageScreenings = {
  screeningId: number;
  movieId: number;
  movieTitle: string;
  dateTime: string;
  dayName: string;
  day: number;
  month: number;
  week: number;
  time: string;
  theatreName: string;
  occupiedPercent: number;
  ageRating: string;
  slideURL: string;
  posterURL: string;
  subtitles: string;
  spokenLanguage: string;
};


export async function getQueryData(query: string) {
  try {
    const { data, status } = await reqUtil("GET", query);
    if (status === 200 && data) {
      return data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const loaderQuery = (queryParams: QueryParams) =>
  queryOptions({
    // Set the queryKey, unique to this fetch, which enables control of cached data and revalidation
    queryKey: [queryParams.queryName, queryParams.query, queryParams.id],
    queryFn: async () => {
      // Call function for fetching data
      const data = await getQueryData(queryParams.id ? `${queryParams.query}${queryParams.id}` : queryParams.query);
      if (data.length === 0) {
        throw new Response("", { status: 404, statusText: "Not found" });
      }
      return data;
    },
  });

export const loader = (queryClient: QueryClient, query: string, queryName: string, paramName?: string) => async ({ params }: LoaderFunctionArgs) => {
  // query:     url-string for the query, like "/api/movies"
  // queryName:   name of query, used to set the queryKey and check for route query parameters
  const queryParams: QueryParams = {
    query,
    queryName,
  }
  // Check for route query parameter and add it to the queryParams object
  if (params[`${paramName}`]) {
    queryParams.id = params[`${paramName}`];
  }
  // Pre-fetch the data connected to the route before route renders
  await queryClient.ensureQueryData(loaderQuery(queryParams));
  // Return the query parameters object which enables route component to get this through the useLoaderData() hook
  return queryParams;
};

export const doubleLoader = (queryClient: QueryClient, querys: string[], queryNames: string[], paramNames?: string[]) => async ({ params }: LoaderFunctionArgs) => {
  const queryParamsOne: QueryParams = {
    query: querys[0],
    queryName: queryNames[0],
  }
  const queryParamsTwo: QueryParams = {
    query: querys[1],
    queryName: queryNames[1],
  }
  if (paramNames) {
    if (paramNames[0] !== "") {queryParamsOne.id = params[`${paramNames[0]}`]}
    if(paramNames[1] !== ""){ queryParamsTwo.id = params[`${paramNames[1]}`]}
  }
  await queryClient.ensureQueryData(loaderQuery(queryParamsOne));
  await queryClient.ensureQueryData(loaderQuery(queryParamsTwo))
  return {queryParamsOne, queryParamsTwo}
}