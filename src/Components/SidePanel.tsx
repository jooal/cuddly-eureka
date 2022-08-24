import * as React from "react";
import {
  Card,
  Stack,
  CardContent,
  Typography,
  Button,
  Drawer,
} from "@mui/material";
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";

interface SidePanelProps {
  filter: string;
  setFilter: (filter: string) => void;
  setOpenDrawer: (val: boolean) => void;
}

export const SidePanel = ({
  filter,
  setFilter,
  setOpenDrawer,
}: SidePanelProps) => {
  const [tagList, setTagList] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "tags"));
    onSnapshot(q, querySnapshot => {
      setTagList(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const listData = tagList[0]?.data.tags ?? [];

  return (
    <Stack direction="column">
      <CardContent>
        <Typography color="text.secondary" gutterBottom variant="h6">
          Tags
        </Typography>
        <Stack direction="column" alignItems="flex-start">
          {listData.map(c => (
            <Button
              variant="text"
              key={c.id}
              sx={{ padding: "none", justifyContent: "flex-start" }}
              onClick={() => {
                setFilter(c);
                setOpenDrawer(false);
              }}
            >
              {c}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Stack>
  );
};
