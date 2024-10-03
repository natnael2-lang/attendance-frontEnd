import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faUserFriends, faWallet } from '@fortawesome/free-solid-svg-icons';
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <div className="div-container" style={{ color: "white", height: "2vh", display: 'flex', justifyContent: 'space-around', padding: '20px', border: "1px solid black", borderRadius: "50px" }}>
      <Link to="/" className="icon-container">
        <FontAwesomeIcon icon={faHome} style={{ fontSize: "16px", color: "white" }} />
        <p>Home</p>
      </Link>
      <Link to="/tasks" className="icon-container">
        <FontAwesomeIcon icon={faTasks} style={{ fontSize: "16px", color: "white" }} />
        <p>Tasks</p>
      </Link>
      <Link to="/friends" className="icon-container">
        <FontAwesomeIcon icon={faUserFriends} style={{ fontSize: "16px", color: "white" }} />
        <p>Friends</p>
      </Link>
      <Link to="/wallet" className="icon-container">
        <FontAwesomeIcon icon={faWallet} style={{ fontSize: "16px", color: "white" }} />
        <p>Wallet</p>
      </Link>
    </div>
  );
};

export default Footer;