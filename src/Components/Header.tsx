import * as React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Grid,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, userSignOut } from "../firebase/firebaseConfig";
import { useAppContext } from "./AppContext";
import { Login } from "../Components/Login";

export const Header = () => {
  const navigate = useNavigate();
  const { userIsLoggedIn, setUserIsLoggedIn, avatar } = useAppContext();

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
          <Grid container sx={{ display: "flex" }} justifyContent="flex-end">
            <Button
              sx={{ ml: "24px", backgroundColor: "#282828" }}
              variant="contained"
              onClick={() => {
                if (userIsLoggedIn) {
                  navigate("/new");
                } else {
                  signInWithGoogle();
                }
              }}
            >
              Start New Topic
            </Button>
            {!userIsLoggedIn ? (
              <Login />
            ) : (
              <Button
                variant="text"
                sx={{ color: "#282828" }}
                onClick={() => {
                  userSignOut();
                  navigate("/");
                  setUserIsLoggedIn(false);
                }}
              >
                Sign Out
              </Button>
            )}
          </Grid>
          {userIsLoggedIn && (
            <Button
              variant="text"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <Avatar src={avatar} />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
