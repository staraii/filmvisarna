import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../sass/main.scss";
import App from './App.tsx'

import { loader, doubleLoader } from "./utils/queryService.ts";

import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import HomePage from "./pages/HomePage/HomePage";
import Movies from './pages/Movies/Movies.tsx';
import MovieDetailsPage from './pages/MovieDetailsPage.tsx';
import MovieCalendar from "./components/MovieCalendar/MovieCalendar";
import BookingPage from "./pages/BookingPage";
import Register from "./pages/Register/Register";
import CancelTickets from "./pages/Cancel-Tickets/Cancel-Tickets";
import CancelTicketsLogin from "./pages/Cancel-Tickets-Login/CancelTicketsLogin";
import LoginPage from "./components/Login-pop-up/LoginMobile";
import PasswordReset from "./components/Login-pop-up/passwordReset";
import BookingConfirmationPage from "./pages/BookingConfirmation";





const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    //loader: appLoader(queryClient),
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: doubleLoader(queryClient, ["/api/bookings/homePageMovies", "/api/bookings/homePageScreenings"], ["homePageMovies", "homePageScreenings"]),
        errorElement: <ErrorPage />,
      },
      {
        path: "filmer",
        element: <Movies />,
        loader: loader(queryClient, "/api/bookings/moviesPageMovies", "movies"),
        errorElement: <ErrorPage />,
      },
      {
        path: "filmer/:movieId",
        element: <MovieDetailsPage />,
        loader: loader(queryClient, "/api/moviesDetails/", "movie", "movieId"),
        //loader: doubleLoader(queryClient, ["/api/moviesDetails/", "/api/bookings/homePageScreenings?screeningId="], ["movie", "homePageScreenings"]),
        errorElement: <ErrorPage />,
      },
      {
        path: "bio-kalender",
        element: <MovieCalendar />,
        loader: loader(queryClient, "/api/screenings", "screenings"),
        errorElement: <ErrorPage />,
      },
      {
        path: "boka/:screeningId",
        element: <BookingPage />,
        loader: loader(
          queryClient,
          "/api/screenings/",
          "screening",
          "screeningId"
        ),
        //action: bookingAction(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "avboka",
        element: <CancelTickets />,
        //action: cancelBookingAction(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "loggain",
        element: <LoginPage />,
        //action: loginAction(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "register",
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: "avboka-loggedin",
        element: <CancelTicketsLogin />,
        //loader: userLoader(queryClient),
        //action: userAction(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "forgot-password",
        element: <PasswordReset />,
        //action: passwordAction(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "order-bekraftelse",
        element: <BookingConfirmationPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
