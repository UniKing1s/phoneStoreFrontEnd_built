import "./App.css";
import Header from "./components/header/Header";
import routes from "./routes";
import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  const [screenHeight, setScreenHeight] = useState();
  useEffect(() => {
    return () => {
      setScreenHeight(window.innerHeight);
    };
  }, []);
  return (
    <>
      <Router>
        <Header />
        <main>
          <div
            className="App"
            style={{
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
              minHeight: "100vh",
              height: { screenHeight } + "px",
              position: "relative",
            }}
          >
            {/* <ListProduct /> */}
            {showContentMenus(routes)}
          </div>
        </main>
      </Router>
      {/* <AddProductPage />; */}
    </>
  );
};

export default App;
