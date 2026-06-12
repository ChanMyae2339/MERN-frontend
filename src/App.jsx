import { Outlet, Link } from "react-router-dom";
import axiosApi from "../common/api/axiosApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AppContext} from "./Provider.jsx";

function App() {

  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axiosApi("/api/user/logout");
    console.log("res", res);
    if (res.status === 200) {
      navigate("/login");
      console.log(res.msg);
    }
  };
  return (
    <div className="">
      <div className="text-green-500 text-xl shadow flex justify-items-center justify-between p-4 ">
        <div> Media World</div>
        <div>
          <ul className="flex gap-4  ">
            <li>
              <Link to="/home">Home</Link>
            </li>

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
