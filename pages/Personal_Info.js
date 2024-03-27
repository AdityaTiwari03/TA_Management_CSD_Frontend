import React, { useState, useEffect } from "react";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Personal_Info() {
  const router = useRouter();
  const { idNumber } = router.query;
  const [Email, Set_Email] = useState("");
  const [Ph1, Set_Ph1] = useState("");
  const [Name, Set_Name] = useState();
  const [ID_Number, Set_ID_Number] = useState(idNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/info/?idNumber=${id}`);
        Set_Name(response.data.data.firstName + " " + response.data.data.lastName);
        Set_ID_Number(response.data.data.idNumber);
        Set_Email(response.data.data.email);
        Set_Ph1(response.data.data.phone);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idNumber]);

  const handleProfessional = () => {
    router.push(`/Professional_Info?idNumber=${idNumber}`);
  }

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
            {/* <Link href={`/Professional_Info?idNumber=${idNumber}`} className={per.link}> */}
              <button className={per.button} onClick={handleProfessional}>Next</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </TALayout>
  );
}
