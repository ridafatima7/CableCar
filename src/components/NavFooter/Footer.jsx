import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from "../../assets/Logo.png";

const Footer = () => {
  const storedData = JSON.parse(sessionStorage.getItem("content") || "{}");

  let footerDetails = null;

  if (storedData.sections && storedData.images) {
    // Find the navbar section
    const footerSection = storedData?.sections?.find(sec => sec.id === "footer");
    const mainLogo = storedData?.images?.find(img => img.name === "logo");

    footerDetails = {
      ...footerSection,
      logo: mainLogo?.path || null,
    };
  }
  const socialIcons = {
    facebook: <FaFacebookF />,
    instagram: <FaInstagram />,
    x: <FaTwitter />,
    youtube: <FaYoutube />
  };
  return (
    <footer className="bg-white text-[#333] pt-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">

        {/* Column 1: Logo + Description + Social */}
        <div>
          <img src={footerDetails?.logo || Logo} alt="Logo" className="w-[15rem] mb-4" />
          <p className="mb-4 smallText w-full md:w-[20rem]">
            {footerDetails?.leftSection?.text || "Explore the beauty of Pakistan with us. Experience comfort, adventure, and memories for a lifetime."}
          </p>
          <div className="flex gap-4 secondary text-xl">
            {Object.entries(footerDetails?.leftSection?.socialLinks || {}).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                {socialIcons[key]}
              </a>
            ))}
          </div>

        </div>

        {/* Column 2: Services */}
        <div>
          <h3 className="subheading-bold mb-4">
            {footerDetails?.middleSection?.heading || "Services"}
          </h3>
          <ul className="space-y-2 smallText">
            {(footerDetails?.middleSection?.menus || [
              { label: "Chairlift", link: "#" },
              { label: "Boating", link: "#" },
              { label: "Tourist Shuttle", link: "#" }
            ]).map((item, index) => (
              <li key={index}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="subheading-bold mb-4">{footerDetails?.rightSection?.heading || "Contact"}</h3>
          <ul className="space-y-2 smallText">
            <li>
              {footerDetails?.rightSection?.menus?.[0]?.address1 || "68, Trade Centre Commercial Area,"}<br />
              {footerDetails?.rightSection?.menus?.[3]?.ph || "Block M.A Johar Town, Lahore, Punjab"}
            </li>
            <li>{footerDetails?.rightSection?.menus?.[1]?.email || "051 3357066"}</li>
            <li>{footerDetails?.rightSection?.menus?.[2]?.address2 || "info@tourism.gov.pk"}</li>
          </ul>
        </div>

      </div>
      <div className="mx-auto border-t mt-10 py-7 flex flex-col md:flex-row justify-between items-center text-sm smallText">
        <span className='smallText'>{footerDetails?.copyright || "Copyright © 2025 tdcp"}</span>
        <span className='smallText'>
          Designed & Developed by <span className='primary underline'>Stash Technologies</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
