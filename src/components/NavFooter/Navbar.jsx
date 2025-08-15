import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';
import ExtraLogo1 from '../../assets/tdcp.png';
import ExtraLogo2 from '../../assets/png.png';
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const storedData = JSON.parse(sessionStorage.getItem("content") || "{}");
  let navbarDetails = null;
  if (storedData.sections && storedData.images) {
    // Find the navbar section
    const navbarSection = storedData?.sections?.find(sec => sec.id === "navbar");
    const mainLogo = storedData?.images?.find(img => img.name === "logo");
    // Step 3: Get right logos images
    const rightSideLogos = storedData?.images?.filter(img => img.name === 'tdcp' || img.name === 'gop')
    navbarDetails = {
      ...navbarSection,
      logo: mainLogo.path || null,
      righSidelogos: rightSideLogos.map(img => img.path || null)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={navbarDetails?.logo || Logo} alt="Logo" className="w-[12rem]" />
          </Link>
        </div>

        {/* Center: Nav Links */}
        {/* <nav
          className="hidden md:flex space-x-6 font-medium transition duration-300"
          style={{ color: scrolled ? '#494949' : '#ffffff' }}
        >
                   <Link to={menu.link} className="hover:text-[#DF8600] subheading-white" style={{ color: scrolled ? '#494949' : '#ffffff' }}>{menu.label}</Link>
                  
          <Link to="#" className="hover:text-[#DF8600] subheading-white" style={{ color: scrolled ? '#494949' : '#ffffff' }}>About Us</Link>
          <Link to="#" className="hover:text-[#DF8600] subheading-white" style={{ color: scrolled ? '#494949' : '#ffffff' }}>Services</Link>
          <Link to="#" className="hover:text-[#DF8600] subheading-white" style={{ color: scrolled ? '#494949' : '#ffffff' }}>Packages</Link>
          <Link to="#" className="hover:text-[#DF8600] subheading-white" style={{ color: scrolled ? '#494949' : '#ffffff' }}>Contact Us</Link>
        </nav> */}
        <nav
          className="hidden md:flex space-x-6 font-medium transition duration-300"
          style={{ color: scrolled ? '#494949' : '#ffffff' }}
        >
          {navbarDetails?.menus?.map((menu, index) => (
            <a
              key={index}
              href={`#${menu.label.replace(/\s+/g, '')}`} // remove spaces for id
              className="hover:text-[#DF8600] subheading-white"
              style={{ color: scrolled ? '#494949' : '#ffffff' }}
            >
              {menu.label}
            </a>
          ))}
        </nav>

        {/* Right: Extra Logos */}
        <div className="hidden md:flex space-x-4">
          <img src={navbarDetails?.righSidelogos[0] || ExtraLogo1} alt="Extra 1" className="h-[4rem]" />
          <img src={navbarDetails?.righSidelogos[1] || ExtraLogo2} alt="Extra 2" className="h-[4rem]" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden text-xl transition duration-300 ${scrolled ? 'text-[#494949]' : 'text-white'
            }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars color="#ffffff" />
        </button>
      </div>

      {/* Mobile Nav */}
      {/* Mobile Nav */}
      <>
        {/* Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Side Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-3/4 bg-white text-white z-40 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } px-4 pt-6 pb-4 space-y-2`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-2xl primary-bg"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes />
          </button>

          {/* Menu Links */}
          <div className="pt-[5rem] mt-30">
            {navbarDetails?.menus?.map((menu, index) => (
              <a
                key={index}
                href={`#${menu.label.replace(/\s+/g, '')}`}
                to={menu.link}
                className={`block subheading-white ${index === 0 ? '' : 'pt-2'}`}
                style={{ color: '#494949' }}
              >
                {menu.label}
              </a>
            ))}
          </div>
          {/* <Link to="/" className="block subheading-white pt-[5rem] mt-30" style={{ color: '#494949' }}>Home</Link>
          <Link to="#" className="block subheading-white pt-2" style={{ color: '#494949' }}>About Us</Link>
          <Link to="#" className="block subheading-white pt-2" style={{ color: '#494949' }}>Services</Link>
          <Link to="#" className="block subheading-white pt-2" style={{ color: '#494949' }}>Packages</Link>
          <Link to="#" className="block subheading-white pt-2" style={{ color: '#494949' }}>Contact Us</Link> */}

          {/* Logos */}
          <div className="flex space-x-4 pt-3">
            <img src={navbarDetails?.righSidelogos[0] || ExtraLogo1} alt="Extra 1" className="h-[4rem]" />
            <img src={navbarDetails?.righSidelogos[1] || ExtraLogo2} alt="Extra 2" className="h-[4.4rem]" />
          </div>
        </div>
      </>

    </header>
  );
};

export default Header;
