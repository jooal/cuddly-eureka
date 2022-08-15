import * as React from "react";
import { Card, Stack, CardContent, Typography, Button } from "@mui/material";
import { db } from "../firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";

interface SidePanelProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export const SidePanel = ({ filter, setFilter }: SidePanelProps) => {
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
      <Card variant="outlined" sx={{ borderRadius: "8px" }}>
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
                }}
              >
                {c}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
