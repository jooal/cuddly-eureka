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
  onSnapshot,
  documentId,
  updateDoc,
  Timestamp,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { useAppContext } from "../Components/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export const Details = () => {
  const [postDetail, setPostDetail] = React.useState([]);
  const [postLike, setPostLike] = React.useState(false);
  const [showWidget, setShowWidget] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const { userId, displayName } = useAppContext();
  const { selectedPostId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const filterQuery = query(
      collection(db, "posts"),
      where(documentId(), "==", selectedPostId)
    );

    onSnapshot(filterQuery, querySnapshot => {
      setPostDetail(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [selectedPostId]);

  const handleSubmit = async e => {
    e.preventDefault();
    const docRef = doc(db, "posts", postDetail[0].id);
    try {
      await updateDoc(docRef, {
        comments: arrayUnion({
          comment: comment,
          createdAt: Timestamp.now(),
          createdByUser: displayName,
          createdByUserId: userId,
        }),
      }).then(() => {
        setShowWidget(false);
      });
    } catch (err) {
      alert(err);
    }
    setComment("");
  };

  const userComments =
    postDetail.map(p =>
      p?.data?.comments.sort((a, b) => b.createdAt - a.createdAt)
    ) ?? [];

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
          <Button
            onClick={() => {
              navigate("/");
            }}
            sx={{ justifyContent: "flex-start", width: "150px" }}
          >
            <KeyboardBackspaceIcon />
            <Typography>Home</Typography>
          </Button>
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
                      {p.data.comments.length} comments
                    </Typography>
                  </Grid>
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
          <>
            {userComments.map(c =>
              c.map((p, i) => {
                console.log("c", c);
                let currentView;
                if (c.length === 0) {
                  currentView = null;
                } else {
                  currentView = (
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
                }
                return currentView;
              })
            )}
          </>
        </Stack>
      </Grid>
    </React.Fragment>
  );
};
