import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <section className="error-section">
      <h1>Ojdå!</h1>
      <p>Ett oväntat fel har inträffat.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </section>
  );
}
