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
  CardContent,
} from "@mui/material";
import { Header } from "../Components/Header";

const data = [
  {
    id: 123,
    topic: "my discussion",
    description: "my description",
    tag: "Health Tech",
    commentCount: 3,
  },
];

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
      {p.commentCount} comments
    </Typography>
  </Grid>
);

export const Profile = () => {
  return (
    <React.Fragment>
      <Header />
      <Grid
        justifyContent="center"
        alignItems="center"
        sx={{ display: "flex" }}
      >
        <Button variant="text">My Threads</Button>
        <Button variant="text">My Comments</Button>
      </Grid>
      <Grid
        container
        direction="row"
        sx={{ paddingY: "36px", paddingX: "48px", display: "flex" }}
        gap="24px"
      >
        <Grid container item xs={12} md={8} direction="column">
          <Stack direction="column" spacing={2}>
            {data.map(p => (
              <Card variant="outlined" sx={{ borderRadius: "8px" }}>
                {data.length === 0 ? (
                  <Box>
                    <Typography sx={{ justifyContent: "center" }} variant="h4">
                      No posts yet
                    </Typography>
                  </Box>
                ) : (
                  <CardContent key={p.id}>
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
                          {p.topic}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {p.description}
                        </Typography>
                        <Stack direction="row">
                          <Typography className="item" sx={{ fontSize: 14 }}>
                            <Link variant="inherit">{p.tag}</Link>
                          </Typography>
                        </Stack>
                      </Grid>
                      {rightColumn(p)}
                    </Grid>
                  </CardContent>
                )}
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid container item xs={12} md={3} direction="column">
          <Stack direction="column">
            <Card variant="outlined" sx={{ borderRadius: "8px" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  Sadie Beans
                </Typography>
                <Typography color="text.secondary" gutterBottom variant="body2">
                  useremail@email.com
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
