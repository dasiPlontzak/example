import React, { useState, useEffect } from 'react';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Sharing from '../Sharing';
import Download from '../Download';
import Favorite from '../Favorite';
 import './podcastSharingOption.css'

export default function podcastSharingOption(props) {
  return (
    <>
      <div className="d-flex justify-content-center align-item-center">
        <Sharing
          className="IconSharing"
          url={props.url} />

        <Favorite
          className="IconSharing Favorite"
          id={props.id}
        />

        <Download
          className="IconSharing" />
      </div>
    </>

  );

}