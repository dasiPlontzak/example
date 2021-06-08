import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

function redirectToLogin(routes) {
  window.location.href = routes
    ? `https://accounts.codes/SoundBox/login?routes=${routes}`
    : `https://accounts.codes/SoundBox/login`;
  return null;
}
const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let routes = rest.computedMatch.params.ChannelName;
  let userName = rest.computedMatch.params.userName;
  const history = useHistory();

  useEffect(() => {
    const isLocal = window.location.hostname == "localhost";
    console.log("isLocal: " + isLocal);
    const url = `/${userName}/isPermission?isLocal=${isLocal}`;

    const isPermission = async () => {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: user,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status == 401) {
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        if (response.channel)
          history.push(`/${userName}/${response.channel.name}`);
        else setIsLoading(false);
      }
    };
    isPermission();
  }, []);

  return isLoading ? null : isLoggedIn ? (
    redirectToLogin(routes)
  ) : (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...rest} {...props} />;
      }}
    />
  );
};
export default ProtectedRoute;
