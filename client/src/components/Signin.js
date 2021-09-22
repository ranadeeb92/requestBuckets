import { useState } from "react";

const Signin = (userToken) => {
  let [username, setUsername] = useState(null);
  let [password, setPassword] = useState(null);

  const signin = async () => {
    let res = await fetch("http://localhost:5000/signin", { method: "POST" });
    let data = await res.json();
    // save the token in local storage
    // set the userToken state
  };
  return (
    <div>
      <label>UserName:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="paswword"
      />
      <br />
      <button onClick={signin}>Sgin In</button>
    </div>
  );
};

export default Signin;
