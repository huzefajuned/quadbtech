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

  /**
   * OnClickBuyBtn
   * it will validate the user auth state first
   * if user if authenticated
   * then it will be redirect to booking screen
   */

  function OnClickBuyBtn(show) {
    navigate("/bookTicket", {
      state: show,
    });
  }
  return (
    <div className=" bg-[#1f2544] h-screen w-screen flex flex-col gap-10 justify-around items-center text-white">
      <div className="flex flex-col md:flex-row items-center  p-2 ">
        <img
          src={image?.medium}
          alt={name}
          className="w-full md:w-64 h-auto rounded-md mb-4 md:mr-8"
        />
        <div className="flex-1 0 p-2">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className=" mb-4">{genres.join(", ")}</p>
          <p className=" mb-4">
            <span className="font-semibold">Premiered:</span> {premiered}
          </p>
          <p className=" mb-4">
            <span className="font-semibold">Rating:</span>{" "}
            {rating?.average || "No rating"}
          </p>
          <p className=" mb-4">
            <span className="font-semibold">Status:</span> {status}
          </p>
          <div
            className="mb-4 "
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
      <div className=" p-2 ">
        <button
          onClick={() => OnClickBuyBtn(show)}
          className="bg-yellow-200 text-black py-2 px-4 rounded-md mt-4 hover:bg-blue-600 hover:shadow-lg"
        >
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default Preview;
