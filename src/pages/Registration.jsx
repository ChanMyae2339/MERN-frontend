import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../common/api/axiosApi";
import { toast } from "react-toastify";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const createUser = async () => {
    try {
      const res = await axiosApi.post("/api/user/register", {
        name,
        email,
        password
      },{withCredentials:true});
     
      const data = await res;
      console.log(data);
      if (res.status ===200) {
        navigate("/login");
        toast.success("Account created successfully!");
      } else {
      setError(Object.keys(data.errors.msg));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message );
    }
  };
  return (
    <div className="flex h-[100vh]  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-1/2  px-6 py-12 lg:px-8 shadow-lg rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error.map((err) => (
                <p key={err}>{err}field is required</p>
              ))}
            </div>
          )}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-green-500">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-green-300"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="block w-full rounded-md bg-green-500/5 px-3 py-1.5 text-base text-green-500 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-green-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="block w-full rounded-md bg-green-500/5 px-3 py-1.5 text-base text-green-500 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-green-300"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-green-400 hover:text-green-300"
                  >
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
                  className="block w-full rounded-md  px-3 py-1.5 text-base text-green-500 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={createUser}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign up
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
