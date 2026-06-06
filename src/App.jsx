import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="text-green-500 text-2xl bg-gray-200 flex justify-items-center justify-around p-4 ">
        <div> Media World</div>
        <div>
          <ul className="flex gap-4  ">
            <li >
              <Link to="/"  >Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
