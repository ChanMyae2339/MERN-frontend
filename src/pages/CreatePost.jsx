import React from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../common/api/axiosApi";
import {toast} from "react-toastify";

const CreatePost = () => {
  const defaultData = {
    title: "",
    description: "",
    author: "",
    type: [],
  };
  const [data, setData] = React.useState(defaultData);
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const handleSave = async () => {
    try {
    const response = await axiosApi.post("/user/home", {
      title: data.title,
      description: data.description,
      author: data.author,
      type: data.type,
    });

    toast.success("Post created successfully!");
    setData( response);
    navigate("/home");
  } catch (error) {
    // console.error("Error creating post:", error.response);
    setError(Object.keys(error.response.data.errors));
    toast.error("Failed to create post.");
  }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
{      error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error.map((err) => (
            <p key={err}>{err}field is required</p>
          ))}
        </div>
      )}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Title
      </label>
      <input
        type="text"
        defaultValue={data.title}
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        defaultValue={data.description}
        className="w-full p-2 border rounded mb-4"
        rows="5"
        onChange={(e) => setData({ ...data, description: e.target.value })}
      ></textarea>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Author
      </label>
      <input
        type="text"
        defaultValue={data.author}
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setData({ ...data, author: e.target.value })}
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Movie Type
      </label>
      <input
        type="text"
        defaultValue={data.type.join(", ")}
        className="w-full p-2 border rounded mb-4"
        onChange={(e) =>
          setData({
            ...data,
            type: e.target.value.split(", ").map((s) => s.trim()),
          })
        }
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create
      </button>
      <button
        onClick={() => navigate("/home")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default CreatePost;
