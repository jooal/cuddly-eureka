import React from "react";
import { useState, useRef } from "react";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TerminalIcon from "@mui/icons-material/Terminal";
import ComputerIcon from "@mui/icons-material/Computer";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import HouseIcon from "@mui/icons-material/House";
import ForestIcon from "@mui/icons-material/Forest";
import PaidIcon from "@mui/icons-material/Paid";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  Card,
  CardContent,
  Stack,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/firebaseConfig";
import { useAppContext } from "./AppContext";
import { pluralize } from "../Components/utils";
import { ArrowCircleUp, ArrowCircleDown } from "@mui/icons-material";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface PostCardProps {
  data: any;
}

export const PostCard = ({ data }: PostCardProps) => {
  const navigate = useNavigate();
  const { userIsLoggedIn } = useAppContext();
  let btnRef = useRef();
  const [liked, setLiked] = useState(false);

  return (
    <Stack direction="column" spacing={2} sx={{ width: "inherit" }}>
      {data.map(p => {
        const tag = p.data.tag;
        const detailId = p.id;
        const dataUpvote = p.data.upvote;

        async function handleUpvote(e) {
          e.preventDefault();
          const docRef = doc(db, "posts", detailId);
          if (!liked) {
            try {
              await updateDoc(docRef, {
                upvotes: increment(1),
              });
              setLiked(true);
            } catch (err) {
              alert(err);
            }
          } else {
            try {
              await updateDoc(docRef, {
                upvotes: dataUpvote <= 1 ? 0 : increment(-1),
              });
              setLiked(false);
            } catch (err) {
              alert(err);
            }
          }
        }

        let tagIcon;
        switch (tag) {
          case "Health Tech":
            tagIcon = <HealthAndSafetyIcon color="primary" />;
            break;
          case "Education":
            tagIcon = <SchoolIcon sx={{ color: "#ff9800" }} />;
            break;
          case "Ecommerce":
            tagIcon = <ShoppingCartIcon sx={{ color: "#4245f5" }} />;
            break;
          case "SaaS":
            tagIcon = <TerminalIcon sx={{ color: "#3f51b5" }} />;
            break;
          case "IT":
            tagIcon = <ComputerIcon />;
            break;
          case "Insurance":
            tagIcon = <CarCrashIcon color="error" />;
            break;
          case "Real Estate":
            tagIcon = <HouseIcon sx={{ color: "#ffb300" }} />;
            break;
          case "Environmental & Energy":
            tagIcon = <ForestIcon sx={{ color: "#00a152" }} />;
            break;
          case "FinTech":
            tagIcon = <PaidIcon color="success" />;
            break;
          case "Marketing & Advertising":
            tagIcon = <NewspaperIcon sx={{ color: "#e91e63" }} />;
            break;
        }
        return (
          <Card variant="outlined" sx={{ borderRadius: "8px" }}>
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
                  xs={12}
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
                  <Stack direction="row" sx={{ paddingTop: "4px" }}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={{ xs: 1, sm: 1, md: 1 }}
                    >
                      {tagIcon}
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
                    </Stack>

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
                  <Button
                    ref={btnRef}
                    data-test-id="upvote-btn"
                    onClick={handleUpvote}
                  >
                    {p?.data?.upvotes}
                    {liked ? <ArrowCircleDown /> : <ArrowCircleUp />}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
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
                      {pluralize(p.data.comments.length, "comment")}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};
