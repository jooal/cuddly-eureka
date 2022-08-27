import * as React from "react";
import { Grid, Drawer, Button } from "@mui/material";
import { Header } from "../Components/Header";
import { Posts } from "../Components/Posts";
import { SidePanel } from "../Components/SidePanel";
import { CloseOutlined } from "@mui/icons-material";

export const Home = () => {
  const [filter, setFilter] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        direction="row"
        sx={{ display: "flex", paddingBottom: "36px" }}
        justifyContent="center"
      >
        <Grid
          container
          item
          xs={12}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "350px", paddingBottom: "24px" }}
        >
          <Button
            sx={{ color: "#282828" }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            Filters
          </Button>
          <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <SidePanel
              filter={filter}
              setFilter={setFilter}
              setOpenDrawer={setOpenDrawer}
            />
          </Drawer>
          {filter !== "" && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => setFilter("")}
              sx={{ color: "#282828", borderColor: "#282828" }}
            >
              {filter}
              <CloseOutlined size="small" />
            </Button>
          )}
        </Grid>
        <Grid container item xs={10} md={8} direction="column">
          <Posts filter={filter} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
