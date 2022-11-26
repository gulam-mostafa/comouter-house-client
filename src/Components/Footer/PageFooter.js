import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const PageFooter = () => {
  return (
    <footer className="footer py-10 bg-black text-white md:px-12 px-4">
    <div>
      <img className="w-32" src="https://i.ibb.co/wYmX703/pc-llo-1.png" alt="" />
      <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
    </div> 
    <div>
      <span className="footer-title text-white">Services</span> 
      <Link className="link link-hover">Branding</Link>
      <Link className="link link-hover">Design</Link>
      <Link className="link link-hover">Marketing</Link>
      <Link className="link link-hover">Advertisement</Link>
    </div> 
    <div>
      <span className="footer-title">Company</span> 
      <Link className="link link-hover">About us</Link>
      <Link className="link link-hover">Contact</Link>
      <Link className="link link-hover">Jobs</Link>
      <Link className="link link-hover">Press kit</Link>
    </div> 
    <div>
      <span className="footer-title">Legal</span> 
      <Link className="link link-hover">Terms of use</Link>
      <Link className="link link-hover">Privacy policy</Link>
      <Link className="link link-hover">Cookie policy</Link>
    </div>
  </footer>
  );
};

export default PageFooter;
