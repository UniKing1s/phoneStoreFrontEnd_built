import { useSelector } from "react-redux";

const GetAccountUser = () => {
  return useSelector((state) => state.account.username);
};

export default GetAccountUser;
