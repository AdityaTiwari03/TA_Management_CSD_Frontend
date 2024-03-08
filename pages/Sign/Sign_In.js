import React from "react";
import Image from "next/image";
import iitbhilai from "../../public/image 7.png";
import sign from "./Sign_In.module.css";
import Link from "next/link";
import college from "../../public/group_logo.svg";
import google from "../../public/image 8.png";
import { useState } from "react";
import {isValidPassword, isValidIdNumber} from "../../utils/validation";

export default function Sign_In() {
  const [ID_Number, setID_Number] = useState("");
  const [password, setPassword] = useState("");

  const [idNumberErrorMessage, setIdNumberErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = () => {
    // Do something with the form data
    console.log("ID Number:", ID_Number);
    console.log("Password:", password);
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
          <div className={sign.Head}>Log In</div>

          <div className={sign.Forms}>
            <input
              className={sign.input}
              placeholder="ID Number"
              value={ID_Number}
              type="text"
              onChange={(event) => setID_Number(event.target.value)}
              onBlur={(event) => isValidIdNumber(event.target.value) ? setIdNumberErrorMessage('') : setIdNumberErrorMessage('Id is not valid')} 
              required
            />
             {idNumberErrorMessage && <div style={{ color: 'red' }}>{idNumberErrorMessage}</div>}
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
            <Link href="/Personal_Info">
              {" "}
              <button className={sign.button} onClick={handleSubmit}>
                Log In
              </button>
            </Link>
            <p className={sign.already}> Already Have an Account?</p>
            <div className={sign.google}>
              <Image src={google} className={sign.google_img} />
              Sign Up by Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
