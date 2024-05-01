import React from "react";
import Layout from "./layout";
import Find from "./Find_TA.module.css";
import { useState, useEffect } from "react";
import Photo from "../../public/images.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
export default function Find_TA() {
  const router = useRouter();

  // useEffect(() => {
  //   // Define an asynchronous function inside useEffect
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/api/v1/users/ml_output?text=${inputValue}`);
  //       setUserFormStatus(response.data); // Update state with response data
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       // Optionally, you can handle errors here
  //     }
  //   }

  //   // Call the asynchronous function when the component mounts
  //   fetchData();

  //   // Optionally, you can return a cleanup function if needed
  //   return () => {
  //     // Cleanup code (if any)
  //   };
  // }, []); 


  const TA = [
    {
      firstName: "akash",
      lastName: "gour",
      idNumber: "75390284",
      email: "akash@iitbhilai.ac.in",
      phone: "7539028400"
    },
    {
      firstName: "sandeep",
      lastName: "gour",
      idNumber: "54821739",
      email: "sandeep@iitbhilai.ac.in",
      phone: "5482173900"
    },
    {
      firstName: "manoj",
      lastName: "gour",
      idNumber: "23571189",
      email: "manoj@iitbhilai.ac.in",
      phone: "2357118900"
    },
    {
      firstName: "bittu",
      lastName: "gour",
      idNumber: "75390283",
      email: "bittu@iitbhilai.ac.in",
      phone: "7539028300"
    },
    {
      firstName: "mahendra",
      lastName: "gour",
      idNumber: "19023847",
      email: "mahi@iitbhilai.ac.in",
      phone: "1902384700"
    },
    {
      firstName: "jay",
      lastName: "gour",
      idNumber: "61735928",
      email: "jay@iitbhilai.ac.in",
      phone: "6173592800"
    },
    {
      firstName: "pramod",
      lastName: "gour",
      idNumber: "75390285",
      email: "pramod@iitbhilai.ac.in",
      phone: "7539028500"
    },
    {
      firstName: "gaurav",
      lastName: "gour",
      idNumber: "75390281",
      email: "gaurav@iitbhilai.ac.in",
      phone: "7539028100"
    },
    {
      firstName: "sonu",
      lastName: "gour",
      idNumber: "15246389",
      email: "sonu@iitbhilai.ac.in",
      phone: "1524638900"
    },
    {
      firstName: "arvind",
      lastName: "gour",
      idNumber: "78932104",
      email: "arvind@iitbhilai.ac.in",
      phone: "7893210400"
    },
    {
      firstName: "abhi",
      lastName: "gour",
      idNumber: "45698230",
      email: "abhi@iitbhilai.ac.in",
      phone: "4569823000"
    },
    {
      firstName: "ravi",
      lastName: "gour",
      idNumber: "98765432",
      email: "ravi@iitbhilai.ac.in",
      phone: "9876543200"
    },
    {
      firstName: "bhola",
      lastName: "gour",
      idNumber: "20174368",
      email: "bhola@iitbhilai.ac.in",
      phone: "2017436800"
    },
    {
      firstName: "suppi",
      lastName: "gour",
      idNumber: "48151623",
      email: "suppi@iitbhilai.ac.in",
      phone: "4815162300"
    },
    {
      firstName: "jeevan",
      lastName: "gour",
      idNumber: "12309567",
      email: "jeevan@iitbhilai.ac.in",
      phone: "1230956700"
    },
    {
      firstName: "vikas",
      lastName: "gour",
      idNumber: "36985210",
      email: "vikas@iitbhilai.ac.in",
      phone: "3698521000"
    }
  ];

  // console.log("TA",TA);
  let res = []; // Array to store the final output
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };




  const [inputValue, setInputValue] = useState("");
  const [Filtered_List, setFiltered_List] = useState(TA);
  const [output, setOutput] = useState([]); // State to store the output of the second API

  const SendQuery = async () => {
    try {
      const userFormStatus = await axios.get(`http://localhost:8000/api/v1/users/ml_output?text=${inputValue}`);
      
      let data = [];
      let temp = "";
      let i = 1;
      let count = 1;
      while (i < userFormStatus.data[0].length) {
        if (count === 9) {
          data.push(temp);
          temp = "";
          count = 1;
          i += 1;
        } else {
          temp = temp + userFormStatus.data[0][i];
          count += 1;
        }
        i += 1;
      }
      // console.log("data",data);

      // Call the second API for each id number in the data array

      
      const secondApiResponses = await Promise.all(data.map(async (idNumber) => {
        try {
          const secondApiResponse = await axios.get(`http://localhost:8000/api/v1/users/info?idNumber=${idNumber}`);
          console.log('Response from second API:', res.push(secondApiResponse.data.data));

          return secondApiResponse.data;
        } catch (error) {
          console.error('Error sending second query:', error);
          return null;
        }
      }));
      // console.log("res",res);
      let filter_res = res.filter(element => element !== null);
      setFiltered_List(filter_res);
      // console.log(res[0].firstName);
      // // Update the output state with the responses from the second API
      // // console.log('Second API responses:', secondApiResponses.type);
      // setOutput(secondApiResponses[0]);
      // console.log('Output:', output);
      // let res = [];
      // let temp1 = "";
      // let j = 1;
      // let count1 = 1;
      // console.log('output[0].length',output[0].length);
      // while (j < output[0].length) {
      //   if (count === 9) {
      //     res.push(temp1);
      //     temp1 = "";
      //     count1 = 1;
      //     j += 1;
      //   } else {
      //     temp1 = temp1 + output[0][j];
      //     count1 += 1;
      //   }
      //   j += 1;
      // }
      // console.log('res',res);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  // console.log('Filtered List:', Filtered_List);
  // const [inputValue, setInputValue] = useState("");
  // // const [data, setData] = useState(null);
  // const [Filtered_List, setFiltered_List] = useState(TA);






  // const  SendQuery = async () => {
  //   const userFormStatus = await axios.get(
  //     `http://localhost:8000/api/v1/users/ml_output?text=${inputValue}`
  //   );
  //   // console.log(inputValue);
  //   // console.log(userFormStatus.data);
  //   let data = []
  //   let temp = ""
  //   let i = 1;
  //   let count = 1
  //   while (i < userFormStatus.data[0].length){
  //     if (count === 9){
  //       data.push(temp)
  //       temp = ""
  //       count = 1
  //       i+=1
  //     }
  //     else{
  //       temp = temp + userFormStatus.data[0][i]
  //       count += 1
  //     }
  //     i += 1
  //   }
  //   console.log(data);

  //   // **************************
  //   let output = []

  //   useEffect(() => {
  //     // Call the second API when userFormStatus is not null (i.e., after the first API call has completed)
  //     if (userFormStatus !== null) {
  //       // Define an asynchronous function inside useEffect
  //       async function sendSecondQuery() {
  //         try {
  //           // Use the output of the first API as input for the second API
  //           const secondApiResponse = await axios.post('http://your-second-api-url', {
  //             data: userFormStatus // Assuming userFormStatus is the required data for the second API
  //           });
  //           // Process the response of the second API here
  //           console.log('Response from second API:', secondApiResponse.data);
  //           return secondApiResponse.data;
  //         } catch (error) {
  //           console.error('Error sending second query:', error);
  //           return null;
  //           // Optionally, you can handle errors here
  //         }
  //       }
  
  //       // Call the function to send the second query
  //       sendSecondQuery();

  //     }
  //   }, [userFormStatus]);


  // }
  

  return (
    <div>
      <Layout>
        <div className={Find.container}>
          <div className="flex justify-center w-full">
            <div className={Find.inputcontainer}>
              <input
                type="text"
                name="text"
                className={Find.input}
                placeholder="Find TA"
                value={inputValue}
                onChange={handleInputChange}
              />
              <span className={Find.icon} onClick={SendQuery}>
                <svg
                  width="19px"
                  height="19px"
                  color="#4a3c8d"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="1"
                      d="M14 5H20"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      opacity="1"
                      d="M14 8H17"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                      stroke="#000"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      opacity="1"
                      d="M22 22L20 20"
                      stroke="#000"
                      stroke-width="3.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </span>
            </div>{" "}
          </div>
          <div className={Find.TA_List}>
            {Filtered_List.map((ta, index) => (
              <div key={index} className={Find.TA_Entry}>
                <div className="md:h-full w-full md:w-1/4 flex justify-center">
                  <Image src={Photo} className="rounded-full" />
                </div>
                <div className="md:h-full px-24 w-full  md:w-2/5 flex flex-col justify-center">
                  <div className={Find.TA_Name}>{ta.firstName}</div>
                  <div className={Find.TA_Details}>{ta.idNumber}</div>
                  <div className={Find.TA_Details}>{ta.email}</div>
                  <div className={Find.TA_Details}>{ta.phone}</div>
                </div>
                <div className="md:h-full h-16 w-full md:w-1/5 flex flex-row content-center justify-center md:p-5">
                  <button
                    className={Find.Details}
                    onClick={() =>
                      router.push(`/Faculty/TA_Details/?idNumber=${ta.idNumber}`)
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
