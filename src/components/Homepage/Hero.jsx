import React, { useState, useRef, useEffect } from 'react';
import { DatePicker } from 'antd';
import { FaPlus, FaMinus, FaChevronDown } from 'react-icons/fa';
import hero from '../../assets/hero.jpg';
import 'antd/dist/reset.css';
import { CheckoutModal, ThankyouModal } from '../pages/Checkout';
import { getTickets } from '../../APIS';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const Hero = () => {
    const [ticketType, setTicketType] = useState('General');
    const [general, setGeneral] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [executive, setExecutive] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);
    const [date, setDate] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ticketCounts, setTicketCounts] = useState({});
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef(null);
    const [totalSelected, setTotalSelected] = useState(0);
    const [checkoutData, setCheckoutData] = useState(null);
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
    let firstPart = "";
    let secondPart = "";

    if (heroContent?.heading) {
        [firstPart, secondPart] = heroContent.heading
            .split(/—|_/)
            .map(str => str.trim());
    }
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
    // Fetch tickets on mount
    useEffect(() => {
        const fetchTickets = async () => {
            const data = await getTickets();
            if (data) {
                setTickets(data.data);
                console.log("Tickets data is ", data.data)
                // Initialize counts with 0
                const initialCounts = {};
                data.forEach(ticket => {
                    initialCounts[ticket.description] = 0;
                });
                setTicketCounts(initialCounts);
            }
        };
        fetchTickets();
    }, []);

    // Update totalSelected whenever ticketCounts changes
    useEffect(() => {
        const total = Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);
        setTotalSelected(total);
    }, [ticketCounts]);
    const handleCheckout = () => {
        if (!date) {
            toast.error("Please Select Date before Proceeding.");
            return;
        }
        const selectedTickets = Object.entries(ticketCounts)
            .filter(([_, count]) => count > 0)
            .map(([name, count]) => {
                const ticket = tickets.find(t => t.description === name);
                return {
                    id: ticket?.id || null,
                    name,
                    count,
                    price: ticket?.price || 0
                };
            });
            if (selectedTickets.length === 0) {
                toast.error("Please Select at least 1 Ticket before Proceeding.");
                return;
            }
        setCheckoutData({
            date,
            selectedTickets,
            tickets // full tickets array
        });

        setShowCheckout(true);
    };
    return (
        <section
            className="relative z-10 bg-cover bg-center bg-no-repeat min-h-[100vh] flex items-start  md:items-center"
            style={{ backgroundImage: `url(${heroContent?.image || hero})` }}
            id='HeroSection'
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />
            {/* Content */}
            <div className='container'>
                <div className="mt-[9rem] mx-auto px-4 relative z-10 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-center md:text-left">
                            <h1 className="hero_heading mb-4">
                                {firstPart || "Patriata Awaits"}<br className="hidden md:block" /> {secondPart || "Explore Nature from New Heights"}
                            </h1>
                            <p className="smallText md:mx-0" style={{ color: "white" }}>
                                {heroContent?.paragraph || "Experience the thrill of soaring above Murree’s lush forests with our scenic chairlift— book your ride online for a seamless and memorable adventure."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showCheckout && checkoutData && (
                <CheckoutModal
                    show={showCheckout}
                    data={checkoutData}
                    onClose={() => setShowCheckout(false)}
                    openThankYou={() => {
                        setShowThankYou(true);
                        setShowCheckout(false);
                    }}
                />
            )}


            <ThankyouModal
                show={showThankYou}
                onClose={() => setShowThankYou(false)}
            
            />
            {/* Floating Card */}
            <div className="absolute md:bottom-[-2.5rem] bottom-[10%] left-1/2 transform -translate-x-1/2 w-[95%] md:w-[55%] bg-white rounded-xl shadow-xl p-2 flex flex-col md:flex-row gap-3  items-center justify-between z-20">

                {/* <div className="bg-[#F5F5F5] p-2 rounded-xl w-full w-full">
                    <label className="block text-sm font-semibold text-gray-600 my-2">
                        Choose No. of Tickets
                    </label>
                    <div className="relative w-full" ref={dropdownRef}>
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
                </div> */}
                <div className="bg-[#F5F5F5] p-2 rounded-xl w-full">
                    <label className="block text-sm font-semibold text-gray-600 ">
                        Choose No. of Tickets
                    </label>

                    <div className="relative w-full" ref={dropdownRef}>
                        {/* Trigger */}
                        <div
                            className="flex items-start justify-between rounded-xl bg-[#F5F5F5] py-1 cursor-pointer"
                            onClick={() => setShowOptions(prev => !prev)}
                        >
                            <span className="smallText">
                                {Object.entries(ticketCounts).some(([_, count]) => count > 0)
                                    ? `Ticket Selected : ${Object.values(ticketCounts).reduce((sum, c) => sum + c, 0)
                                    }`
                                    : "Choose tickets"}
                            </span>

                            <FaChevronDown className="text-gray-500 mr-2 mt-2" size={14} />
                        </div>

                        {/* Dropdown */}
                        {showOptions && (
                            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                {tickets.map(ticket => (
                                    <div
                                        key={ticket.id}
                                        className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        <span className="smallText">{ticket.description}(Rs {ticket.price})</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setTicketCounts(prev => ({
                                                        ...prev,
                                                        [ticket.description]: Math.max(0, prev[ticket.description] - 1)
                                                    }));
                                                }}
                                                className="bg-[#D2ECDD] hover:text-white rounded-xl p-2"
                                            >
                                                <FaMinus size={12} />
                                            </button>
                                            <span className="text-sm font-semibold w-4 text-center">
                                                {ticketCounts[ticket.description] || 0}
                                            </span>
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setTicketCounts(prev => ({
                                                        ...prev,
                                                        [ticket.description]: (prev[ticket.description] || 0) + 1
                                                    }));
                                                }}
                                                className="bg-[#D2ECDD] hover:text-white rounded-xl p-2"
                                            >
                                                <FaPlus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Date Picker */}
                <div className="bg-[#F5F5F5] px-4 py-1 rounded-xl w-full">
                    <label className="block text-sm font-semibold text-gray-600">Date</label>
                    <DatePicker
                        onChange={(value) => setDate(value)}
                        placeholder="Choose Date"
                        suffixIcon={null}
                        disabledDate={(currentDate) => currentDate && currentDate.isBefore(dayjs().startOf('day'))}
                        className="custom-datepicker w-full md:w-60 h-10 pr-4 pl-0 py-1 bg-[#F5F5F5] rounded-xl hover:bg-[#F5F5F5] focus:bg-[#F5F5F5] border-none outline-none focus:ring-0"
                    />
                </div>

                {/* Book Now Button */}
                <div className="flex   w-full md:w-auto">
                    <div className="w-full md:w-auto flex items-center justify-center">
                        <button onClick={handleCheckout} className="w-full text-nowrap md:w-auto py-3 bg-green-600 hover:bg-green-700 text-white px-8 transition duration-300">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;