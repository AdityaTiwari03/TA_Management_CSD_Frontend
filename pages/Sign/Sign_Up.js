import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import iitbhilai from "../../public/image 7.png";
import sign from "./Sign_Up.module.css";
import college from "../../public/group_logo.svg";
import google from "../../public/image 8.png";
import axios from "axios";
import { isValidName, isValidEmail, isValidContact, isValidPassword, isValidIdNumber } from "../../utils/validation";

export default function Sign_Up() {
  const [ID_Number, setID_Number] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [idNumberErrorMessage, setIdNumberErrorMessage] = useState('');
  const [fnameErrorMessage, setFnameErrorMessage] = useState('');
  const [lnameErrorMessage, setLnameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [contactErrorMessage, setContactErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordMatchErrorMessage, setPasswordMatchErrorMessage] = useState('');

  const handleSubmit = async () => {
    // Do something with the form data
    console.log("ID Number:", ID_Number);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    const data = {
      idNumber: ID_Number,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      password: password,
    }

    const reqdata = await axios.post("http://localhost:8000/api/v1/users/register", data);
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
                onBlur={(event) => isValidIdNumber(event.target.value) ? setIdNumberErrorMessage('') : setIdNumberErrorMessage('Id is not valid')}
                required
              />
              {idNumberErrorMessage && <div style={{ color: 'red' }}>{idNumberErrorMessage}</div>}
              <input
                className={sign.input}
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={(event) => isValidName(event.target.value) ? setFnameErrorMessage('') : setFnameErrorMessage('First name is not valid')}
                required
              />
              {fnameErrorMessage && <div style={{ color: 'red' }}>{fnameErrorMessage}</div>}
              <input
                className={sign.input}
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                onBlur={(event) => isValidName(event.target.value) ? setLnameErrorMessage('') : setLnameErrorMessage('Last name is not valid')}
                required
              />
              {lnameErrorMessage && <div style={{ color: 'red' }}>{lnameErrorMessage}</div>}
              <input
                className={sign.input}
                placeholder="Email Id"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={(event) => isValidEmail(event.target.value) ? setEmailErrorMessage('') : setEmailErrorMessage('Email is not valid')}
                type="email"
                required
              />
              {emailErrorMessage && <div style={{ color: 'red' }}>{emailErrorMessage}</div>}
              <input
                className={sign.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                onBlur={(event) => isValidContact(event.target.value) ? setContactErrorMessage('') : setContactErrorMessage('Contact number is not valid')}
                type="text"
                required
              />
              {contactErrorMessage && <div style={{ color: 'red' }}>{contactErrorMessage}</div>}
              <input
                className={sign.input}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={(event) => isValidPassword(event.target.value) ? setPasswordErrorMessage('') :
                  setPasswordErrorMessage(`Password must be 8 to 15 character long.
                Must contain atleast one digit, small and capital alphabate 
                and one specical character from this [@$!%*?&].`)}
                required
              />
              {passwordErrorMessage && <div style={{ color: 'red' }}>{passwordErrorMessage}</div>}
              <input
                className={sign.input}
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onBlur={(event) => setConfirmPassword(event.target.value) === password ? setPasswordMatchErrorMessage('') : setPasswordMatchErrorMessage('Password not matched')}
                required
              />
              {password !== confirmPassword ? <div style={{ color: 'red' }}>{passwordMatchErrorMessage}</div> : ''}
              {/* <Link href="/Sign/Sign_In"> */}
              <button type="submit" className={sign.submit} >Sign Up
               </button>
              {/* </Link> */}
            </div>
          </form>
          <Link href="/Sign/Sign_In">
          <p className={sign.already}> Already Have an Account?</p>
          </Link>
          <div className={sign.google}>
            <Image src={google} className={sign.google_img} />
            Sign Up by Google
              </div>
        </div>
      </div>
    </div>
  );
}
