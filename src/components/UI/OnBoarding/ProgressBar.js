import React from "react";

export default function ProgressBar() {
  return (
    <div>
      <div className="loading-progress-bar">
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            //   style="width: 15%;"
            aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100"
         ></div>
        </div>
      </div>
    </div>
  );
}
