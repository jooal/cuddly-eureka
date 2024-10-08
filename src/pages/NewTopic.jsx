import * as React from "react";
import {
  Grid,
  Stack,
  TextField,
  TextareaAutosize,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Header } from "../Components/Header";
import { db } from "../../src/firebase/firebaseConfig";
import { collection, addDoc, Timestamp, documentId } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AppProvider, useAppContext } from "../Components/AppContext";
// import { randomUUID } from "crypto";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const categories = [
  {
    id: 1,
    name: "Health Tech",
  },
  {
    id: 2,
    name: "Education",
  },
  {
    id: 3,
    name: "Ecommerce",
  },
  {
    id: 4,
    name: "SaaS",
  },
  {
    id: 5,
    name: "IT",
  },
  {
    id: 6,
    name: "Insurance",
  },
  {
    id: 7,
    name: "Real Estate",
  },
  {
    id: 8,
    name: "Environmental & Energy",
  },
  {
    id: 9,
    name: "FinTech",
  },
  {
    id: 10,
    name: "Marketing & Advertising",
  },
];

export const NewTopic = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const navigate = useNavigate();

  const { userId, displayName } = useAppContext();

  const submitDisabled = title === "" || description === "" || tag === "";

  const handleChange = value => {
    if (tag === "") {
      setTag(value);
    } else if (tag === value) {
      setTag("");
    } else {
      setTag(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        description: description,
        createdByUserId: userId,
        createdByUser: displayName,
        createdAt: Timestamp.now(),
        tag: tag,
        commentCount: 0,
        comments: [],
        upvotes: 0,
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      alert(err);
      setFormError("Oops, something went wrong. Try again.");
    }
  };
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
        sx={{ margin: "0 auto", marginBlockEnd: "36px" }}
      >
        <Button
          onClick={() => {
            navigate("/");
          }}
          sx={{
            justifyContent: "flex-start",
            width: "150px",
            marginBlockEnd: "24px",
          }}
        >
          <KeyboardBackspaceIcon />
          <Typography>Home</Typography>
        </Button>
        <Stack direction="row" spacing={4}>
          <FormControl
            sx={{
              padding: "36px",
              backgroundColor: "AppWorkspace",
            }}
          >
            <Stack direction="column" spacing={2}>
              <TextField
                required
                id="outlined"
                label="Topic"
                placeholder="Topic"
                sx={{ marginY: "12px" }}
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
              <TextareaAutosize
                aria-label="New Topic Form"
                minRows={3}
                value={description}
                required
                placeholder="Explain your idea here. (Ex: 1. Who is this for? 2. What does it solve? 3. How do you build it?)"
                style={{
                  minHeight: 70,
                  borderRadius: "8px",
                  fontFamily: "Fira Sans",
                  padding: "8px",
                }}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
              <Stack direction="row" sx={{ display: "block" }}>
                <div>Select a tag (required):</div>
                {categories.map(c => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          handleChange(c.name);
                        }}
                        checked={tag === c.name}
                      />
                    }
                    key={c.id}
                    label={c.name}
                    value={c.name}
                  ></FormControlLabel>
                ))}
              </Stack>

              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={submitDisabled}
                >
                  Submit
                </Button>
              </Grid>
            </Stack>
          </FormControl>
          {/* <SidePanel /> */}
        </Stack>
      </Grid>
    </React.Fragment>
  );
};
