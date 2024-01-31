import { useEffect, useState } from "react";
import styles from "../Homepage/Homepage.module.css";

// Components
import Searchbar from "../../components/Searchbar/Searchbar";
import ListItem from "../../components/ListItem/ListItem";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * API FOR ALL SHOWS
   * https://api.tvmaze.com/search/shows?q=all
   */

  const getAllShows = async () => {
    setLoading(true);
    try {
      const data = await axios.get("https://api.tvmaze.com/search/shows?q=all");
      await setData(data.data);
    } catch (error) {
      console.log("error in api call", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  console.log("data  from api", data);

  return (
    <div className={styles.container}>
      {/* <Searchbar /> */}
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.inner}>
          {data.map((item) => (
            <ListItem
              key={item.show.id}
              id={item.show.id}
              image={
                item.show.image
                  ? item.show.image.medium
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              name={item.show.name}
              rating={
                item.show.rating.average
                  ? item.show.rating.average
                  : "No rating"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
