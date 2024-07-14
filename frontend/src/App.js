import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";

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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
