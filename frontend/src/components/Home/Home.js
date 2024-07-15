import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { getProduct, clearErrors } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

// const product = {
//   name: "Tshirt",
//   images: [
//     {
//       url: "https://rukminim2.flixcart.com/image/850/1000/khcb7gw0/shirt/g/t/v/l-ifc-pl-34-icon-fashion-club-original-imafxdzp9nydqaqz.jpeg?q=90&crop=false",
//     },
//   ],
//   price: "3000",
//   _id: "123",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home Page" />
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
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
