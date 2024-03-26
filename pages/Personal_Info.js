import React, { useState, useEffect } from "react";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Personal_Info() {
  const router = useRouter();
  const { idNumber } = router.query;
  const [Email, Set_Email] = useState("");
  const [Ph1, Set_Ph1] = useState("");
  const [Ph2, Set_Ph2] = useState("");
  const [Name, Set_Name] = useState();
 
  const [ID_Number, Set_ID_Number] = useState(idNumber);

  useEffect(async () => {
    const id = localStorage.getItem('idNumber') || idNumber;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/info/?idNumber=${id}`);
        // Set_FName(response.data.data.firstName);
        // Set_LName(response.data.data.lastName);
        Set_Name(response.data.data.firstName + " " + response.data.data.lastName);
        Set_ID_Number(response.data.data.idNumber);
        Set_Email(response.data.data.email);
        Set_Ph1(response.data.data.phone);
        Set_Ph2(response.data.data.phone);

        // Handle the response data
      } catch (error) {
        // Handle errors
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {

    const data = {

    }
  }

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
              <button className={per.button} onClick={handleNext}>Next</button>
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
