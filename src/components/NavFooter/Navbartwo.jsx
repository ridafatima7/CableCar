import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';
import ExtraLogo1 from '../../assets/tdcp.png';
import ExtraLogo2 from '../../assets/png.png';
import { Link } from 'react-router-dom';
const Headertwo = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center space-x-8">
        <Link to="/"><img src={Logo} alt="Main Logo" className="w-[10rem]" /></Link>

          {/* Navigation (desktop only) */}
         
        </div>
        <div>
        <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
           <Link to="/" className="hover:text-green-600 subheading-white transition" style={{color:"#494949"}}>Home</Link>
           <Link to="#" className="hover:text-green-600 subheading-white transition" style={{color:"#494949"}}>About Us</Link>
           <Link to="#" className="hover:text-green-600 subheading-white transition" style={{color:"#494949"}}>Services</Link>
           <Link to="#" className="hover:text-green-600 subheading-white transition" style={{color:"#494949"}}>Packages</Link>
           <Link to="#" className="hover:text-green-600 subheading-white  transition" style={{color:"#494949"}}>Contact Us</Link>
          </nav>
        </div>

        {/* Right Extra Logos (desktop only) */}
        <div className="hidden md:flex space-x-4 items-center">
          <img src={ExtraLogo1} alt="Extra 1" className="h-[3.5rem]" />
          <img src={ExtraLogo2} alt="Extra 2" className="h-[3.8rem]" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 text-gray-800 space-y-2">
          <Link to="/" className="block subheading-white" style={{color:"#494949"}}>Home</Link>
         <Link to="#" className="block subheading-white" style={{color:"#494949"}}>About Us</Link>
         <Link to="#" className="block subheading-white" style={{color:"#494949"}}>Services</Link>
         <Link to="#" className="block subheading-white" style={{color:"#494949"}}>Packages</Link>
         <Link to="#" className="block subheading-white" style={{color:"#494949"}}>Contact Us</Link>
          <div className="flex space-x-4 mt-2 justify-center">
            <img src={ExtraLogo1} alt="Extra 1" className="h-[3.5rem]" />
            <img src={ExtraLogo2} alt="Extra 2" className="h-[3.8rem]" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Headertwo;
