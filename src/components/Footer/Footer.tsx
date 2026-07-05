import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return <footer className="footer">© {new Date().getFullYear()} Noah Ford</footer>;
};

export default Footer;
