import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Singlepage/Singlepage.module.css";

// Context
import ShowsContext from "../../context/shows/showsContext";

// Components
import Loader from "../../components/Loader";

const Singlepage = () => {
  const { getSingleShow, singleShow, loading } = useContext(ShowsContext);

  const navigate = useNavigate();

  const [movie, setMovie] = useState(singleShow.name);
  const navToViewPage = (movie) => {
    navigate("/bookShow", {
      state: movie,
    });
    // console.log("movies ", movie);
  };

  const { id } = useParams();

  useEffect(() => {
    getSingleShow(id);
  }, []);

  const removeTags = (text) => {
    if (text === null || text === "") {
      return false;
    } else {
      text = text.toString();
    }
    return text.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img
                src={
                  singleShow.image
                    ? singleShow.image.medium
                    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                }
                alt={singleShow.name}
              />
            </div>
            <div className={styles.right}>
              <h1>{singleShow.name}</h1>
              {singleShow.genres &&
                singleShow.genres.map((genre) => (
                  <span key={genre} className="singleshow__genre">
                    {genre}
                  </span>
                ))}
              <p>
                <strong>Status:</strong>{" "}
                {singleShow.status && singleShow.status}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {singleShow.rating ? singleShow.rating.average : "No rating"}
              </p>
              <p>
                <strong>Offical Site:</strong>{" "}
                {singleShow.officalSite ? (
                  <a
                    href={singleShow.officalSite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {singleShow.officalSite}
                  </a>
                ) : (
                  "No offical site"
                )}
              </p>
              <button
                className={styles.book_Btn}
                onClick={() => navToViewPage(singleShow.name)}
              >
                Book Show
              </button>
            </div>
          </div>
          <div className={styles.bottom}>
            <p>{singleShow.summary && removeTags(singleShow.summary)}</p>
          </div>
          <button className={styles.btn} onClick={() => navigate("/")}>
            GO-BACK
          </button>{" "}
        </div>
      )}
    </>
  );
};

export default Singlepage;
