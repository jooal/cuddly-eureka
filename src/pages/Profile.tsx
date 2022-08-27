import * as React from "react";
import { useState } from "react";
import {
  Grid,
  Stack,
  Card,
  Button,
  Typography,
  CardContent,
} from "@mui/material";
import { Header } from "../Components/Header";
import { useAppContext } from "../Components/AppContext";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { PostCard } from "../Components/Card";

// type Tabs = "mycomments" | "myposts";
// interface ProfileProps {
//  SelectedTab: Tabs;
// }

export const Profile = () => {
  const { userEmail, setUserEmail, userId } = useAppContext();
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);

  const [tab, setTab] = useState("myposts");

  console.log(userPosts);

  React.useEffect(() => {
    const postQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("createdByUserId", "==", userId)
    );

    const commentQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("comments.createdByUserId", "array-contains", {
        createdByUserId: userId,
      })
    );

    if (tab === "myposts") {
      onSnapshot(postQuery, querySnapshot => {
        setUserPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      onSnapshot(commentQuery, querySnapshot => {
        setUserPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [setUserEmail, userId, tab]);

  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        item
        xs={12}
        md={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ display: "flex" }}
      >
        <Button
          variant="text"
          onClick={() => {
            setTab("myposts");
          }}
          sx={{ textDecoration: tab === "myposts" ? "underline" : "none" }}
        >
          My Posts
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setTab("mycomments");
          }}
          sx={{
            textDecoration: tab === "mycomments" ? "underline" : "none",
          }}
        >
          Posts I've Commented On
        </Button>
      </Grid>
      <Grid
        container
        direction="row"
        sx={{ paddingY: "36px", paddingX: "48px", display: "flex" }}
        gap="24px"
      >
        <Grid container item xs={12} md={8} direction="column">
          <PostCard data={userPosts} />
        </Grid>
        <Grid container item xs={12} md={3} direction="column">
          <Stack direction="column">
            <Card variant="outlined" sx={{ borderRadius: "8px" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  {userEmail}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
