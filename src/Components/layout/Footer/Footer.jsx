import { CiYoutube } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#222222] pt-[100px]">
      <div className="w-10/12 md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="footer-card">
          <div className="title mb-5">
            <h4 className="text-white text-sm font-bold mb-5">
              Store Information
            </h4>
            <div className="space-y-3">
              <p className="text-[#D6D6D6] text-sm flex gap-3 items-center">
                <FaMapMarkerAlt className="text-primaryColor" />
                33 New Montgomery St. Ste 750 San Francisco
              </p>
              <p className="text-[#D6D6D6] text-sm flex gap-3 items-center">
                <FaPhoneAlt className="text-primaryColor" />
                Phone: +880-1738847798
              </p>
              <p className="text-[#D6D6D6] text-sm flex gap-3 items-center">
                <MdEmail className="text-primaryColor" />
                dmsumoncse@gmail.com
              </p>
            </div>
            <div className="social-links flex gap-4 items-center mt-5">
              <Link to={"https://www.facebook.com/"}>
                <FaFacebookF className="text-[#D6D6D6] hover:text-primaryColor" />
              </Link>
              <Link to={"https://www.instagram.com/"}>
                <FaInstagram className="text-[#D6D6D6] hover:text-primaryColor" />
              </Link>
              <Link to={"https://x.com/?lang=en&mx=2"}>
                <FaTwitter className="text-[#D6D6D6] hover:text-primaryColor" />
              </Link>
              <Link to={"https://www.youtube.com/"}>
                <CiYoutube className="text-[#D6D6D6] hover:text-primaryColor" />
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-card">
          <div className="title mb-5">
            <h4 className="text-white text-sm font-bold">
              HELP &amp; INFORMATION
            </h4>
          </div>
          <ul className="text-[#D6D6D6] text-sm space-y-3">
            <li>
              <a href="/" title="Order Status">
                Order Status
              </a>
            </li>

            <li>
              <a href="/" title="Careers ">
                Careers
              </a>
            </li>

            <li>
              <a href="/" title="Privacy Policy">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="/" title="Terms of Use">
                Terms of Use
              </a>
            </li>

            <li>
              <a href="/" title="Why Buy Direct">
                Why Buy Direct
              </a>
            </li>

            <li>
              <a href="/" title="Newsletter">
                Newsletter
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-card">
          <div className="title mb-5">
            <h4 className="text-white text-sm font-bold">About us</h4>
          </div>
          <ul className="text-[#D6D6D6] text-sm space-y-3">
            <li className="">
              <a href="/" title="Help Center">
                Help Center
              </a>
            </li>

            <li className="">
              <a href="/" title="Store Locations">
                Store Locations
              </a>
            </li>

            <li>
              <a href="/" title="We Deliver Almost Anywhere!">
                We Deliver Almost Anywhere!
              </a>
            </li>

            <li>
              <a href="/" title="Registry">
                Registry
              </a>
            </li>

            <li>
              <a href="/" title="Privacy Policy">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="/" title="Terms of Service">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-card">
          <div className="title mb-5">
            <h4 className="text-white text-sm font-bold">Categories </h4>
          </div>
          <ul className="text-[#D6D6D6] text-sm space-y-3">
            <li>
              <a href="/" title="Court &amp; Indoor trainers">
                Villa
              </a>
            </li>

            <li>
              <a href="/" title="Backpacks &amp; Rucksacks">
                Shops
              </a>
            </li>

            <li>
              <a href="/" title="American Football">
                Luxury Apartments
              </a>
            </li>

            <li>
              <a href="/" title="Racquetball">
                Duplex Home
              </a>
            </li>

            <li>
              <a href="/" title="Sports Nutrition">
                Single Flat
              </a>
            </li>

            <li>
              <a href="/" title="MMA and Martial Arts">
                Office
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright border-t border-t-[#555555] mt-[100px]">
        <p className="text-center text-[13px] font-light text-[#D6D6D6] py-[26px]">
          © 2025 Din M Sumon All Rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
