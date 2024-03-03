import React, { useContext } from "react";
import AuthContext from "../shared/context/AuthContex";
import SignUp from "../logger/components/SingUp";
import SignIn from "../logger/components/SingIn";

function LoginPage() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <SignIn></SignIn>
    </div>
  );
}

export default LoginPage;
