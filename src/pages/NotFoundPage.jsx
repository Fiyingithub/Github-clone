import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-bold text-gray-700">404</h1>
        <div className="w-16 h-1 mx-auto bg-blue-500 my-4"></div>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          {`Sorry, the page you are looking for doesn't exist or has been moved.`}
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md shadow-md transition duration-150 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;