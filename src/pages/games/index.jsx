import React from "react";
import GameHeader from "./header/GameHeader";
import Main from "./main/Main";
import "./style.scss";

const Games = () => {
  return (
    <div className="hvx-gamePage">
      <GameHeader />
      <Main />
    </div>
  );
};

export default Games;
