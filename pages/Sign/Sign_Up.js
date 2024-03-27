import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import {
  isValidName,
  isValidEmail,
  isValidContact,
  isValidPassword,
  isValidIdNumber,
} from "../../utils/validation";

import iitbhilai from "../../public/image 7.png";
import sign from "./Sign_Up.module.css";
import college from "../../public/group_logo.svg";

export default function Sign_Up() {
  const [ID_Number, setID_Number] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idNumberErrorMessage, setIdNumberErrorMessage] = useState("");
  const [fnameErrorMessage, setFnameErrorMessage] = useState("");
  const [lnameErrorMessage, setLnameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [contactErrorMessage, setContactErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); // Changed to string
  const [passwordMatchErrorMessage, setPasswordMatchErrorMessage] =
    useState("");

  const router = useRouter();

  const navigateToAboutPage = (idNumber) => {
    router.push(`/Personal_Info?idNumber=${idNumber}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchErrorMessage("Password not matched");
      return;
    }

    if (
      idNumberErrorMessage ||
      fnameErrorMessage ||
      lnameErrorMessage ||
      emailErrorMessage ||
      contactErrorMessage ||
      passwordErrorMessage ||
      !passwordMatchErrorMessage
    ) {
      return;
    }

    const data = {
      idNumber: ID_Number,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      password: password,
    };

    try {
      const resp = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        data
      );
      console.log(resp.data);
      if (resp.data.statusCode === 200 && resp.data.success) {
        navigateToAboutPage(resp.data.data.user.idNumber);
      }else {
        console.log("User Already Exists!");
      }
    } catch (error) {
      console.log("User Already Exists!");
      setStatusMessage("User Already Exists!"); // Set the error message
      setTimeout(() => {
        setStatusMessage(""); // Clear the status message after 3 seconds
      }, 3000);
      console.error("Error:", error);
    }
  };
  useEffect(() => { }, [statusMessage,setStatusMessage]);

  return (
    <div className={sign.content}>
      <div className={sign.whitebox}>
        <div className={sign.left}>
          <div className={sign.image}>
            <Image src={college} className={sign.logo} />
            <Image src={iitbhilai} className={sign.logoname} />
          </div>
        </div>
        <div className={sign.form}>
          <div className={sign.Head}>Sign Up</div>
          <form style={{ height: "fit-content" }} onSubmit={handleSubmit}>
            <div className={sign.Forms}>
              <input
                className={sign.input}
                placeholder="ID Number"
                value={ID_Number}
                type="number"
                onChange={(event) => setID_Number(event.target.value)}
                onBlur={(event) =>
                  isValidIdNumber(event.target.value)
                    ? setIdNumberErrorMessage("")
                    : setIdNumberErrorMessage("Id is not valid")
                }
                required
              />
              {idNumberErrorMessage && (
                <div style={{ color: "red" }} className={sign.message}>
                  {idNumberErrorMessage}
                </div>
              )}
              <input
                className={sign.input}
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={(event) =>
                  isValidName(event.target.value)
                    ? setFnameErrorMessage("")
                    : setFnameErrorMessage("First name is not valid")
                }
                required
              />
              {fnameErrorMessage && (
                <div style={{ color: "red" }} className={sign.message}>
                  {fnameErrorMessage}
                </div>
              )}
              <input
                className={sign.input}
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                onBlur={(event) =>
                  isValidName(event.target.value)
                    ? setLnameErrorMessage("")
                    : setLnameErrorMessage("Last name is not valid")
                }
                required
              />
              {lnameErrorMessage && (
                <div style={{ color: "red" }} className={sign.message}>
                  {lnameErrorMessage}
                </div>
              )}
              <input
                className={sign.input}
                placeholder="Email Id"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={(event) =>
                  isValidEmail(event.target.value)
                    ? setEmailErrorMessage("")
                    : setEmailErrorMessage("Email is not valid")
                }
                type="email"
                required
              />
              {emailErrorMessage && (
                <div style={{ color: "red" }} className={sign.message}>
                  {emailErrorMessage}
                </div>
              )}
              <input
                className={sign.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                onBlur={(event) =>
                  isValidContact(event.target.value)
                    ? setContactErrorMessage("")
                    : setContactErrorMessage("Contact number is not valid")
                }
                type="text"
                required
              />
              {contactErrorMessage && (
                <div style={{ color: "red" }} className={sign.message}>
                  {contactErrorMessage}
                </div>
              )}
              <input
                className={sign.input}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={(event) =>
                  isValidPassword(event.target.value)
                    ? setPasswordErrorMessage("")
                    : setPasswordErrorMessage(`Password must be 8-15 characters long and include at least one:
                    digit (0-9), 
                    lowercase letter (a-z)
                    uppercase letter (A-Z)
                    special character from @$!%*?&`)
                }
                required
              />
              {passwordErrorMessage && (
                <div style={{ color: "red" }} className={sign.message}>
                  {passwordErrorMessage}
                </div>
              )}
              <input
                className={sign.input}
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onBlur={(event) =>
                  setConfirmPassword(event.target.value) === password
                    ? setPasswordMatchErrorMessage("")
                    : setPasswordMatchErrorMessage("Password not matched")
                }
                required
              />
              {password !== confirmPassword ? (
                <div className={sign.long_message}>
                  <div style={{ color: "red" }}>
                    {passwordMatchErrorMessage}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* <Link href="/Sign/Sign_In"> */}
              <button type="submit" className={sign.submit}>
                Sign Up
              </button>
              {/* </Link> */}
            </div>
            {statusMessage && (
              <div style={{ color: "red" }} >
                {statusMessage}
              </div>
            )}
          </form>
          <Link href="/Sign/Sign_In">
            <p className={sign.already}> Already Have an Account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
