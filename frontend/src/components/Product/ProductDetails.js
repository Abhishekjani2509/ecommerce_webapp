import React, { useEffect } from "react";
// import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productAction.js";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";

const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);
  // }, [dispatch, id, error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product && product.ratings,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {product && <MetaData title={`${product.name} -- Ecommerce`} />}
          <div className="ProductDetails">
            <div>
              {/* <Carousel> */}
              {product &&
                product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              {/* </Carousel> */}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product && product.name}</h2>
                <p>Product # {product && product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <p>({product && product.numOfReviews} Reviews)</p>
              </div>
              <div className="detailsBlock-3">
                <h2>{product && `₹ ${product.price}`}</h2>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      product && product.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {product && product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product && product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          {product && product.reviews[0] ? (
            <div className="reviews">
              {product &&
                product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Review Yet!</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
