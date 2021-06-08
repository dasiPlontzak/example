import { Http, HttpFormdata } from "../axios";
import { trackPromise } from "react-promise-tracker";

export async function publishChannel(userName, channelName, currentChannel) {
  let formData = new FormData();
  formData.append("channelDetails", JSON.stringify(currentChannel));
  //todo:async/await

  // await Object.keys(currentChannel.channelConfiguration.editHeader.image).forEach((key) => {
  //     if (currentChannel.channelConfiguration.editHeader.image[key].startsWith("blob")) {
  //         fetch(currentChannel.channelConfiguration.editHeader.image[key]).then(r => {
  //             return r.blob();
  //         }).then(blobFile => {
  //             let name = `${key}Image.${blobFile.type.split('/')[1].split('+')[0]}`;
  //             var fileToUpload = new File([blobFile], name, {
  //                 lastModified: new Date().getTime(),
  //                 type: blobFile.type,
  //             });
  //             formData.append(key, fileToUpload);
  //         });
  //     }
  // });

  if (
    currentChannel.channelConfiguration.editHeader.image.channel.startsWith(
      "blob"
    )
  ) {
      await fetch(currentChannel.channelConfiguration.editHeader.image.channel)
        .then((r) => {
          return r.blob();
        })
        .then((blobFile) => {
          let name = `channelImage.${
            blobFile.type.split("/")[1].split("+")[0]
          }`;
          var fileToUpload = new File([blobFile], name, {
            lastModified: new Date().getTime(),
            type: blobFile.type,
          });
          formData.append("channel", fileToUpload);
        });
  }
  if (
    currentChannel.channelConfiguration.editHeader.image.logo.startsWith("blob")
  ) {
      await fetch(currentChannel.channelConfiguration.editHeader.image.logo)
        .then((r) => {
          return r.blob();
        })
        .then((blobFile) => {
          let name = `channelLogo.${blobFile.type.split("/")[1].split("+")[0]}`;
          var fileToUpload = new File([blobFile], name, {
            lastModified: new Date().getTime(),
            type: blobFile.type,
          });
          formData.append("logo", fileToUpload);
        });
  }
    HttpFormdata.post(
      `/channel/${userName}/${channelName}/publishChannel`,
      formData
    )
      .then((response) => {
        console.log("success add channel");
        console.log(`new channel is: ${response.data}`);
        // dispatchNewChannel(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error add channel");
        console.log("error : " + error.message);
      });
}

////////////getChannelByName
export function getChannelByName(
  initialChannel,
  initialAudios,
  initialConfiguration,
  channelName,
  userName,
  setPagination = null
) {
  console.log("getChannelByName");
  console.log(channelName);
    Http.get(`/channel/${userName}/${channelName}/getChannelByName`)
      .then((response) => {
        initialChannel(response.data.channel);
        initialAudios(response.data.channel.audios);
        initialConfiguration(response.data.channel.channelConfiguration);
        setPagination(response.data.channel.audios);
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
}

////////////getAllChannels
export function getAllChannels(userName, setChannels) {
  console.log("getAllChannels");
  console.log(userName);
    Http.get(`/channel/${userName}/getAllChannels`)
      .then((response) => {
        console.log(response.data);
        setChannels(response.data.channels);
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
}

////////////addChannel
export async function addChannel(userName, channelConfiguration, history) {
  console.log("in add channel");
  let formData = new FormData();
  formData.append("channelConfiguration", JSON.stringify(channelConfiguration));
  //trackPromise(
    await fetch(channelConfiguration.editHeader.image.channel)
      .then((r) => {
        return r.blob();
      })
      .then((blobFile) => {
        let name = `channelImage.${blobFile.type.split("/")[1].split("+")[0]}`;
        var fileToUpload = new File([blobFile], name, {
          lastModified: new Date().getTime(),
          type: blobFile.type,
        });
        formData.append("channel", fileToUpload);
      })
  //);
  //trackPromise(
    await fetch(channelConfiguration.editHeader.image.logo)
      .then((r) => {
        return r.blob();
      })
      .then((blobFile) => {
        let name = `channelLogo.${blobFile.type.split("/")[1].split("+")[0]}`;
        var fileToUpload = new File([blobFile], name, {
          lastModified: new Date().getTime(),
          type: blobFile.type,
        });
        formData.append("logo", fileToUpload);
      })
  //);
  //trackPromise(
    HttpFormdata.post(`/channel/${userName}/addChannel`, formData)
      .then((response) => {
        console.log("success add channel");
        console.log(`new channel is: ${response.data}`);
        history.push(
          `/admin/${userName}/${channelConfiguration.editHeader.text.title}`
        );
        // dispatchNewChannel(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error add channel");
        console.log("error : " + error.message);
      })
 // );
}
