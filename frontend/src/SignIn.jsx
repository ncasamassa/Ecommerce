import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const [user, setUser] = useState({});

  const handleCredentialResponse = (response) => {
    console.log("JWT ID token", response.credential);

    let userObject = jwtDecode(response.credential);

    setUser(userObject);

    console.log(user);

    document.getElementById("buttonDiv").hidden = true;
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "505750731236-hlvm4snl6im3gujh4hr65vkqs21nj5vj.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div id="buttonDiv">
      <p>{user.user_name}</p>
    </div>
  );
};

export default SignIn;
