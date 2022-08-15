import { useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [userIsLoggedIn, settUserIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  const auth = getAuth();

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUserId(uid);
          settUserIsLoggedIn(true);
          setUserEmail(user.email);
          setUserName(user.displayName);
          setAvatar(user.photoURL);
          // ...
        } else {
          // User is signed out
          // ...
          settUserIsLoggedIn(false);
          setUserId(undefined);
          setUserEmail(undefined);
          setUserName(undefined);
          setAvatar(undefined);
        }
      }),
    [auth]
  );

  const contextValue = useMemo(
    () => ({
      userIsLoggedIn,
      settUserIsLoggedIn,
      userName,
      setUserName,
      userEmail,
      setUserEmail,
      avatar,
      setAvatar,
      userId,
      setUserId,
    }),
    [
      userIsLoggedIn,
      settUserIsLoggedIn,
      userName,
      setUserName,
      userEmail,
      setUserEmail,
      avatar,
      setAvatar,
      userId,
      setUserId,
    ]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
