import * as React from "react";
import {
  Grid,
  Stack,
  Card,
  Link,
  Box,
  Divider,
  Button,
  Avatar,
  Typography,
  TextField,
  TextareaAutosize,
  FormControl,
  CardContent,
} from "@mui/material";
import { Header } from "../Components/Header";
import {
  collection,
  query,
  doc,
  orderBy,
  onSnapshot,
  documentId,
  updateDoc,
  Timestamp,
  where,
  arrayUnion,
  FieldPath,
  Firestore,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { useAppContext } from "../Components/AppContext";

const rightColumn = p => {
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
      <Typography
        sx={{ display: "flex" }}
        variant="body2"
        color="text.secondary"
      >
        {p.data.commentCount} comments
      </Typography>
    </Grid>
  );
};

export const Details = () => {
  const postId = "123";
  const [postDetail, setPostDetail] = React.useState([]);
  const [postLike, setPostLike] = React.useState(false);
  const [showWidget, setShowWidget] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const { userId, userName } = useAppContext();

  React.useEffect(() => {
    const filterQuery = query(
      collection(db, "posts"),
      where("id", "==", postId)
    );

    onSnapshot(filterQuery, querySnapshot => {
      setPostDetail(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const docRef = doc(db, "posts", postDetail[0].id);
    try {
      await updateDoc(docRef, {
        comments: arrayUnion({
          comment: comment,
          createdAt: Timestamp.now(),
          createdByUser: userName,
          createdByUserId: userId,
        }),
      }).then(() => {
        setShowWidget(false);
      });
    } catch (err) {
      alert(err);
    }
  };

  const userComments = postDetail.map(p =>
    p.data.comments.sort((a, b) => b.createdAt - a.createdAt)
  );

  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        item
        xs={10}
        md={8}
        direction="column"
        justifyContent="center"
        alignContent="center"
        sx={{ margin: "0 auto" }}
      >
        <Stack direction="column" spacing={2} sx={{ width: "inherit" }}>
          {postDetail.map(p => (
            <Card variant="outlined" sx={{ borderRadius: "8px" }}>
              <CardContent key={p.data.id}>
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
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="h6"
                    >
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
                        sx={{
                          fontSize: 14,
                          color: "grey",
                          paddingRight: "12px",
                        }}
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
                  {rightColumn(p)}
                </Grid>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="text"
            onClick={() => {
              setShowWidget(true);
            }}
          >
            Add a comment
          </Button>
          {showWidget && (
            <Card>
              <CardContent>
                <Stack direction="column" spacing={2}>
                  <FormControl
                    sx={{
                      backgroundColor: "AppWorkspace",
                      margin: "0 auto",
                      width: "100%",
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      sx={{ margin: "0 auto" }}
                      justifyContent="center"
                      gap={2}
                    >
                      <TextareaAutosize
                        aria-label="New Topic Form"
                        minRows={3}
                        value={comment}
                        required
                        style={{
                          borderRadius: "8px",
                          fontFamily: "Fira Sans",
                          padding: "8px",
                        }}
                        onChange={e => {
                          setComment(e.target.value);
                        }}
                      />
                    </Grid>
                  </FormControl>
                </Stack>
              </CardContent>
              <Grid
                container
                gap={2}
                justifyContent="flex-end"
                sx={{ marginBlockEnd: "12px", paddingRight: "12px" }}
              >
                <Button
                  onClick={() => {
                    setShowWidget(false);
                  }}
                  variant="outlined"
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="small"
                  disabled={comment.trim() === ""}
                >
                  Submit
                </Button>
              </Grid>
            </Card>
          )}
          {userComments.map(c =>
            c.map((p, i) => {
              return (
                <Card key={i}>
                  <CardContent>
                    <Grid
                      container
                      direction="row"
                      xs={12}
                      sx={{ padding: "12px" }}
                    >
                      <Grid item xs={1}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {p.createdByUser}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {p.comment}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        justifyContent="flex-end"
                        sx={{ display: "flex" }}
                      >
                        <Button
                          key={i}
                          onClick={() => {
                            if (postLike) {
                              setPostLike(false);
                            } else {
                              setPostLike(true);
                            }
                          }}
                        >
                          {postLike ? <ThumbUp /> : <ThumbUpAltOutlined />}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Stack>
      </Grid>
    </React.Fragment>
  );
};
