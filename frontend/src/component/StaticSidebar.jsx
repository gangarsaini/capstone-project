import React from 'react';
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { IoHappyOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import './sidebar.css';
function StaticSidebar() {
  return (
    <div className='sideBar'>
      <Link className='outline-none'><RxHamburgerMenu /></Link>
      <Link><IoMdHome /><span>Home</span></Link>
      <Link><SiYoutubeshorts /><span>Shorts</span></Link>
      <Link><MdSubscriptions /><span>Subscriptions</span></Link>
      <Link><IoHappyOutline /><span>You</span></Link>
    </div>
  )
}

export default StaticSidebar
