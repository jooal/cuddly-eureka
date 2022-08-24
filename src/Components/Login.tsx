import { Box, Button } from "@mui/material";
import { signInWithGoogle } from "../firebase/firebaseConfig";

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
