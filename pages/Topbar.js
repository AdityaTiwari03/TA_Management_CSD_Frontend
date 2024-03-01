import React from "react";
import topbar from "../styles/Topbar.module.css";
import iitbhilai from "../public/group_logo.svg";
import account from "../public/image 6.png";
import Image from "next/image";
export default function Topbar() {
  return (
    <div className={topbar.topb}>
      <div className={topbar.left}>
        <Image src={iitbhilai} height={50} width={50} />
        <div className={topbar.TA}>TA PORTAL</div>
      </div>
      <div className={topbar.right}>
        <Image src={account} height={45} width={45} />
        <div className={topbar.acc_name}>Aditya Tiwari</div>
      </div>
    </div>
  );
}
