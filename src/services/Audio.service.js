import imageCompression from "browser-image-compression";
import { Http, HttpFormdata } from "../axios";
import { trackPromise } from "react-promise-tracker";

//////////saveAudio
export async function saveAudio(currentAudio, dispatchNewAudio, userName, history, channelName) {
  const newAudio = new FormData();
  (await fetch(currentAudio.img)
    .then((r) => {
      return r.blob();
    })
    .then((blobFile) => {
      let name = `${currentAudio.img.split("/")[3]}.png`;
      var fileToUpload = new File([blobFile], name, {
        lastModified: new Date().getTime(),
        type: blobFile.type,
      })
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = imageCompression(fileToUpload, options);
      return compressedFile;
    })
    .then((compressedFile) => {
      newAudio.append("img", compressedFile, compressedFile.name);
    }));
  
    (fetch(currentAudio.audioUrl)
    .then((r) => {
      return r.blob();
    })
    .then((blobFile) => {
      let name = `${currentAudio.audioUrl.split("/")[3]}.mp3`;
      var fileToUpload = new File([blobFile], name, {
        lastModified: new Date().getTime(),
        type: blobFile.type,
      });
      newAudio.append("audio", fileToUpload, fileToUpload.name);
      newAudio.append("audioDetails", JSON.stringify(currentAudio));
      HttpFormdata.post(
        `/audio/${userName}/${channelName}/addNewAudio`,
        newAudio
      )
        .then((response) => {
          console.log("success addNewAudio");
          fetch(response.data.audio.img).then(() => {
            history.push(`/admin/${userName}/${channelName}`);
          });
          dispatchNewAudio(response.data);
        })
        .catch((error) => {
          console.log("error addNewAudio");
          console.log("error : " + error.message);
        });
    }));
}

//////////////updateAudio
export async function updateAudio(
  updateAudioAction,
  currentAudio,
  prevAudio,
  history,
  userName
) {
  const newAudio = new FormData();
  if (currentAudio.img !== prevAudio.img) {
    await fetch(currentAudio.img)
      .then((r) => {
        return r.blob();
      })
      .then((blobFile) => {
        let name = `${currentAudio.img.split("/")[3]}.png`;
        var fileToUpload = new File([blobFile], name, {
          lastModified: new Date().getTime(),
          type: blobFile.type,
        });
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = imageCompression(fileToUpload, options);
        return compressedFile;
      })
      .then((compressedFile) => {
        newAudio.append("img", compressedFile, compressedFile.name);
      });
  }
  if (currentAudio.audioUrl !== prevAudio.audioUrl) {
    await fetch(currentAudio.audioUrl)
      .then((r) => {
        return r.blob();
      })
      .then((blobFile) => {
        let name = `${currentAudio.audioUrl.split("/")[3]}.mp3`;
        var fileToUpload = new File([blobFile], name, {
          lastModified: new Date().getTime(),
          type: blobFile.type,
        });
        newAudio.append("audio", fileToUpload, fileToUpload.name);
      });
  }
  newAudio.append("audioDetails", JSON.stringify(currentAudio));
  HttpFormdata.post(`/audio/${userName}/updateAudio`, newAudio)
    .then((response) => {
      console.log("success update audio");
      console.log(`updateAudio data is: ${response.data}`);
      fetch(response.data.currentAudio.img).then(() => {
        history.goBack();
      });
      // updateAudioAction(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error update NewAudio");
      console.log("error : " + error.message);
    });
}

/////////////////deleteAudio
export function deleteAudio(updateAudioListAfterDelete, audioId, userName) {
  Http.post(`/audio/${userName}/deleteAudio`, { audioId: audioId })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
}

///////////getAudioById
export function getAudioById(_id, setAudio) {
  console.log("getAudioById");
  Http.get(`/audio/getAudioById/${_id}`)
    .then((response) => {
      setAudio(response.data.audio);
      return response.data.audio;
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
  // $.ajax({
  //   url: `${keys.API_URL}audio/getAudioById/${_id}`,
  //   method: 'get',
  //   success: function (data) {
  //     setAudio(data.audio);
  //     return data.audio;
  //   },
  //   error: function (error) {
  //     console.log("error : " + error.message)
  //   }
  // });
}

//////////////////addCounterViews
export function addCounterViews(
  addCounterViewsAction,
  addCounterViewsUpdate,
  userName
) {
  console.log("in updateAudio (post)");
  Http.post(`/audio/${userName}/updateAudioFieldById`, addCounterViewsUpdate)
    .then((response) => {
      console.log(`updateAudioCounter data is: ${response.data}`);
      addCounterViewsAction(response.data.audio);
      console.log("GOOD updateAudioCounter", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
}

////////////secondsToHHMMSSFormat
export function secondsToHHMMSSFormat(sec_num) {
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var time =
    hours === "00"
      ? minutes + ":" + seconds
      : hours + ":" + minutes + ":" + seconds;
  return time;
}
