import * as React from "react";
import { Grid, Stack, Pagination } from "@mui/material";
import { Header } from "../Components/Header";
import { Discussion } from "../Components/Discussion";
import { SidePanel } from "../Components/SidePanel";

export const Details = () => {
  const [filter, setFilter] = React.useState("");

  return (
    <React.Fragment>
      <Header />
      {/* <Stack justifyContent="center" alignItems="center">
        <Pagination count={10} color="primary" />
      </Stack> */}
      <Grid
        container
        direction="row"
        sx={{ paddingY: "36px", paddingX: "48px", display: "flex" }}
        gap="24px"
      >
        <Grid container item xs={12} md={8} direction="column">
          <Discussion filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid container item xs={12} md={4} direction="column">
          <SidePanel filter={filter} setFilter={setFilter} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
