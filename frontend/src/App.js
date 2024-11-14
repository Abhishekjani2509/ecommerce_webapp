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
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
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
          <Route element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Profile />} />
            <Route exact path="/me/update" element={<UpdateProfile />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
