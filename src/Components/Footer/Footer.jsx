import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footerContainer">
      <p className="footerDisclaimer">
        This website is a fan creation by Marcus Brooks and is in no way
        affiliated with Nintendo.
      </p>
      <Link to="/termsOfServiceAndPrivacy" className="footerTOS">
        Terms of Service / Privacy Policy
      </Link>
    </footer>
  );
};

export default Footer;
