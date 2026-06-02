import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/home");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const res = await response.json();
        console.log("Fetched posts:", res);
        setData(res);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  },[]);

  return (
    <>
      {data &&
        data.map((post) => (
          <div className=" bg-white  rounded-lg shadow-md p-6 flex flex-col gap-4 w-full m-4" key={post._id}>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <div className=" mt-4">
             {post.description}
              <div>
              <Link to={`/home/${post._id}`} className="text-blue-500 hover:text-blue-700">
                Read more...
              </Link>
            </div>

            </div>
           < div className="text-sm text-gray-500">By {post.author}</div>

           <div className="text-sm text-gray-400">Movie type :{post.type.join(", ")}</div>
            <div>Post created at {new Date(post.createdAt).toLocaleString()}</div>
           
          </div>
        ))}
    </>
  );
};

export default Home;
