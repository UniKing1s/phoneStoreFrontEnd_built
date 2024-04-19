import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ListProduct from "./pages/ProductManagerPage/ProductListPage/ListProduct";
import AddProductPage from "./pages/ProductManagerPage/AddProductPage/AddProductPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import EditProductPage from "./pages/ProductManagerPage/EditProductPage/EditProductPage";
import ThanhToanPage from "./pages/ThanhToanPage/thanhToanPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ListUser from "./pages/UserManagerPage/UserListPage/ListUser";
import EditUserPage from "./pages/UserManagerPage/EditUserPage/EditUserPage";
import BillListPage from "./pages/BillManagerPage/BillListPage/BillListPage";
import BillDetailPage from "./pages/BillManagerPage/BillDetailPage/BillDetailPage";

const update = true;
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/listProduct",
    exact: true,
    main: () => <ListProduct />,
  },
  {
    path: "/register",
    exact: true,
    main: () => <RegisterPage />,
  },
  {
    path: "/login",
    exact: true,
    main: () => <LoginPage />,
  },
  {
    path: "/addProduct",
    exact: true,
    main: () => <AddProductPage update={!update} />,
  },

  {
    path: "/updateProduct/:id",
    exact: false,
    main: () => <EditProductPage />,
  },
  {
    path: "/product/:id",
    exact: false,
    main: () => <ProductPage />,
  },
  {
    path: "/cart",
    exact: false,
    main: () => <CartPage />,
  },
  {
    path: "/thanhToan",
    exact: false,
    main: () => <ThanhToanPage />,
  },
  {
    path: "/search",
    exact: false,
    main: () => <SearchPage />,
  },
  {
    path: "/userManager",
    exact: false,
    main: () => <ListUser />,
  },
  {
    path: "/updateUser",
    exact: false,
    main: () => <EditUserPage />,
  },
  {
    path: "/billManager",
    exact: false,
    main: () => <BillListPage />,
  },
  {
    path: "/ChiTietBill",
    exact: false,
    main: () => <BillDetailPage />,
  },
  {
    path: "*",
    exact: false,
    main: () => <NotFoundPage />,
  },
];

export default routes;
