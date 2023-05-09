import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1>CPE 579 Final Project</h1>
      <p>Created by: Tristan Kensinger</p>
      <div className="homeButton-div">
        <Link to="/login">
          <button className="homeButton">Login</button>
        </Link> <br />
        <Link to="/register">
          <button className="homeButton">Register</button>
        </Link>
      </div>
    </section>
  );
}

export default Home;