import { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  /**
   * handle logout user
   * remove credentials from localstorage
   */

  function handleLogout() {
    const userData = localStorage.getItem("user");
    if (userData) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser([]);
      toast.info("Logout successful 🔒");
      navigate("/");
    }
  }
  return (
    <header className="bg-white text-white py-4 px-6 flex justify-between items-center sticky  top-0 right-0 w-screen z-50">
      <div className="flex items-center">
        <img
          src="https://quadbtech.com/images/QBT%20Logo%20Black.png"
          alt="Logo"
          className="h-10 mr-4"
        />
      </div>

      {isLoggedIn ? (
        <>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRblGHmIA70kc9T4UJy-AFc0YLcnPpu5kwR2Q&usqp=CAU"
            alt="userIcon"
            className="h-16 w-16 border-green-100 rounded-full border-2 p-1  hover:p-0 cursor-pointer "
            onClick={() => setShowDetails(!showDetails)}
          />
          {showDetails && (
            <div className="bg-white p-2 absolute top-24 right-0 border flex flex-col justify-center gap-2 border-gray-300 rounded shadow-md">
              <p className="text-gray-800">Name: {user?.name}</p>
              <p className="text-gray-800">Email: {user?.email}</p>
              <button
                onClick={() => handleLogout()}
                className="bg-[#1f2544] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-[#1f2544] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
