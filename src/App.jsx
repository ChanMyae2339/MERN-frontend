import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="text-blue-800 bg-green-400 flex justify-items-center justify-between p-4">
        <div> Media World</div>
        <div>
          <ul className="flex gap-4  ">
            <li>
              <Link to="/">Home</Link>
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
