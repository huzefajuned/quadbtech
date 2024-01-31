import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate, useLocation } from "react-router-dom";

const BookTicket = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    name,
    image,
    genres,
    premiered,
    rating,
    status,
    summary,
    officialSite,
  } = state;

  // Function to validate user authentication
  function validateUser() {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        {/* Movie Image */}
        <img
          src={image?.medium}
          alt={name}
          className="w-full h-48 object-cover"
        />

        {/* Movie Details */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-sm mb-2">
            Genres: {genres.join(", ")}
          </p>
          <p className="text-gray-700 text-sm mb-2">Premiered: {premiered}</p>
          <p className="text-gray-700 text-sm mb-2">
            Rating: {rating?.average}
          </p>
          <p className="text-gray-700 text-sm mb-2">Status: {status}</p>
        </div>

        {/* User Info */}
        <div className="px-6 py-2 border-t border-gray-200">
          <p className="text-gray-700 text-sm mb-2">Booked By: {user.email}</p>
          <p className="text-gray-700 text-sm">Name: {user.name}</p>
        </div>

        {/* Book Ticket Button */}
        <div className="px-6 py-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => alert(`Ticket booked for ${name}`)}
          >
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
