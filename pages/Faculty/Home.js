import React from "react";
import Layout from "./layout";
import home from "./home.module.css";
import Photo from "../../public/images.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Home() {
  const [Prof_Name, Set_Prof_Name] = useState("Dr.Gagan Raj Gupta");
  const [Pic, Set_Pic] = useState(Photo);

  return (
    <div>
      <Layout>
        <div className={home.whitebox}>
          <div className="text-5xl w-full flex justify-center mt-7 font-bold">
            Welcome
          </div>
          <div className={home.photo}>
            <Image src={Pic} height={300} width={300} />
          </div>
          <div className={home.profname}>{Prof_Name}</div>
        </div>
      </Layout>
    </div>
  );
}
