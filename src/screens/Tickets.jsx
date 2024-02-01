import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const Tickets = () => {
  const navigate = useNavigate();
  const { bookings, getBookings } = useAuth();
  console.log("bookings iss", bookings);
  /**
   * show message for the tickets
   */

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={() => navigate("/")}
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        ◀ Go Back
      </button>
      <h2 className="text-2xl font-bold mb-4  text-center p-2  rounded-xl text-white">
        Your Tickets 🥳🥳🥳
      </h2>
      {bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((ticket, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Movie Image */}
              <img
                src={ticket.movie.image}
                alt={ticket.movie.name}
                className="w-full h-48 object-cover"
              />

              {/* Ticket Details */}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {ticket.movie.name}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  Date: {ticket.date}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  Genres: {ticket.movie.genres.join(", ")}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  Premiered: {ticket.movie.premiered}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  User: {ticket.user.name}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  Email: {ticket.user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" p-6 rounded-lg h-[80vh] flex flex-col justify-center items-center">
          <p className="text-white text-center font-bold text-2xl mb-4">
            No tickets booked yet 😔
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1f2544] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md border-2"
          >
            Book Now ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Tickets;
