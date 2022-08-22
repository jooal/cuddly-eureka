import * as React from "react";
import { Grid, Stack, Pagination } from "@mui/material";
import { Header } from "../Components/Header";
import { Discussion } from "../Components/Discussion";
import { SidePanel } from "../Components/SidePanel";
import { useAppContext } from "../Components/AppContext";

export const Home = () => {
  const [filter, setFilter] = React.useState("");
  const { userId } = useAppContext();

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
          <Discussion filter={filter} setFilter={setFilter} userId={userId} />
        </Grid>
        <Grid container item xs={12} md={3} direction="column">
          <SidePanel filter={filter} setFilter={setFilter} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
