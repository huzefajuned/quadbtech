import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-800">
          Oops! Something went wrong. Please try again later.
        </p>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
