import { Link } from "react-router-dom";
import { IoLogoYoutube } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import './header.css';
import { FaUser } from "react-icons/fa";
function Header({setSearch,setCategory}) {
     const user = JSON.parse(localStorage.getItem("user"));
    //  console.log(user,"user");
  return (
    <div className="flex items-center justify-between px-4 py-2 text-white fixed-IT ">
      <h1 className="text-xl font-bold flex items-center justify-center"><span className="text-red-500 px-2"><IoLogoYoutube /></span><span className="text-black">YouTube</span></h1>
        <span className="serach-layout">
        <input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 text-black rounded"
        onChange={(e) => setSearch(e.target.value)}
       />
         <span className="search-ico"><IoSearch /></span>
        </span>
     

              {user ? (
                <p className="px-3 py-1 rounded flex">
                 <span className="bg-blue-300 flex user-blade">< FaUser /></span><span className="text-[#6d6d6d]">{user.username}</span> && <Link to="/login" className="logout text-red-500">logout</Link>
                </p>
            ) : (
                <Link to="/login" className="bg-red-500 px-3 py-1 rounded">
                Sign In
                </Link>
            )}

            
            {user && (
            <Link to="/channel" className="bg-gray-700 px-3 py-1 rounded ml-2">
                My Channel
            </Link>
            )}


    </div>
  );
}

export default Header;