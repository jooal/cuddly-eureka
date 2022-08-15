import * as React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, userSignOut } from "../firebase/firebaseConfig";
import { AppContext, useAppContext } from "./AppContext";
import { Login } from "../Components/Login";

export const Header = () => {
  const navigate = useNavigate();
  const { userIsLoggedIn, settUserIsLoggedIn } = useAppContext();
  console.log(userIsLoggedIn);

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "36px" }}>
      <AppBar position="static" sx={{ backgroundColor: "AppWorkspace" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
              flexGrow: 1,
              "&:hover": {
                background: "none",
                cursor: "pointer",
              },
            }}
          >
            <Link
              variant="button"
              sx={{ color: "black", textDecoration: "none" }}
              onClick={() => {
                navigate("/");
              }}
            >
              GroundWork
            </Link>
          </Typography>
          <Button
            sx={{ ml: "24px" }}
            variant="contained"
            onClick={() => {
              navigate("/new");
            }}
          >
            Start New Topic
          </Button>
          {userIsLoggedIn ? (
            <Login />
          ) : (
            <Button
              variant="text"
              onClick={() => {
                userSignOut();
                //only navigate if sign out is successful
                navigate("/");
                settUserIsLoggedIn(false);
              }}
            >
              Sign Out
            </Button>
          )}
          <Button
            variant="text"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <Avatar />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
