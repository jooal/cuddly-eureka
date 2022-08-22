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
import {
  AddComment,
  ThumbUp,
  ExpandMore,
  Expand,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useAppContext } from "../Components/AppContext";

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

const rightColumn = p => {
  return (
    <Grid
      container
      item
      direction="column"
      gap={2}
      xs={2}
      justifyContent="center"
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "flex" }}
      >
        {/* {p.data.createdAt} */}2 hours ago
      </Typography>
      <Divider />
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
        direction="row"
        sx={{ paddingY: "36px", paddingX: "48px", display: "flex" }}
        gap="24px"
      >
        <Grid container item xs={12} md={8} direction="column">
          <Stack direction="column" spacing={2}>
            {postDetail.map(p => (
              <Card variant="outlined" sx={{ borderRadius: "8px" }}>
                <CardContent key={p.data.id}>
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
                      <Typography
                        color="text.secondary"
                        gutterBottom
                        variant="h6"
                      >
                        {p.data.topic}
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
                    // disabled={submitDisabled}
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
      </Grid>
    </React.Fragment>
  );
};
