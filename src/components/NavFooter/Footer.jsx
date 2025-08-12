import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from "../../assets/Logo.png"
const Footer = () => {
  return (
    <footer className="bg-white text-[#333] pt-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">

        {/* Column 1: Logo + Description + Social */}
        <div>
          <img src={Logo} alt="Logo" className="w-[15rem] mb-4" />
          <p className="mb-4 smallText w-full md:w-[20rem]">
            Explore the beauty of Pakistan with us. Experience comfort, adventure, and memories for a lifetime.
          </p>
          <div className="flex gap-4 secondary text-xl">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h3 className="subheading-bold mb-4">Services</h3>
          <ul className="space-y-2 smallText">
            <li>Chairlift</li>
            <li>Boating</li>
            <li>Tourist Shuttle</li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="subheading-bold mb-4">Contact</h3>
          <ul className="space-y-2 smallText">
            <li>
              68, Trade Centre Commercial Area,<br />
              Block M.A Johar Town, Lahore, Punjab
            </li>
            <li>
               051 3357066
            </li>
            <li>
              info@tourism.gov.pk
            </li>
          </ul>
        </div>

      </div>
      <div className=" mx-auto border-t mt-10 py-7 flex flex-col md:flex-row justify-between items-center text-sm smallText">
    <span className='smallText'>Copyright © 2025 tdcp</span>
    <span className='smallText'>Designed & Developed by <span className='primary underline'>Stash Technologies</span></span>
  </div>
    </footer>
  );
};

export default Footer;
