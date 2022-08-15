import { signInWithGoogle } from "../firebase/firebaseConfig";

export const Login = () => {
  return (
    <div className="App">
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img alt="" src={localStorage.getItem("profilePic") ?? ""} />
    </div>
  );
};
