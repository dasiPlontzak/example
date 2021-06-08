import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { getAllChannels, addChannel } from "../../../services/Channel.service";
import { useSelector } from "react-redux";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import { defaultConfigurationValues } from "../../configuration/defaultConfigurationValues.js";

import "./ChannelsList.css";

export default function ChannelsList() {
  const [channels, setChannels] = useState([]);
  const userName = useSelector((state) => state.user.userName);
  const history = useHistory();
  const channelConfiguration = defaultConfigurationValues();

  useEffect(async () => {
    getAllChannels(userName, setChannels);
  }, []);

  const addNewChannel = async () => {
    let name = `Welcome to ${userName}'s channel ${channels.length}`;
    let newChannelConfiguration = {
      ...channelConfiguration,
      editHeader: {
        ...channelConfiguration.editHeader,
        text: { ...channelConfiguration.editHeader.text, title: name },
      },
    };
    await addChannel(userName, newChannelConfiguration, history);
  };

  return (
    <form className="BackgroundChannel">
      <Grid container>
        <Grid item xs={12}>
          <Grid container className="GridAddChannel">
            <div className=" d-flex justify-content-between Cannels  PdC">
              <div>
                <h2>My Channels</h2>
              </div>
              <div className="d-flex justify-content-end">
                <div className="mr-3 ">
                  <SearchSharpIcon className="SearchIcon" />
                </div>
                <button
                  type="button"
                  className="BAddChannel"
                  onClick={addNewChannel}
                >
                  Add Channel +
                </button>
              </div>
            </div>
            {channels &&
              channels.map((channel) => (
                <Grid
                  key={channel.name}
                  className="GridNew1 shadow-lg m-2"
                  onClick={() =>
                    history.push(`/admin/${userName}/${channel.name}`)
                  }
                >
                  <div>
                    <div className="row ChnnalList ">
                      <div
                        className="col-1.5 ChnnalImg paperNew"
                        style={{
                          backgroundImage: `url(${
                            channel.channelConfiguration
                              ? channel.channelConfiguration.editHeader.image
                                  .channel
                              : channelConfiguration.editHeader.image.channel
                          })`,
                        }}
                      ></div>
                      <div className="col-2.5 d-flex align-items-center ml-4">
                        <div className="d-flex flex-column ml-2">
                          <div className="ChannelName">
                            <h4>{channel.name}</h4>
                          </div>
                          <div className="Created">
                            Created{" "}
                            {Moment(channel.createDate).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto m-4">
                        <div className="d-flex flex-row">
                          <div className="ml-2 mr-2 Created">
                            {channel.audios.length} Podcasts{" "}
                          </div>
                          <div className="ml-4 mr-4 Created">
                            {channel.subscribers.length} Subscribers{" "}
                          </div>
                          <FontAwesomeIcon
                            className="FontIconNav"
                            icon={["fas", "link"]}
                          />
                          <VisibilityOutlinedIcon className="FontIconNav" />
                          <FontAwesomeIcon
                            className="FontIconNav"
                            icon={["far", "trash-alt"]}
                          />
                          <FileCopyOutlinedIcon className="FontIconNav" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
