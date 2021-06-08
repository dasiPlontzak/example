import React from "react";
import leadermic from '../../../assets/animation_500_kkxuwuct.gif'
import './OnBoarding.css'

export default function LoadingChannel() {
  return (
    <div>
      <div >   
        <div className="d-flex justify-content-center "><h4 className="LoadingChannel">CREATING YOUR CHANNEL…</h4></div> 
        <div className="d-flex justify-content-center"><img src={leadermic}   style={{ width: '222px' }}className="LoadingChannel"/>  </div>
      </div>
    </div>
      );
}
