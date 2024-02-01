import { useLocation, useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { show } = state;

  const {
    name,
    image,
    genres,
    premiered,
    rating,
    status,
    summary,
    officialSite,
  } = show;

  function OnClickBuyBtn(show) {
    navigate("/bookTicket", {
      state: show,
    });
  }

  return (
    <div className="bg-[#1f2544] h-screen flex flex-col justify-center items-center text-white">
      <div className="max-w-4xl px-4 py-8 mx-auto flex flex-col md:flex-row items-center gap-8">
        <img
          src={image?.medium || "https://via.placeholder.com/300"}
          alt={name}
          className="w-full md:w-72 h-auto object-cover rounded-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-lg mb-4">{genres.join(", ")}</p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Premiered:</span> {premiered}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Rating:</span>{" "}
            {rating?.average || "No rating"}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Status:</span> {status}
          </p>
          <div
            className="text-lg mb-4"
            dangerouslySetInnerHTML={{ __html: summary }}
          ></div>
          {officialSite && (
            <a
              href={officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Official Site
            </a>
          )}
        </div>
      </div>

      <div className="px-6 py-4  w-full flex flow-row justify-center">
        <button
          onClick={() => OnClickBuyBtn(show)}
          className="w-44 bg-yellow-600 p-2 hover:bg-blue-700  text-green-800 hover:text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Buy Now 🛒
        </button>
      </div>
    </div>
  );
};

export default Preview;
