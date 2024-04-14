import React from "react";
import Layout from "./layout";
import Find from "./Find_TA.module.css";
import { useState, useEffect } from "react";
import Photo from "../../public/images.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Find_TA() {
  const router = useRouter();
  const TA = [
    {
      TA_Name: "John Doe",
      TA_ID: "TA001",
      TA_Email: "john.doe@example.com",
      TA_Phone: "+1234567890",
      TA_Pic: Photo,
    },
    {
      TA_Name: "Jane Smith",
      TA_ID: "TA002",
      TA_Email: "jane.smith@example.com",
      TA_Phone: "+1987654321",
      TA_Pic: Photo,
    },
    {
      TA_Name: "Alex Johnson",
      TA_ID: "TA003",
      TA_Email: "alex.johnson@example.com",
      TA_Phone: "+1122334455",
      TA_Pic: Photo,
    },
    {
      TA_Name: "Emily Brown",
      TA_ID: "TA004",
      TA_Email: "emily.brown@example.com",
      TA_Phone: "+1555099887",
      TA_Pic: Photo,
    },
    {
      TA_Name: "Michael Lee",
      TA_ID: "TA005",
      TA_Email: "michael.lee@example.com",
      TA_Phone: "+1447766554",
      TA_Pic: Photo,
    },
  ];
  const [inputValue, setInputValue] = useState("");
  const [Filtered_List, setFiltered_List] = useState(TA);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    //API Call
    console.log(inputValue);
  }, [inputValue]);
  return (
    <div>
      <Layout>
        <div className={Find.container}>
          <div className="flex justify-center w-full">
            <input
              class="rounded-md text-xl border-2 border-purple-500 p-3 focus:text-violet-950 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search TAs"
              style={{ color: "#4a3c8d", width: "80%" }}
              value={inputValue}
              onChange={handleInputChange}
            />{" "}
          </div>
          <div className={Find.TA_List}>
            {Filtered_List.map((ta, index) => (
              <div key={index} className={Find.TA_Entry}>
                <div className="md:h-full w-full md:w-1/4 flex justify-center">
                  <Image src={ta.TA_Pic} className="rounded-full" />
                </div>
                <div className="md:h-full px-24 w-full  md:w-2/5 flex flex-col justify-center">
                  <div className={Find.TA_Name}>{ta.TA_Name}</div>
                  <div className={Find.TA_Details}>{ta.TA_ID}</div>
                  <div className={Find.TA_Details}>{ta.TA_Email}</div>
                  <div className={Find.TA_Details}>{ta.TA_Phone}</div>
                </div>
                <div className="md:h-full h-16 w-full md:w-1/5 flex flex-row content-center justify-center md:p-5">
                  <button
                    className={Find.Details}
                    onClick={() =>
                      router.push(`/Faculty/TA_Details/?idNumber=${ta.TA_ID}`)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
      </Layout>
    </div>
  );
}
