import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../sass/main.scss";
import App from "./App.tsx";

import { loader, doubleLoader, bookingAction } from "./utils/queryService.ts";

import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import HomePage from "./pages/HomePage/HomePage";
import Movies from "./pages/Movies/Movies.tsx";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.tsx";
import MovieCalendar from "./components/MovieCalendar/MovieCalendar";
import BookingPage from "./pages/BookingPage/BookingPage.tsx";
import Register from "./pages/Register/Register";
import CancelTickets from "./pages/Cancel-Tickets/Cancel-Tickets";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import PasswordReset from "./pages/LoginPage/passwordReset";
import BookingConfirmationPage from "./pages/BookingConfimationPage/BookingConfirmation.tsx";
import MinProfil from "./pages/myProfile/myProfile.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { AuthProvider } from "./utils/authContext.tsx";

import Admin from "./pages/Admin/Admin.tsx";
import AdminMain from "./pages/Admin/components/AdminMain/AdminMain.tsx";
import AdminMovies from "./pages/Admin/components/AdminMovies/AdminMovies.tsx";
import EditMovie from "./pages/Admin/components/EditMovie/EditMovie.tsx";
import NewMovie from "./pages/Admin/components/NewMovie/NewMovie.tsx";
import Tickets from "./pages/Admin/components/Tickets/Tickets.tsx";
import BookingStatus from "./pages/Admin/components/BookingStatus/BookingStatus.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: doubleLoader(
          queryClient,
          ["/api/bookings/homePageMovies", "/api/bookings/homePageScreenings"],
          ["homePageMovies", "homePageScreeings"]
        ),
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
        errorElement: <ErrorPage />,
      },
      {
        path: "bio-kalender",
        element: <MovieCalendar />,
        loader: loader(queryClient, "/api/screenings/all", "screenings"),
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
        action: bookingAction,
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
        path: "forgot-password",
        element: <PasswordReset />,
        //action: passwordAction(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "/boka/:screeningId/order-bekraftelse/:bookingNumber/:email",
        loader: doubleLoader(
          queryClient,
          ["/api/screenings/", "/api/screenings/booking/"],
          ["screening", "booking"],
          ["screeningId", ["bookingNumber", "email"]],
        ),

        element: <BookingConfirmationPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profil",
        element: (
          <ProtectedRoute>
            <MinProfil />
          </ProtectedRoute>
        ),

        errorElement: <ErrorPage />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute adminOnly={true}>
        <Admin />
      </ProtectedRoute>
    ),

    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminMain />,
        errorElement: <ErrorPage />,
      },
      {
        path: "filmer",
        loader: loader(queryClient, "/api/bookings/moviesList", "movies"),
        element: <AdminMovies />,
        errorElement: <ErrorPage />,
      },
      {
        path: "film/:id",
        loader: loader(
          queryClient,
          "/api/bookings/fullMovies?id=",
          "movie",
          "id"
        ),
        element: <EditMovie />,
        errorElement: <ErrorPage />,
      },
      {
        path: "film/ny",
        element: <NewMovie />,
        errorElement: <ErrorPage />,
      },
      {
        path: "biljetter",
        element: <Tickets />,
        errorElement: <ErrorPage />,
      },
      {
        path: "bokningar/:bookingNumber",
        loader: loader(
          queryClient,
          "/api/bookings/fullBookings?bookingNumber=",
          "bookings",
          "bookingNumber"
        ),
        element: <BookingStatus />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
