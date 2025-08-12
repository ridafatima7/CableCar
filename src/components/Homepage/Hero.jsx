import React, { useState, useRef, useEffect } from 'react';
import { DatePicker } from 'antd';
import { FaPlus, FaMinus, FaChevronDown } from 'react-icons/fa';
import hero from '../../assets/hero.jpg';
import 'antd/dist/reset.css';
import { CheckoutModal, ThankyouModal } from '../pages/Checkout';

const Hero = () => {
    const [ticketType, setTicketType] = useState('General');
    const [general, setGeneral] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [executive, setExecutive] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [date, setDate] = useState(null);
    const dropdownRef = useRef(null);
    const storedData = JSON.parse(sessionStorage.getItem("content") || "{}");

    let heroContent = null;

    if (storedData.sections && storedData.images) {
        // Find the hero section
        const heroSection = storedData.sections.find(sec => sec.id === "hero");

        if (heroSection) {
            // Find matching image by name (imageIdentifier + optional suffix)
            const heroImage = storedData.images.find(img =>
                img.name.startsWith('hero_img-1')
            );
            // Merge section + image
            heroContent = {
                ...heroSection,
                image: heroImage ? heroImage.path : null
            };
        }
    }

    console.log(heroContent);
    const [firstPart, secondPart] = heroContent?.heading.split(/—|_/).map(str => str.trim());
    // Click outside to close
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);
    return (
        <section
            className="relative z-10 bg-cover bg-center bg-no-repeat min-h-[100vh] flex items-start  md:items-center"
            style={{ backgroundImage: `url(${heroContent?.image || hero})` }}
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />
            {/* Content */}
            <div className='container'>
                <div className="mt-[9rem] mx-auto px-4 relative z-10 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="hero_heading mb-4">
                            {firstPart  ||  "Patriata Awaits" }<br className="hidden md:block" /> { secondPart || "Explore Nature from New Heights"}
                            </h1>
                            <p className="smallText md:mx-0" style={{ color: "white" }}>
                                {heroContent?.paragraph || "Experience the thrill of soaring above Murree’s lush forests with our scenic chairlift— book your ride online for a seamless and memorable adventure."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutModal
                show={showCheckout}
                onClose={() => setShowCheckout(false)}
                openThankYou={() => {
                    setShowThankYou(true);
                    setShowCheckout(false);
                }}
            />

            <ThankyouModal
                show={showThankYou}
                onClose={() => setShowThankYou(false)}
            />
            {/* Floating Card */}
            <div className="absolute md:bottom-[-4rem] bottom-[10%] left-1/2 transform -translate-x-1/2 w-[95%] md:w-[65%] bg-white rounded-xl shadow-xl p-3 md:p-4 flex flex-col md:flex-row gap-3  items-center justify-between z-20">

                {/* No. of Tickets */}
                <div className="bg-[#F5F5F5] p-2 rounded-xl w-full w-full">
                    <label className="block text-sm font-semibold text-gray-600 my-2">
                        Choose No. of Tickets
                    </label>
                    <div className="relative w-full" ref={dropdownRef}>
                        {/* Trigger */}
                        <div
                            className="flex items-start justify-between  rounded-xl bg-[#F5F5F5] py-2  cursor-pointer"
                            onClick={() => setShowOptions((prev) => !prev)}
                        >
                            <span className="smallText">
                                {general === 0 && executive === 0
                                    ? 'Choose tickets'
                                    : `${general > 0 ? `${general} General` : ''} ${executive > 0 ? `${executive} Executive` : ''
                                    }`}
                            </span>

                            <FaChevronDown className="text-gray-500 mr-2 mt-2" size={14} />
                        </div>

                        {/* Dropdown */}
                        {showOptions && (
                            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                {['General', 'Executive'].map((type) => {
                                    const count = type === 'General' ? general : executive;
                                    return (
                                        <div
                                            key={type}
                                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                                            onClick={() => setTicketType(type)}
                                        >
                                            <span className="smallText">{type}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        type === 'General'
                                                            ? setGeneral(Math.max(0, general - 1))
                                                            : setExecutive(Math.max(0, executive - 1));
                                                    }}
                                                    className="bg-[#D2ECDD]  hover:text-white rounded-xl p-2"
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="text-sm font-semibold w-4 text-center">{count}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        type === 'General'
                                                            ? setGeneral(general + 1)
                                                            : setExecutive(executive + 1);
                                                    }}
                                                    className="bg-[#D2ECDD]  hover:text-white rounded-xl p-1 p-2"
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Date Picker */}
                <div className="bg-[#F5F5F5] px-4 py-1 rounded-xl w-full">
                    <label className="block text-sm font-semibold text-gray-600 my-2">Date</label>
                    <DatePicker
                        onChange={(value) => setDate(value)}
                        placeholder="Choose Date"
                        suffixIcon={null}
                        className="custom-datepicker w-full md:w-60 h-12 pr-4 pl-0 py-2 bg-[#F5F5F5] rounded-xl hover:bg-[#F5F5F5] focus:bg-[#F5F5F5] border-none outline-none focus:ring-0"
                    />
                </div>

                {/* Book Now Button */}
                <div className="flex h-[90px] w-full md:w-auto">
                    <div className="w-full h-full md:w-auto h-full flex items-center justify-center">
                        <button onClick={() => setShowCheckout(true)} className="h-full w-full text-nowrap md:w-auto h-full bg-green-600 hover:bg-green-700 text-white px-8 transition duration-300">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;