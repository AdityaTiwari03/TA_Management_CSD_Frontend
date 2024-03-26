import Image from "next/image";
import google from  "../../public/image 8.png";
import sign from "./Sign_In.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

const handleSignInGoolgle = () => {
    signIn("google")
}

export default function SignInBtn() {
    return (
        <div className={sign.google} onClick={handleSignInGoolgle}>
            <Image src={google} className={sign.google_img}/>
            Sign In by Google
      </div>
    )
}