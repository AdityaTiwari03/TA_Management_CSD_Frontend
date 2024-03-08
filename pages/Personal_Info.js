import React from "react";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import { useState } from "react";
import Link from "next/link";
export default function Personal_Info() {
  const [FName, Set_FName] = useState("Aditya");
  const [LName, Set_LName] = useState("Tiwari");
  const [Email, Set_Email] = useState("aadi.tiwari0208@gmail.com");
  const [Ph1, Set_Ph1] = useState(1214009000);
  const [Ph2, Set_Ph2] = useState(1214009000);

  const [ID_Number, Set_ID_Number] = useState(12140090);
  const [Name, Set_Name] = useState(FName + " " + LName);

  return (
    <TALayout>
      <div className="main">
        <div className={per.whitebox}>
          <div className={per.head}>Personal Information</div>
          <div className={per.id}>
            <div className={per.label}> ID Number </div>

            <input
              className={per.input}
              placeholder="ID Number"
              value={ID_Number}
              type="number"
              required
            />
          </div>
          <div className={per.Name}>
            <div className={per.label}> Name </div>

            <input
              className={per.input}
              placeholder="Name"
              value={Name}
              type="text"
              required
            />
          </div>
          <div className={per.Email}>
            <div className={per.label}> Email </div>

            <input
              className={per.input}
              placeholder="Name"
              value={Email}
              type="email"
              required
            />
          </div>
          <div className={per.Phone}>
            <div className={per.Phone1}>
              {" "}
              <div className={per.label}> Phone Number 1 </div>
              <input
                className={per.input}
                placeholder="Name"
                value={Ph1}
                type="tel"
                required
              />
            </div>
            <div className={per.Phone2}>
              {" "}
              <div className={per.label}> Phone Number 2 </div>
              <input
                className={per.input}
                placeholder="Phone Number 2"
                value={Ph2}
                type="tel"
                required
              />
            </div>
          </div>
          <br />
          <div className={per.uploads}>
            {" "}
            <div className={per.Photo}>
              <input
                className={per.input}
                placeholder="Upload Photo"
                type="file"
              />
            </div>
            <div className={per.Resume}>
              <input
                className={per.input}
                placeholder="Upload Resume"
                type="file"
              />
            </div>
          </div>
          <br />
          <div className={per.buttons}>
            <Link href="/Professional_Info" className={per.link}>
              <button className={per.button}>Next</button>
            </Link>
            <Link href="/Professional_Info" className={per.link}>
              <button className={per.button}>Back</button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </TALayout>
  );
}
