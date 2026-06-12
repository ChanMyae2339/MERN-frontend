import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import axiosApi from "../../common/api/axiosApi";

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
        const response = await axiosApi(`/user/home?page=${currentPage}&limit=${limit}`);
        console.log("Fetched posts:", response.data);
        setData(response.data.news);
        setTotalPosts(response.data.totalPosts); // Set the total number of posts

        setPagination(response.data.pagination);


      } catch (error) {
        console.error("Error fetching posts:", error.response);
      }
    };
    fetchPosts();
  },[ currentPage, limit]);

 return (
  <div className="max-w-4xl mx-auto px-4 py-8 w-full">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-extrabold text-gray-800">Latest Posts</h1>
      <button 
        onClick={() => navigate("/create-post")}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm flex items-center gap-2"
      >
        <span>Create Post</span>
        <span className="text-xl">+</span>
      </button>
    </div>

    {/* Posts Grid */}
    <div className="space-y-6">
      {data && data.length > 0 ? (
        data.map((post) => (
          <div 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200" 
            key={post._id}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-gray-700">By {post.author}</span>
                <span className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                  {post.type.join(", ")}
                </span>
                <Link 
                  to={`/home/${post._id}`} 
                  className="text-green-600 hover:text-green-800 font-semibold text-sm transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-10">No posts available.</p>
      )}
    </div>

    {/* Pagination */}
    <div className="mt-10">
      <Pagination 
        totalPosts={totalPosts} 
        pagination={pagination} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} 
        setLimit={setLimit}
      />
    </div>
  </div>
);
};

export default Home;
