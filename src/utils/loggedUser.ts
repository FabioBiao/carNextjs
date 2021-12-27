import { useState } from "react";

export default function useLoggedUser() {
  const getUser = () => {
    const tokenString = sessionStorage?.getItem("loggedUser")
      ? sessionStorage.getItem("loggedUser")
      : null;
    const loggedUser = JSON.parse(tokenString);
    return loggedUser?.token;
  };

  let initialValue = null;
  if (typeof window !== "undefined") {
    initialValue = getUser();
  }
  const [user, setUser] = useState(initialValue);

  const saveUser = (loggedUser) => {
    sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    setUser(loggedUser.token);
  };

  return {
    setUser: saveUser,
    user,
  };
}
