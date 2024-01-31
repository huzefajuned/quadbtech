import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Function to fetch all shows data from https://api.tvmaze.com/.
   */
  const getAllShows = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.tvmaze.com/search/shows?q=all"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  /**
   * Function to handle click on each show item.
   * Navigates to the single show page.
   * @param {number} id - ID of the show.
   */
  const handleItemClick = (item) => {
    // Navigate to single show page with the given id
    // Example: history.push(`/singleshow/${id}`);
    // alert(id);
    navigate("/preview", {
      state: item,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {data.map((item) => (
            <div
              key={item.show.id}
              className="bg-white rounded-lg shadow-md   z-0 overflow-hidden cursor-pointer transition duration-300 hover:shadow-xl transform hover:scale-105"
              onClick={() => handleItemClick(item)}
              style={{ minWidth: "250px", maxWidth: "300px" }} // Set a minimum and maximum width for each card
            >
              <img
                src={
                  item.show.image
                    ? item.show.image.medium
                    : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                }
                alt={item.show.name}
                className="w-full h-64 object-cover"
                style={{ minHeight: "200px" }} // Set a minimum height for the image
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{item.show.name}</h4>
                <h4 className="text-gray-600">
                  Rating:{" "}
                  {item.show.rating.average
                    ? item.show.rating.average
                    : "No rating"}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
