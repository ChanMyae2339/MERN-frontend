import React from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../common/api/axiosApi";
import {toast} from "react-toastify";
const HomeDetail = () => {
  const defaultData = {
    title: "",
    description: "",
    author: "",
    type: [],
  };
  const [data, setData] = React.useState(defaultData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axiosApi(`/user/home/${id}`);
        console.log("Fetched post details:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPostDetail();
  }, [id, setData]);

  const handleUpdate = async () => {
    try {
    const response = await axiosApi.put(`/user/home/${id}`, {
      title: data.title,
      description: data.description,
      author: data.author,
      type: data.type,
    });


    toast.success("Post updated successfully!");

    setData(await response.data);
    setIsModalOpen(false);
    navigate("/home");
  } catch (error) {
    console.error("Error updating post:", error.response);
    toast.error("Failed to update post.");
  }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosApi.delete(`/user/home/${id}`);
    console.log("Delete response:", response);

      setConfirmDelete(false);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting post:", error.response);
    }
  };

  return (
    <div>
      {data ? (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 w-full m-4">
          <h1>Title: {data.title}</h1>
          <p>Description: {data.description}</p>
          <p>Author By: {data.author}</p>
          <p>Movie type :{data.type.join(", ")}</p>
          <p>Created at: {new Date(data.createdAt).toLocaleString()}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-blue-300 text-white hover:bg-blue-500 p-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn bg-red-800 text-white hover:bg-red-500 p-2 rounded"
            >
              Delete
            </button>
          </div>
       
        </div>
      ) : (
        <p>Loading...</p>
      )}
         <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleUpdate}
          >
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
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
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
          </Modal>
          <Modal
            isOpen={confirmDelete}
            onClose={() => setConfirmDelete(false)}
            onSave={handleDelete}
          >
            <p className="text-lg font-medium text-gray-700">
              Are you sure you want to delete this post?
            </p>
          </Modal>
    </div>
  );
};

export default HomeDetail;
