import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import App from "../App";

type AppContextValue = {
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: (userIsLoggedIn: boolean) => void;
  displayName: string;
  setDisplayName: (displayName: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  userEmail: string;
  setUserEmail: (userEmail: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  postId: string;
  setPostId: (postId: string) => void;
};

export const AppContext = createContext<AppContextValue>({} as any);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = props => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState(null);

  const [avatar, setAvatar] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [postId, setPostId] = useState("");

  const auth = getAuth();

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          const userDisplayName = user.email.split("@")[0];
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUserId(uid);
          setUserIsLoggedIn(true);
          setUserEmail(user.email);
          setDisplayName(userDisplayName);
          setAvatar(user.photoURL);

          // ...
        } else {
          // User is signed out
          // ...
          setUserIsLoggedIn(false);
          setUserId(undefined);
          setDisplayName(undefined);
          setDisplayName(undefined);
          setAvatar(undefined);
        }
      }),
    [auth]
  );

  const contextValue = useMemo(
    () => ({
      userIsLoggedIn,
      setUserIsLoggedIn,
      displayName,
      setDisplayName,
      userEmail,
      setUserEmail,
      avatar,
      setAvatar,
      userId,
      setUserId,
      postId,
      setPostId,
    }),
    [
      userIsLoggedIn,
      setUserIsLoggedIn,
      displayName,
      setDisplayName,
      userEmail,
      setUserEmail,
      avatar,
      setAvatar,
      userId,
      setUserId,
      postId,
      setPostId,
    ]
  );
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
