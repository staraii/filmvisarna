import { LoaderFunctionArgs } from "react-router-dom";
import reqUtil from "./reqUtil";
import { ActionFunctionArgs } from "react-router-dom";

import { QueryClient, queryOptions } from "@tanstack/react-query";

export type QueryParams = {
  query: string;
  queryName: string;
  //id?: string | BookingProps | undefined;
  id?: string | { [key: string]: string };
};
export type QueryParamsTwo = {
  query: string;
  queryName: string;
  id?: string | BookingProps;
}
type BookingProps = {
  bookingNumber: string;
  email: string;
}
export type DualQueryParams = {
  queryParamsOne: QueryParams;
  queryParamsTwo: QueryParams;
};
export type HomePageMovies = {
  movieId: number;
  movieTitle: string;
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
  theatreName: string;
  occupiedPercent: number;
  ageRating: string;
  slideURL: string;
  posterURL: string;
  subtitles: string;
  spokenLanguage: string;
  posterPreview?: string;
  slidePreview?: string;
};

export async function getQueryData(query: string) {
  try {
    const { data, status } = await reqUtil("GET", query);
    if (status < 300 && data) {
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
      const data = await getQueryData(
        queryParams.id
          ? `${queryParams.query}${queryParams.id}`
          : queryParams.query
      );
      if (data.length === 0) {
        throw new Response("", { status: 404, statusText: "Not found" });
      }
      return data;
    },
  });

export const loader =
  (
    queryClient: QueryClient,
    query: string,
    queryName: string,
    paramName?: string
  ) =>
  async ({ params }: LoaderFunctionArgs) => {
    // query:     url-string for the query, like "/api/movies"
    // queryName:   name of query, used to set the queryKey and check for route query parameters
    const queryParams: QueryParams = {
      query,
      queryName,
    };
    // Check for route query parameter and add it to the queryParams object
    if (params[`${paramName}`]) {
      queryParams.id = params[`${paramName}`];
    }
    // Pre-fetch the data connected to the route before route renders
    await queryClient.ensureQueryData(loaderQuery(queryParams));
    // Return the query parameters object which enables route component to get this through the useLoaderData() hook
    return queryParams;
  };

export const doubleLoader =
  (
    queryClient: QueryClient,
    querys: string[],
    queryNames: string[],
    paramNames?: (string | string[])[]
  ) =>
  async ({ params }: LoaderFunctionArgs) => {
    const queryParamsOne: QueryParams = {
      query: querys[0],
      queryName: queryNames[0],
    };
    const queryParamsTwo: QueryParams = {
      query: querys[1],
      queryName: queryNames[1],
    };

    if (paramNames) {
      if (paramNames[0] !== "") {
        queryParamsOne.id = params[`${paramNames[0]}`];
      }
      if (paramNames[1] instanceof Array) {
        if (paramNames[1][0] && paramNames[1][1]) {
          queryParamsTwo.query = `/api/bookings/fullBookings?bookingNumber=${params["bookingNumber"]}&email=${params["email"]}`
       
        }
      } else if (typeof paramNames[1] === "string" && paramNames[1] !== "") {
        queryParamsTwo.id = params[`${paramNames[1]}`];
      }
    }
    await queryClient.ensureQueryData(loaderQuery(queryParamsOne));
    await queryClient.ensureQueryData(loaderQuery(queryParamsTwo));

    return { queryParamsOne, queryParamsTwo };
  };
export const bookingAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const screeningId = formData.get("screeningId");
  const email = formData.get("email");
  const seatsString = formData.get("seats") as string;
  const seatsArray = seatsString ? JSON.parse(seatsString) : [];

  const ticketTypesString = formData.get("ticketTypes") as string;
  const ticketTypes = ticketTypesString ? JSON.parse(ticketTypesString) : {};
  const ticketsList: number[] = [];

  if (ticketTypes.ticket1) {
    ticketsList.push(...Array(ticketTypes.ticket1).fill(1));
  }
  if (ticketTypes.ticket2) {
    ticketsList.push(...Array(ticketTypes.ticket2).fill(2));
  }
  if (ticketTypes.ticket3) {
    ticketsList.push(...Array(ticketTypes.ticket3).fill(3));
  }

  if (ticketsList.length < seatsArray.length) {
    throw new Error("Tom bokning");
  }
  const formattedSeats = seatsArray.map((seatId: number, index: number) => ({
    seatId,
    ticketTypeId: ticketsList[index],
  }));

  //för tillfället är ticket type satt till 1 för alla, to fix
  const BookingData = {
    screeningId: Number(screeningId),
    email,
    seats: formattedSeats,
  };
  try {
    const { data, status } = await reqUtil(
      "POST",
      "/api/bookings",
      BookingData
    );
    if (status === 201 && data) {
      return { bookingSuccess: true, bookingNumber: data[0].bookingNumber,email };
    } else {
      throw new Response("Booking failed", { status });
    }
  } catch (error) {
    console.error("Error in bookingAction", error);
    return { bookingSuccess: false, error };
  }
};

export const fetchUserBookings = async (email: string) => {
  if (!email) {
    throw new Error("Email is required to fetch bookings.");
  }

  try {
    const response = await fetch(
      `/api/bookings/fullBookings?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${
          errorData.message || "No additional error information."
        }`
      );
    }

    const data = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; 
  }
};

