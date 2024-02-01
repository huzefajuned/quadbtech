import { formatDateWithMonthName } from "../common/common";

const Ticket = ({ ticket, index }) => {
  return (
    <div
      key={index}
      className="border-2 shadow-md rounded-lg flex flex-row gap-2 items-center justify-between w-full max-w-xl p-4 bg-white"
    >
      {/* Movie Image */}
      <img
        src={ticket.movie.image}
        alt={ticket.movie.name}
        className="h-36 w-36 object-cover rounded-lg"
      />

      {/* Ticket Details */}
      <div className="flex flex-col justify-between w-full">
        <div className="px-4 py-2">
          {/* Movie Name */}
          <div className="font-bold text-xl mb-2">{ticket.movie.name}</div>

          {/* Watch on Date */}
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 text-sm">Watch On:</p>
            <p className="text-gray-700 text-sm">
              {formatDateWithMonthName(ticket?.dates?.watchOn)}
            </p>
          </div>

          {/* Booked On Date */}
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 text-sm">Booked On:</p>
            <p className="text-gray-700 text-sm">
              {formatDateWithMonthName(ticket?.dates?.bookedOn)}
            </p>
          </div>

          {/* Premiered Date */}
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 text-sm">Premiered:</p>
            <p className="text-gray-700 text-sm">
              {formatDateWithMonthName(ticket.movie.premiered)}
            </p>
          </div>

          {/* User Details */}
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 text-sm">User ID:</p>
            <p className="text-gray-700 text-sm">{ticket.id}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 text-sm">User Name:</p>
            <p className="text-gray-700 text-sm">{ticket.user.name}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-700 text-sm">User Email:</p>
            <p className="text-gray-700 text-sm">{ticket.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
