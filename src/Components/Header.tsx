import * as React from "react";
import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Grid,
  Button,
  Avatar,
  Drawer,
  Link,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, userSignOut } from "../firebase/firebaseConfig";
import { useAppContext } from "./AppContext";
import { Login } from "../Components/Login";
import StreamIcon from "@mui/icons-material/Stream";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const { userIsLoggedIn, setUserIsLoggedIn, avatar } = useAppContext();

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "36px" }}>
      <AppBar position="static" sx={{ backgroundColor: "AppWorkspace" }}>
        <Toolbar>
          <Link
            variant="button"
            sx={{
              color: "black",
              textDecoration: "none",
              fontSize: "24px",
              "&:hover": {
                color: "#2979ff",
                background: "none",
                cursor: "pointer",
              },
              display: { xs: "none", sm: "block" },
              flexGrow: 1,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Grid container alignItems="center" sx={{ display: "flex" }}>
              <StreamIcon />
              GroundWork
            </Grid>
          </Link>
          {isMobile || isSmall ? (
            <>
              <Button variant="text" onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
              </Button>

              <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{ padding: "24px", width: "150" }}
                >
                  <Link
                    onClick={() => {
                      if (userIsLoggedIn) {
                        navigate("/new");
                      } else {
                        signInWithGoogle();
                      }
                    }}
                  >
                    New Topic
                  </Link>
                  {userIsLoggedIn && (
                    <Link
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </Link>
                  )}
                  <Link
                    onClick={() => {
                      if (userIsLoggedIn) {
                        userSignOut();
                      } else {
                        signInWithGoogle();
                      }
                    }}
                  >
                    {userIsLoggedIn ? "Logout" : "Login"}
                  </Link>
                </Stack>
              </Drawer>
            </>
          ) : (
            <>
              <Grid
                container
                sx={{ display: "flex", width: "fit-content" }}
                justifyContent="flex-end"
              >
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
