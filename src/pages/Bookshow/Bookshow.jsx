import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "../Bookshow/Bookshow.module.css";

const Bookshow = () => {
  // retriving state date
  const location = useLocation();
  // alert(location);

  // setting loading
  const [loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 1900);

  const [show, setShow] = useState(false);
  // creating form input states....
  const [movie, setMovie] = useState(location?.state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");

  //onSubmit Event For formData Submit...
  const handleSubmit = (e) => {
    const formData = { movie, name, email, age, contact, date };
    // console.log(formData);
    localStorage.setItem("formData", JSON.stringify(formData));
    setTimeout(() => {
      setName("");
      setEmail("");
      setContact("");
      setAge("");
      setDate("");
      setShow(true);
    }, 1000);
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("formData"));
    if (items) {
      setItems(items);
    }
  }, [show]);

  // deleting ticket
  const delete_Ticket = () => {
    localStorage.clear("formData");
    setShow(false);
    setItems("");
    alert("want to Deleted Ticket ?");
  };
  return (
    <>
      {loading ? (
        <>
          <div className={styles.container}>
            <div className={styles.book_Card}>
              <h1> Book Your Show Now! </h1>
              <h2>
                Movie Name :
                <span>
                  <strong>{location.state}</strong>
                </span>
              </h2>
              <div className={styles.card_Inner}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" Your Name:"
                />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email:"
                />
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder=" Your Age:"
                />
                <input
                  type="number"
                  placeholder="  Contact Number:"
                  name="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  id=""
                />
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  id=""
                />
              </div>
              <button onClick={() => handleSubmit()}>Submit Form</button>
            </div>

            {items.length != 0 || show === true ? (
              <>
                <div className={styles.main}>
                  <h1> *** Your Ticket ***</h1>{" "}
                  <button className={styles.close_Me} onClick={delete_Ticket}>
                    X
                  </button>
                  <div className={styles.final_Ticket}>
                    <div className={styles.left}>
                      <h3>
                        Movie Name <span>{items.movie} </span>
                      </h3>
                      <h3>
                        Theater Name <span> No Any Now! </span>
                      </h3>
                      <h3>
                        Date <span> {items.date}</span>
                      </h3>
                      <h3>
                        Transectio ID <span> **1ab3bsty56sbj8dh</span>
                      </h3>
                      <h3>
                        Date Of Purchase <span>{items.date} </span>
                      </h3>
                    </div>
                    <div className={styles.right}>
                      <h3>
                        Name <span> {items.name}</span>
                      </h3>
                      <h3>
                        Age <span> {items.age} </span>
                      </h3>
                      <h3>
                        Email <span> {items.email}</span>
                      </h3>
                      <h3>
                        Contact <span> {items.contact} </span>
                      </h3>
                    </div>
                  </div>
                  {/* <button> *** Print Your Ticket ***</button> */}
                </div>
                <hr />
              </>
            ) : (
              <>
                <h2 className={styles.no_Ticket}>
                  {" "}
                  **** U dont Have Any Ticket... ***
                </h2>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default Bookshow;
