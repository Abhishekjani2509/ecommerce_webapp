import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import LoginSignUp from "./components/User/LoginSignUp.js";

function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/product/:id" Component={ProductDetails} />
          <Route exact path="/products" Component={Products} />
          <Route
            exact
            path="/products/product/:id"
            Component={ProductDetails}
          />
          <Route path="/products/:keyword" Component={Products} />
          <Route exact path="/search" Component={Search} />
          <Route exact path="/login" Component={LoginSignUp} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
