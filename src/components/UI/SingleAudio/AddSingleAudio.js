import React from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import "./SingleAudio.css";

function AddSingleAudio(props) {
  const history = useHistory();
  const editGrid = props.channelSettings.editGrid;
  const userName = useSelector((state) => state.user.userName);
  const basicRouterFromAudioList = `/admin/${userName}`;
  const channelName = useSelector((state) => state.channel.currentChannel ? state.channel.currentChannel.name : '');

  return (
    <>
      <div
        onClick={() => {
          history.push(`${basicRouterFromAudioList}/${channelName}/AddRecord/false`);
        }}
        className={
          editGrid == "grid"
            ? "singleAudioCard gridCard addSingleAudio "
            : "singleAudioCard listCard row addSingleAudio d-flex justify-content-center align-items-center"
        }
      >
        <div
          className={
            editGrid == "grid"
              ? " d-flex justify-content-center align-items-center"
              : 'col-md-4 divOfImg listDivOfImg d-flex justify-content-center align-items-center"'
          }
        >
          <div
            className={
              editGrid == "grid"
                ? "d-flex flex-column"
                : "d-flex justify-content-center align-items-center"
            }
          >
            <div className="p-2">
              <div className="d-flex justify-content-center">
                {" "}
                <AddRoundedIcon
                  className={
                    editGrid == "grid"
                      ? "ListSizePlus"
                      : "d-flex justify-content-center align-items-center GridSizePlus"
                  }
                />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {" "}
              <h5 className={editGrid == "grid" ? "" : "GridSize"}>
                Create new
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (r_state, ownProps) => {
  return {
    // audio: r_state.audio.audioList.filter((a) => a._id === ownProps.audioId)[0],
    channelSettings: r_state.channelSettings,
  };
};

export default connect(mapStateToProps, null)(AddSingleAudio);
