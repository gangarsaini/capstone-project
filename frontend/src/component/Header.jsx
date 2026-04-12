import { Link } from "react-router-dom";
import { IoLogoYoutube } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import './header.css'
function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-white">
      <h1 className="text-xl font-bold flex items-center justify-center"><span className="text-red-500 px-2"><IoLogoYoutube /></span><span className="text-black">YouTube</span></h1>
        <span className="serach-layout">
        <input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 text-black rounded"
       />
         <span className="search-ico"><IoSearch /></span>
        </span>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded ml-2">
        Register
        </Link>
      <Link to="/login" className="bg-red-500 px-3 py-1 rounded">
        Sign In
      </Link>
    </div>
  );
}

export default Header;