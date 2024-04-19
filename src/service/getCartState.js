import { useSelector } from "react-redux";

const GetCartState = () => {
  return useSelector((state) => state.account.logged);
};

export default GetCartState;
