import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { signInWithGoogle } from "../firebase/firebaseConfig";
import { useAppContext } from "./AppContext";

export const Login = () => {
  return (
    <Box className="App" sx={{ display: "flex" }}>
      <Button
        variant="text"
        className="login-with-google-btn"
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};
