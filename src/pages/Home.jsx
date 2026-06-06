import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
 const [currentPage, setCurrentPage] = React.useState(1);
 const [limit, setLimit] = React.useState(5);
 const [totalPosts, setTotalPosts] = React.useState(0);

 const [pagination, setPagination] = React.useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/home?page=${currentPage}&limit=${limit}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const res = await response.json();
        console.log("Fetched posts:", res);
        setData(res.news);
        setTotalPosts(res.totalPosts); // Set the total number of posts
        // setPrevious(res.pagination.previous);
        // setNext(res.pagination.next);
        setPagination(res.pagination);


      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  },[ currentPage, limit]);

  return (
    <div className="flex flex-col items-center w-full">
    <div className="text-lg mr-6 flex justify-end   hover:text-green-700 cursor-pointer bg-green-500 text-white p-2 rounded" onClick={() => navigate("/create-post")}>Create Post +</div>
      {data &&
        data.map((post) => (
          <div className=" bg-gray-100  rounded-lg shadow-md p-6 flex flex-col gap-4 w-full m-4 " key={post._id}>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <div className=" mt-4">
             {post.description}
              <div>
              <Link to={`/home/${post._id}`} className="text-green-500 hover:text-green-700">
                Read more...
              </Link>
            </div>

            </div>
           < div className="text-sm text-gray-500">By {post.author}</div>

           <div className="text-sm text-gray-400">Movie type :{post.type.join(", ")}</div>
            <div>Post created at {new Date(post.createdAt).toLocaleString()}</div>
           
          </div>
        ))}

        <Pagination  totalPosts={totalPosts} pagination={pagination}   setCurrentPage={setCurrentPage} currentPage={currentPage} setLimit={setLimit}/>
    </div>
  );
};

export default Home;
