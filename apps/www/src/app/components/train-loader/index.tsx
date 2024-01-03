import React from "react";

import "./style.css";

const TrainLoader = () => {
  return (
    <div id="train-page-loader">
      <div className="loader">
        <div className="loader__icon">
          <div className="loader__train" />
          <div className="loader__track">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainLoader;
