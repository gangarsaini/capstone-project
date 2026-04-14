import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
 const [err, setError] = useState('')
  const navigate = useNavigate();

  const handleCreate = async () => {

     const token = localStorage.getItem("token"); // or wherever you store it

        if (!token) {
            setError("Please login first to create a channel");
            return; // stops here, no API call, no 401 in console
        }


    try{
       await API.post("/channels", {
          channelName: name,
          description
        });
        alert("Channel created");
        navigate("/channel");
    }
    catch(err){
       
         if(err.response?.status === 401){
        setError("Please login first to create a channel");
    } else {
        setError("Something went wrong. Please try again.");
    }
    }
  };

   return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold">Create Channel</h2>

      <input
        placeholder="Channel Name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2 m-2 w-80"
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 m-2 w-80"
      />
      <p className="text-red-500 text-[14px]">{err}</p>

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-xl"
      >
        Create
      </button>
    </div>
  );
}

export default CreateChannel;