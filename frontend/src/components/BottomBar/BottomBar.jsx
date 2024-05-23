'use client';

import styles from './BottomBar.module.css';
import { CiHome } from "react-icons/ci";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi2";

const BottomBar = () => {
  

  return (
    <>
      <div className={styles.topbar}>
        <CiHome size={35} color='grey'/>
        <FaRegCalendarPlus size={35} color='#00916E'/>
        <FaCirclePlus size={35} color='#00916E'/>
        <HiOutlineNewspaper size={35} color='grey'/>
        <FaRegUser size={35} color='grey'/>
        
      </div>
    </>
  );
};

export default BottomBar;