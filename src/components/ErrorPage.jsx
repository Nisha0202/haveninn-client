import { Helmet } from "react-helmet";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="container lexend">
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="404 error" className="w-64 h-64 mb-8" />
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p className="text-wrap text-center">Oops! The page you're looking for</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <div className="my-6 text-blue-600">
        <Link to={'/'}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Back to home</button>
        </Link>
      </div>
    </div>
  </div>
  );
}
