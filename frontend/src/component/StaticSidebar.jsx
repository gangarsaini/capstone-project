import React, { useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { IoHappyOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import './sidebar.css';
import OpenSide from './OpenSide'


// function StaticSidebar() {
//     const[open,setOpen] = useState(false);

//     function handleClick(){
//         setOpen(!open);
//     }
//   return (
//     <>
//     <div className={`open ? "flex": "hidden"`}><OpenSide/></div>
//     <div className='sideBar'>
//       <Link onClick={handleClick} className='outline-none'><RxHamburgerMenu /></Link>
//        <Link><IoMdHome /><span>Home</span></Link>
//       <Link><SiYoutubeshorts /><span>Shorts</span></Link>
//       <Link><MdSubscriptions /><span>Subscriptions</span></Link>
//       <Link><IoHappyOutline /><span>You</span></Link>
//     </div>
//     </>
//   )
// }

function StaticSidebar() {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(!open);

    return (
        <aside className="sidebar-container">
            {/* Conditional Rendering using logical && is often cleaner than 'hidden' classes */}
            {open && <OpenSide />}

            <div className='sideBar'>
                <button onClick={handleClick} className='menu-btn'>
                    <RxHamburgerMenu />
                </button>
                <Link to="/"><IoMdHome /><span>Home</span></Link>
                <Link to="/shorts"><SiYoutubeshorts /><span>Shorts</span></Link>
                <Link to="/subscriptions"><MdSubscriptions /><span>Subscriptions</span></Link>
                <Link to="/you"><IoHappyOutline /><span>You</span></Link>
            </div>
            
        </aside>
    );
}

export default StaticSidebar
