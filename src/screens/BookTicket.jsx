import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BookTicket = () => {
  const { isLoggedIn, user } = useAuth();
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedName, setEditedName] = useState(user?.name || "");
  const [selectedDate, setSelectedDate] = useState(""); // State to store selected date
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, image, genres, premiered, rating, status } = state;

  // Function to validate user authentication
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Function to book a ticket
  function onBookTicket() {
    // Create ticket object
    const ticket = {
      movie: {
        name,
        image: image?.medium,
        genres,
        premiered,
        rating: rating?.average,
        status,
      },
      user: {
        name: editedName,
        email: editedEmail,
      },
      date: selectedDate,
    };

    // Retrieve existing bookings from local storage
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    // Save new ticket in bookings array
    const updatedBookings = [...existingBookings, ticket];

    // Save updated bookings array in local storage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Alert successful booking
    setTimeout(() => {
      toast.success("Ticket booked successfully!");
      navigate("/tickets");
    }, 10);
  }

  // Return null if not authenticated
  if (!isLoggedIn) return null;

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
            Genres: {genres?.join(", ")}
          </p>
          <p className="text-gray-700 text-sm mb-2">Premiered: {premiered}</p>
          <p className="text-gray-700 text-sm mb-2">
            Rating: {rating?.average}
          </p>
          <p className="text-gray-700 text-sm mb-2">Status: {status}</p>
        </div>

        {/* User Info */}
        <div className="px-6 py-2 border-t border-gray-200">
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            placeholder="Enter email"
            className="text-gray-700 text-sm mb-2 border border-gray-300 rounded py-1 px-2 w-full"
          />
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Enter name"
            className="text-gray-700 text-sm mb-2 border border-gray-300 rounded py-1 px-2 w-full"
          />
        </div>

        {/* Select Date */}
        <div className="px-6 py-2 border-t border-gray-200">
          <label htmlFor="date" className="text-gray-700 text-sm mb-2 block">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-gray-700 text-sm mb-2 border border-gray-300 rounded py-1 px-2 w-full"
          />
        </div>

        {/* Book Ticket Button */}
        <div className="px-6 py-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => onBookTicket()}
          >
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
