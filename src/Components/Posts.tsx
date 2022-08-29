import * as React from "react";
import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { PostCard } from "./Card";

interface DiscussionProps {
  filter?: string;
  isProfilePage?: boolean;
}

/** Threads are sorted by newest post by default. */

export const Posts = ({ filter }: DiscussionProps) => {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const filterQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("tag", "==", filter)
    );

    if (filter !== "" && filter !== "All") {
      onSnapshot(filterQuery, querySnapshot => {
        setPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      onSnapshot(q, querySnapshot => {
        setPosts(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [filter]);

  return (
    <React.Fragment>
      <PostCard data={posts} />
    </React.Fragment>
  );
};
