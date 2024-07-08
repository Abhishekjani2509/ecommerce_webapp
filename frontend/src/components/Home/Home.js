import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
const product = {
  name: "Tshirt",
  images: [
    {
      url: "https://rukminim2.flixcart.com/image/850/1000/khcb7gw0/shirt/g/t/v/l-ifc-pl-34-icon-fashion-club-original-imafxdzp9nydqaqz.jpeg?q=90&crop=false",
    },
  ],
  price: "3000",
  _id: "123",
};
const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to E-commerce</p>
        <h1>Find Amazing products below!</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
