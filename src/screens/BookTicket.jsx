import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { generateRandomId } from "../common/common";
const BookTicket = () => {
  const { isLoggedIn, user } = useAuth();
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [editedName, setEditedName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [watchOn, setWatchOn] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, image, genres, premiered, rating, status } = state;

  /**
   *  validate user authentication
   */
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  /**
   * book a ticket
   * save ticket info in localstorage
   * user Info, Movie details, booking details etc
   */
  function onBookTicket() {
    setLoading(true);
    console.log("watchOn is", watchOn);
    if (watchOn == null) {
      toast.error(` invalid Date ❗`);
      setLoading(false);

      return;
    }
    // Create ticket payload
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
        name: editedName || user?.name,
        email: editedEmail || user?.email,
      },
      dates: {
        watchOn,
        bookedOn: new Date().toString(),
      },
      id: generateRandomId(),
    };

    // Retrieve existing bookings from local storage
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    // Save new ticket in bookings array
    const updatedBookings = [...existingBookings, ticket];

    // Save updated bookings array in local storage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    /**
     *  delaying the toast, loader  and navigation
     *  API
     */
    setTimeout(() => {
      setLoading(false);
      toast.success("Ticket booked successfully!");
      navigate("/tickets");
    }, 2000);
  }

  // Return null if not authenticated
  if (!isLoggedIn) return null;

  return (
    <div className="flex flex-row items-center justify-center h-screen w-screen ">
      <div className=" rounded-lg overflow-hidden flex flex-row justify-center p-2  bg-white border-2 shadow-2xl ">
        <div className=" flex flex-col justify-between rounded-lg  w-8/12">
          {/* Movie Details */}
          <div className="px-6 py-4  flex flex-row gap-1 w-full justify-between">
            <div className=" w-full ">
              <h2 className="font-bold text-2xl tracking-wider mb-2 text-red-500 underline">
                {name}
              </h2>

              <p className="text-gray-700 text-md mb-2">
                Genres: {genres?.join(", ")}
              </p>
              <p className="text-gray-700 text-md mb-2">
                Rating: {rating?.average}
              </p>
            </div>
            <img
              src={
                image?.medium
                  ? image?.medium
                  : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
              }
              alt="all img"
              className="h-28 w-28 rounded-md shadow-2xl border-2"
            />
          </div>

          {/* User Info */}
          <div className="px-6 py-2 border-t border-gray-200 flex flex-col h-full justify-center items-center">
            <label
              htmlFor="email"
              className="text-gray-700 text-md mb-1   w-full"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              placeholder="Enter your email address"
              className="text-gray-700 text-sm mb-2 border border-gray-300 rounded py-1 px-2 w-full"
            />
            <label htmlFor="name" className="text-gray-700 text-md mb-1 w-full">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Enter your full name"
              className="text-gray-700 text-sm mb-2 border border-gray-300 rounded py-1 px-2 w-full"
            />
          </div>

          {/* Select Date */}
          <div className="px-6 py-2 border-t border-gray-200">
            <label htmlFor="date" className="text-gray-700 text-sm mb-2 block">
              Watch on Date:
            </label>
            <input
              type="date"
              id="date"
              value={watchOn}
              onChange={(e) => setWatchOn(e.target.value)}
              className="text-gray-700 text-sm mb-2 border border-gray-300 rounded py-1 px-2 w-full"
            />
          </div>

          {/* Book Ticket Button */}
          <div className="px-6 py-4 ">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onBookTicket}
              disabled={loading}
            >
              {loading ? "please wait ⏳" : "Book Ticket ➤"}
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex-grow  p-2">
          <img
            src="https://img.freepik.com/premium-vector/admit-one-ticket-vector-design-logo-template_393879-3650.jpg"
            alt="admitOne"
            className="h-full bg-transparent "
          />
        </div>
      </div>
      {/*show laoder on  loading tru state */}
      {loading && <Loader />}
    </div>
  );
};

export default BookTicket;
