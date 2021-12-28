import React from "react";
import Navbar from "../public/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="greeting">
          <div>
            <h1>Welcome to PlayCue</h1>
            <h3>You can find your favorite plays here.</h3>
            <div className="source-info">
              <h4>Data Presented By KOPIS: </h4>
              <a href="https://www.kopis.or.kr/por/main/main.do">
                https://www.kopis.or.kr/por/main/main.do
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
