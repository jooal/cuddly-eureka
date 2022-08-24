import {
  Card,
  CardContent,
  Link,
  Stack,
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
} from "@mui/material";
import * as React from "react";
import { db, signInWithGoogle } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "./AppContext";
import timeAgo from "./timeago";

interface DiscussionProps {
  filter: string;
  setFilter: (filter: string) => void;
  userId: string;
}

// const leftColumn = (
//   <Grid
//     container
//     item
//     xs={2}
//     direction="column"
//     gap={2}
//     justifyContent="center"
//     alignItems="center"
//   >
//     <Avatar />
//     <Divider />
//   </Grid>
// );

const RightColumn = p => {
  const navigate = useNavigate();
  // const { setPostId, postId } = useAppContext();
  const { selectedPostId } = useParams();
  const { userIsLoggedIn } = useAppContext();
  // const time = new Date(p.data.createdAt).getHour();

  const detailId = p.p.id;

  return (
    <Grid
      container
      item
      direction="column"
      xs={12}
      md={2}
      justifyContent="center"
      sx={{ paddingTop: "12px" }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          // setPostId(detailId);
          if (userIsLoggedIn) {
            navigate(`/${detailId}`);
          } else {
            signInWithGoogle();
          }
        }}
      >
        <Typography
          sx={{ display: "flex" }}
          variant="body2"
          color="text.secondary"
        >
          {p.p.data.commentCount} comments
        </Typography>
      </Button>
    </Grid>
  );
};

/** Threads are sorted by newest post by default. */

export const Discussion = ({ filter, setFilter, userId }: DiscussionProps) => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const filterQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("tag", "==", filter)
    );

    if (filter !== "" && filter !== "All") {
      onSnapshot(filterQuery, querySnapshot => {
        setPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      onSnapshot(q, querySnapshot => {
        setPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [filter]);

  return (
    <Stack direction="column" spacing={2} sx={{ width: "inherit" }}>
      {posts.map(p => (
        <Card variant="outlined" sx={{ borderRadius: "8px" }}>
          {posts.length === 0 ? (
            <Box>
              <Typography sx={{ justifyContent: "center" }} variant="h4">
                No posts yet
              </Typography>
            </Box>
          ) : (
            <CardContent id={p.id}>
              <Grid
                container
                direction="row"
                xs={12}
                sx={{ padding: "12px", display: "flex" }}
                justifyContent="space-between"
              >
                <Grid
                  container
                  item
                  direction="column"
                  xs={10}
                  md={10}
                  justifyContent="center"
                  sx={{ overflow: "hidden" }}
                >
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    {p.data.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {p.data.description}
                  </Typography>
                  <Stack direction="row">
                    <Typography
                      className="item"
                      sx={{ fontSize: 14, color: "grey", paddingRight: "12px" }}
                    >
                      {p.data.tag}
                    </Typography>
                    <Typography
                      className="item"
                      color="text.secondary"
                      sx={{ fontSize: 14 }}
                    >
                      {p.data.createdByUser} 2 hours ago
                    </Typography>
                  </Stack>
                </Grid>
                <RightColumn p={p} />
              </Grid>
            </CardContent>
          )}

          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      ))}
    </Stack>
  );
};
