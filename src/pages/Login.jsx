import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../common/api/axiosApi";
import { useContext } from "react";
import {AppContext} from "../Provider.jsx";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setAccessUser } = useContext(AppContext);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axiosApi.post("/api/user/login", {
        email,
        password
      },{withCredentials:true});
    
      console.log("res",res);
      if (res.status === 200) {
        navigate("/home");
        setAccessUser(true);
        toast.success("Login successful!");
        console.log("Login successful:", res.data);
      } else {
        setError(res.errors || "Failed to login");
      }
    } catch (error) {
      setError(error.response.data.errors || "Failed to login");
      if (error.response.status === 401) {
        setAccessUser(false);
      }
    }
  };
  return (
    <div className="flex w-full h-[100vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-1/2  px-6 py-12 lg:px-8 shadow-lg rounded-lg ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-green-500">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
            <div className="space-y-6"> 
              <label htmlFor="email" className="block text-sm/6 font-medium text-green-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-green-500 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
                    {error==="Invalid email" && <p className="text-red-500">{error}</p>}

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-green-300">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-green-400 hover:text-green-300">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-green-500 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
                    {error==="Invalid password" && <p className="text-red-500">{error}</p>}

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={loginUser}
              >
                Sign in
              </button>
            </div>
        

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <Link to="/register" className="font-semibold text-green-400 hover:text-green-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
