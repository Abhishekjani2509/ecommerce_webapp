import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/ProductCard.js";
import Pagination from "react-js-pagination";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error, resultPerPage, countProduct } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {resultPerPage < countProduct && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={countProduct}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
