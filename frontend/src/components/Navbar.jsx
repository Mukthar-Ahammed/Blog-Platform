import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/userApi";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login"); 
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full h-auto bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MyBlog</h1>

      <ul className="flex space-x-6 items-center">
        <li>
          <Link
            to="/home"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/blogs"
            className="hover:text-teal-400 transition-colors duration-200"
          >
            Explore
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-teal-500 px-4 py-1 rounded-md hover:bg-teal-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
