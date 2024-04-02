import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
// import { useRouter } from "next/router";
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
import { useRouter } from "next/router";

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
  const [passwordMatchErrorMessage, setPasswordMatchErrorMessage] =
    useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const router = useRouter();

  const navigateToAboutPage = (idNumber) => {
    router.push(`/Professional_Info?idNumber=${idNumber}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        return "";
      } else {
        const data = {
          idNumber: ID_Number,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phoneNumber,
          password: password,
        };

        // Make post request
        try {
          const resp = await axios.post(
            `https://ta-backend-new.vercel.app/api/v1/users/register`,
            data
          );
          if (resp.data.statusCode === 200 && resp.data.success) {
            console.log(resp.data);
            localStorage.setItem("idNumber", ID_Number);
            console.log(resp.data.data.user.idNumber);
            navigateToAboutPage(resp.data.data.user.idNumber);
          }
        } catch (error) {
          if (
            error.response.data.statusCode === 409 &&
            !error.response.data.success
          ) {
            setStatusMessage(error.response.data.message);
          } else if (
            error.response.data.statusCode === 400 &&
            !error.response.data.success
          ) {
            setStatusMessage(error.response.data.message);
          }
        }
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
              <div style={{ color: "red" }} className={sign.message}>
                User Already Exist!
              </div>
            )}
          </form>
          <Link href="/Sign/Sign_In">
            <p className={sign.message}> Already Have an Account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
