import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { GithubOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footerParent">
      <div className="footerContent">
        <div className="footerLinks">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div className="footerIcons">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <GithubOutlined />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterOutlined />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined />
          </a>
        </div>

        <p className="footerCopyright">
          © {new Date().getFullYear()} Your Website. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
