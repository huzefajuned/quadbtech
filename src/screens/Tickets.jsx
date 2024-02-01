import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket";

const Tickets = () => {
  const navigate = useNavigate();
  const { bookings, getBookings } = useAuth();

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-2 p-10 bg-[#1f2544]">
      <div className=" flex flex-row justify-between text-center items-center h-[10vh]">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          ◀ Go Back
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center p-2 rounded-xl text-white">
          Your Tickets 🥳🥳🥳
        </h2>
      </div>

      <div className="flex flex-row flex-wrap w-full  items-center   h-[90vh] p-2 justify-center gap-4 overflow-scroll">
        {bookings && bookings.length > 0 ? (
          bookings.map((ticket, index) => (
            <Ticket key={index} ticket={ticket} index={index} />
          ))
        ) : (
          <div className="p-6 rounded-lg flex flex-col justify-center items-center bg-[#1f2544] text-white">
            <p className="text-center font-bold text-2xl mb-4">
              No tickets booked yet 😔
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md border-2"
            >
              Book Now ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
