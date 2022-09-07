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
  const { userId } = useAppContext();
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  const [tab, setTab] = useState("myposts");

  React.useEffect(() => {
    const postQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("createdByUserId", "==", userId)
    );

    const commentQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("commentedOnBy", "array-contains", userId)
    );

    if (tab === "myposts") {
      console.log("posts");
      onSnapshot(postQuery, querySnapshot => {
        setUserPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      console.log("comments");

      onSnapshot(commentQuery, querySnapshot => {
        setUserPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [userId, tab]);

  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        direction="row"
        sx={{ display: "flex", paddingBottom: "36px" }}
        justifyContent="center"
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
        item
        xs={10}
        md={8}
        direction="column"
        justifyContent="center"
        alignContent="center"
        sx={{ margin: "0 auto", marginBlockEnd: "48px" }}
      >
        <PostCard data={userPosts} />
      </Grid>
    </React.Fragment>
  );
};
