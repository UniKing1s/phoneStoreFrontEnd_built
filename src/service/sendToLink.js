import { useHistory } from "react-router-dom";

const SendToLink = (url) => {
  return useHistory.push(url);
};

export default SendToLink;
