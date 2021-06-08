import React from "react";
import leadermic from '../../../assets/Stopwatch.png';

export default function LetsStart(props) {
  return (
    <div>
      <div className="LetsStart">
        {/* style={{ textAlign: "center" }} */}
        <img src={leadermic} alt="Stopwatch.png" style={{ width: '100px' }} />
        
        <div className="LetsStart">
        <h4>2 minutes we’re done</h4>
          Some short questions and your channel is ready
        </div>
      </div>
    </div>
  );
}
