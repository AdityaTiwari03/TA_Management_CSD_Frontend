import React, { useState, useEffect } from "react";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function Personal_Info() {
  const router = useRouter();
  const { idNumber } = router.query;

  // Initialize state variables for form data
  const [Email, Set_Email] = useState("");
  const [Ph1, Set_Ph1] = useState("");
  const [Ph2, Set_Ph2] = useState("");
  const [Linkedin, Set_Linkedin] = useState("");
  const [GitHub, Set_Github] = useState("");
  const [Portfolio, Set_Portfolio] = useState("");
  const [Other, Set_Other] = useState("");
  const [photo, setphoto] = useState();
  const [Name, Set_Name] = useState("");
  const [ID_Number, Set_ID_Number] = useState(idNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ta-backend-eta.vercel.app/api/v1/users/info/?idNumber=${id}`
        );
        Set_Name(
          response.data.data.firstName + " " + response.data.data.lastName
        );
        Set_ID_Number(response.data.data.idNumber);
        Set_Email(response.data.data.email);
        Set_Ph1(response.data.data.phone);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idNumber]);

  // Effect to retrieve form data from sessionStorage on component mount
  useEffect(() => {
    const storedData = sessionStorage.getItem("personalFormData");
    console.log(storedData);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Set_Name(parsedData.Name);
      Set_Email(parsedData.Email);
      Set_Ph1(parsedData.Ph1);
      Set_Ph2(parsedData.Ph2);
      Set_Linkedin(parsedData.Linkedin);
      Set_Github(parsedData.GitHub);
      Set_Portfolio(parsedData.Portfolio);
      Set_Other(parsedData.Other);
    }
  }, []);

  // Effect to update sessionStorage when form data changes
  useEffect(() => {
    const formData = {
      Name,
      Email,
      Ph1,
      Ph2,
      Linkedin,
      GitHub,
      Portfolio,
      Other,
    };
    sessionStorage.setItem("personalFormData", JSON.stringify(formData));
  }, [Name, Email, Ph1, Ph2, Linkedin, GitHub, Portfolio, Other]);

  const handleProfessional = () => {
    router.push(`/Professional_Info?idNumber=${idNumber}`);
  };
  const handleNext = () => {
    const data = {};
  };
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
          <div className={per.Phone}>
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
          </div>

          <div className={per.Phone}>
            <div className={per.Phone1}>
              {" "}
              <div className={per.label}> Phone Number 1 </div>
              <input
                className={per.input}
                placeholder="Phone Number 1"
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
                onChange={(e) => {
                  Set_Ph2(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className={per.Phone}>
            <div className={per.Phone1}>
              {" "}
              <div className={per.label}> Linkedin </div>
              <input
                className={per.input}
                placeholder="Linkedin URL"
                value={Linkedin}
                type="url"
                onChange={(e) => {
                  Set_Linkedin(e.target.value);
                }}
                required
              />
            </div>
            <div className={per.Phone2}>
              {" "}
              <div className={per.label}> GitHub </div>
              <input
                className={per.input}
                placeholder="Github URL"
                value={GitHub}
                type="url"
                onChange={(e) => {
                  Set_Github(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className={per.Phone}>
            <div className={per.Phone1}>
              {" "}
              <div className={per.label}> PortFolio URL </div>
              <input
                className={per.input}
                placeholder="Optional"
                value={Portfolio}
                onChange={(e) => {
                  Set_Portfolio(e.target.value);
                }}
                type="url"
              />
            </div>
            <div className={per.Phone2}>
              {" "}
              <div className={per.label}> Any Other URL </div>
              <input
                className={per.input}
                placeholder="Optional"
                value={Other}
                onChange={(e) => {
                  Set_Other(e.target.value);
                }}
                type="url"
                required
              />
            </div>
          </div>
          <div className={per.Phone}>
            <div className={per.Phone1}>
              <div className={per.label}> Upload Photo </div>

              <input
                className={per.input}
                placeholder="Upload Photo"
                type="file"
                value={photo}
                onChange={(e) => {
                  setphoto(e.target.files);
                }}
              />
            </div>
            <div className={per.Phone2}>
              <div className={per.label}> Upload Resume </div>

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
            <button className={per.button} onClick={handleProfessional}>
              Next
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </TALayout>
  );
}
