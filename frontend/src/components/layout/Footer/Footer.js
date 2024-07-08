import React from "react";
import Appstore from "../../../images/Appstore.png";
import playstore from "../../../images/playstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App!</h4>
        <p>Download App for Android and Ios mobile phone.</p>
        <img src={playstore} alt="playstore" />
        <img src={Appstore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce Store</h1>
        <p>High Quality is our first priority.</p>
        <p>Copyrights 2024 &copy; Abhishek Jani </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://facebook.com">Facebook</a>
        <a href="http://youtube.com">Youtube</a>
      </div>
    </footer>
  );
};

export default Footer;
