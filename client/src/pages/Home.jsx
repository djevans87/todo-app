import React from "react";
import ToDoDashboard from "./ToDoDashboard";

const Home = () => {
  return (
    <div className="sub-heading">
      <h2 >Welcome </h2>
      <h3>Please login to bring up your list!!
      <span role="img" aria-label="smiley face">
        😊
      </span>
      </h3>
      <p>
        You are currently able to add todos, but your list will not be saved.
        You must login to use the saved list feature. If you do not have a login, please register.
      </p>
      <ToDoDashboard/>
    </div>
  );
};

export default Home;
