import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [bookings, setBookings] = useState([]);

  // Check if user data exists in localStorage on mount
  function getUser() {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }

  /**
   * get booked tickets
   *
   */

  function getBookings() {
    const tickets = localStorage.getItem("bookings");
    if (tickets) {
      setBookings(JSON.parse(tickets));
    }
  }

  useEffect(() => {
    getUser();
    getBookings();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        bookings,
        getBookings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
