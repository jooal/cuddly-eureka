import {
  Card,
  CardContent,
  Link,
  Stack,
  Grid,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import * as React from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { Box } from "@mui/system";

interface DiscussionProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const leftColumn = (
  <Grid
    container
    item
    xs={2}
    direction="column"
    gap={2}
    justifyContent="center"
    alignItems="center"
  >
    <Avatar />
    <Divider />
  </Grid>
);

const rightColumn = p => (
  <Grid
    container
    item
    direction="column"
    gap={2}
    xs={2}
    justifyContent="center"
  >
    <Typography variant="body2" color="text.secondary" sx={{ display: "flex" }}>
      {/* {p.data.createdAt} */}2 hours ago
    </Typography>
    <Divider />
    <Typography sx={{ display: "flex" }} variant="body2" color="text.secondary">
      {p.data.commentCount} comments
    </Typography>
  </Grid>
);

/** Threads are sorted by newest post by default. */

export const Discussion = ({ filter, setFilter }: DiscussionProps) => {
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
    <Stack direction="column" spacing={2}>
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
                gap={4}
                sx={{ padding: "12px", display: "inline-flex" }}
              >
                {leftColumn}
                <Grid
                  container
                  item
                  direction="column"
                  xs={6}
                  justifyContent="center"
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
                    <Typography className="item" sx={{ fontSize: 14 }}>
                      <Link variant="inherit">{p.data.tag}</Link>
                    </Typography>
                  </Stack>
                </Grid>
                {rightColumn(p)}
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
