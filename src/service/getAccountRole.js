import { useSelector } from "react-redux";

const GetAccountRole = () => {
  return useSelector((state) => state.account.role);
};

export default GetAccountRole;
