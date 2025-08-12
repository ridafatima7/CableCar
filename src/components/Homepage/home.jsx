import React, { useState, useEffect } from 'react';
import img1 from '../../assets/img3.jpg';
import img2 from '../../assets/greenBg.png'
import bottomImage from '../../assets/img4.png';
import { FaCheck } from 'react-icons/fa';
import chooseImg from "../../assets/img2.jpg";
import chooseImg1 from "../../assets/img1.jpg";
import { FaArrowRight } from 'react-icons/fa';
import Reviews, { OurServices } from './Carousel';
import Hero from './Hero';
import { getContent } from '../../APIS';
const Home = () => {
    const [content, setContent] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check sessionStorage first
                const savedData = sessionStorage.getItem("content");
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    setContent(parsed);
                    // Apply theme to :root
                    if (parsed?.theme) {
                        const root = document.documentElement;
                        root.style.setProperty("--primary", parsed.theme.primaryColor || "#48AA71");
                        root.style.setProperty("--secondary", parsed.theme.secondaryColor || "#0D542B");
                        root.style.setProperty("--textColor",parsed.theme.textColor || "#868686"  );
                        root.style.setProperty("--buttonHoverColor",parsed.theme.buttonHoverColor || "#0D542B" )
                    }
                    return;
                }
                // Fetch from API
                const data = await getContent();
                if (!data) return;
                const rawContent = data?.data?.contents?.[0]?.content;
                const rawImages = data?.data?.contents?.[0]?.images;
                // Parse JSON strings
                const parsedContent = rawContent ? JSON.parse(rawContent) : {};
                const parsedImages = rawImages ? JSON.parse(rawImages) : [];

                const mergedData = {
                    ...parsedContent,
                    images: parsedImages,
                };
                // Save in state
                setContent(mergedData);
                if(mergedData?.theme){
                    const root = document.documentElement;
                        root.style.setProperty("--primary", mergedData.theme.primaryColor || "#48AA71");
                        root.style.setProperty("--secondary", mergedData.theme.secondaryColor || "#0D542B");
                        root.style.setProperty("--textColor",mergedData.theme.textColor || "#868686"  );
                        root.style.setProperty("--buttonHoverColor",mergedData.theme.buttonHoverColor || "#0D542B" )
                }
                console.log(mergedData)
                // Save in sessionStorage
                sessionStorage.setItem("content", JSON.stringify(mergedData));
            } catch (err) {
                console.error("Error in fetching content:", err);
            }
        };
        fetchData();
    }, []);
    const faqs = [
        {
            question: 'How far is TDCP Patriata Resort located from Murree Expressway?',
            answer: 'TDCP Patriata Resort is located just 6km from Murree Expressway.',
        },
        {
            question: 'Is parking available at the resort?',
            answer: 'Yes, the resort offers spacious and secure parking facilities for visitors.',
        },
        {
            question: 'Are food and beverage options available onsite?',
            answer: 'Absolutely! The resort features dining options and refreshment stalls to serve guests.',
        },
        {
            question: 'What are the operating hours for the chairlift?',
            answer: 'The chairlift typically operates from 9 AM to 6 PM, but timings may vary seasonally.',
        },
        {
            question: 'Can I book tickets online?',
            answer: 'Yes, tickets can be booked online through our official booking platform.',
        },
        {
            question: 'Is TDCP Patriata suitable for children and elderly visitors?',
            answer: 'Yes, the resort is family-friendly and includes accessible facilities.',
        },
    ];
    return (
        <>
            <Hero />
            {/* ---------------2 Section---------------- */}
            <section className="relative bg-white pt-28 pb-40 md:pt-44 md:pb-28 ">
                {/* Content container - above the image */}
                <div className="relative container md:pb-28 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 items-start">

                    {/* Column 1: About us */}
                    <div>
                        <h2 className="subheading mb-2">About Us</h2>
                        <p className="main_heading leading-snug md:w-[80%]">
                            Your Gateway to the Skies of Murree
                        </p>
                    </div>

                    {/* Column 2: Description + List */}
                    <div>
                        <p className="smallText mb-6">
                            Located in the scenic hills of Murree, Patriata Chairlift is one of Pakistan’s most popular and picturesque tourist attractions. Operated under the Tourism Development Corporation of Punjab (TDCP), the chairlift offers a safe, comfortable, and unforgettable ride through pine-covered slopes and misty valleys. Designed to provide a peaceful escape into nature.
                        </p>

                        <ul className="space-y-4">
                            {[
                                'Scenic Heights, Seamless Journeys',
                                'Operated by TDCP for Safe & Memorable Tourism',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <img src={img2} alt="" className="w-10 h-10 mt-1" />
                                    <span className="smallText">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Absolute full-width image at bottom */}
                <img
                    src={bottomImage}
                    alt="About visual"
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        zIndex: '',
                        height: "10rem"
                    }}
                />
            </section>
            {/* ---------------3 Section---------------- */}
            <section className="bg-[#F6F6F9] py-12 md:py-28">
                <div className='container'>
                    {/* Centered Headings */}
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <p className="subheading mb-2">
                            EXPLORE THE CITIES OF PUNJAB WITH US
                        </p>
                        <h2 className="main_heading">
                            Patriata Chair lift & Cable car Fare
                        </h2>
                    </div>

                    {/* Container Wrapper */}
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {/* Card 1 - General */}
                        <div className="border border-gray-300 rounded-2xl bg-white p-10 shadow-sm">
                            <h3 className="subheading-bold mb-4">General</h3>
                            <p className="smallText  mb-5">
                                Book your tickets at multiple location with TDCP.
                                Providing tourist information, Facilitation and Publications to Tourists
                            </p>
                            <p className="text-xl font-normal text-[#333] mb-4 flex items-start gap-1">
                                <span className="text-sm mt-2">Rs  {" "}</span>
                                <span className="text-7xl secondary font-normal unna-regular">{" "}  1000    </span>
                                <span className="text-lg mt-6">  {"  "}   /per person</span>
                            </p>

                            <button className=" w-full text-white px-6 py-3 mb-5">
                                Get Started
                            </button>
                            <ul className="list-disc smallText  pl-5 space-y-1">
                                <li>Ticket is Valid for the date of purchase only.</li>
                                <li>Ticket is for round trip &amp; non-refundable.</li>
                            </ul>
                        </div>

                        {/* Card 2 - Executive */}
                        <div className="border border-gray-300 rounded-2xl bg-white p-10 shadow-sm">
                            <h3 className="subheading-bold mb-4">Executive</h3>
                            <p className="smallText  mb-5">
                                Book your tickets at multiple location with TDCP.<br />
                                Providing tourist information, Facilitation and Publications to Tourists
                            </p>
                            <p className="text-xl font-normal text-[#333] mb-4 flex items-start gap-1">
                                <span className="text-sm mt-2">Rs  {" "}</span>
                                <span className="text-7xl secondary font-normal unna-regular">{" "}  1000    </span>
                                <span className="text-lg mt-6">  {"  "}   /per person</span>
                            </p>
                            <button className=" w-full text-white px-6 py-3 mb-4">
                                Get Started
                            </button>
                            <ul className="list-disc smallText  pl-5 space-y-1">
                                <li>Ticket is Valid for the date of purchase only.</li>
                                <li>Ticket is for round trip &amp; non-refundable.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* ---------------4 Section---------------- */}
            <section className="bg-white py-12 md:py-28">
                <div className="container space-y-8 md:space-y-16">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                        {/* Left Column - Text Content */}
                        <div>
                            <h2 className="subheading  mb-2">Why Choose Us</h2>
                            <p className="main_heading mb-4">
                                A Majestic Journey above the Mountains
                            </p>
                            <p className="smallText text-gray-700">
                                TDCP offers a virtual journey to discover the enchanting paradise of Patriata Murree.
                                Patriata Chair Lift is a popular tourist attraction located in the beautiful hill station
                                of Patriata in the Punjab province of Pakistan. The chair lift is one of the longest and
                                highest in the country, offering breathtaking views of the surrounding mountains and valleys.
                            </p>
                        </div>

                        {/* Right Column - Image */}
                        <div>
                            <img
                                src={chooseImg}
                                alt="Why Choose Us"
                                className="w-full h-[25rem] rounded-xl shadow-md object-cover"
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                        {/* Column 1: Image with text & button overlay */}
                        <div className="relative md:mx-20">
                            <img
                                src={chooseImg1}
                                alt="Scenic Ride"
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex flex-col items-center justify-center text-center p-6">
                                <p className="smallText mb-4 text-white" style={{ color: "white" }}>
                                    Embark on Your Scenic Ride to the Clouds Today
                                </p>
                                <button className="bg-white secondary px-6 py-3 hover:text-white border border-white">
                                    Download Pamphlet
                                </button>
                            </div>
                        </div>


                        {/* Column 2: Stats blocks */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {/* Block 1 */}
                            <div>
                                <p className="text-5xl mb-2 md:mb-0 md:text-7xl unna-regular primary">25+</p>
                                <p className="smallText mt-1">Total Cable Cars</p>
                            </div>

                            {/* Block 2 */}
                            <div>
                                <p className="text-5xl mb-2 md:text-7xl md:mb-0  unna-regular  primary">60+</p>
                                <p className="smallText mt-1">Chairlifts</p>
                            </div>

                            {/* Block 3 */}
                            <div>
                                <p className="text-5xl mb-2 md:text-7xl md:mb-0  unna-regular primary">500+</p>
                                <p className="smallText mt-1">Visitors annually</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* ---------------5 Section---------------- */}
            <section className="bg-[#F6F6F9] py-12 md:py-28">
                <div className="container">

                    {/* Row 1: Heading + Button */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <p className="subheading mb-2">ONLINE BOOKING SYSTEM</p>
                            <h2 className="main_heading">Plan Your Visit and Enjoy</h2>
                        </div>
                        <button className="text-white px-6 py-3">
                            Book Now
                        </button>
                    </div>

                    {/* Row 2: 3 Step Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                        {/* Step 1 */}
                        <div className=" p-6 text-center relative">
                            <div className="primary-bg  text-white w-12 h-12 flex items-center justify-center rounded-xl text-sm mx-auto mb-4">
                                01
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Select Your Location</h3>
                            <p className="text-sm text-gray-600 md:px-[3.5rem]">
                                Select your desired location and service below & book your ticket at your preferred time.
                            </p>
                        </div>

                        {/* Arrow (between step 1 and 2) */}
                        <div className="hidden md:flex absolute top-1/2 left-1/3 transform -translate-y-1/2">
                            <div className="bg-white  w-10 h-10 rounded-full flex items-center justify-center ">
                                <FaArrowRight size={16} className='primary' />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="p-6 text-center relative">
                            <div className="primary-bg  text-white w-12 h-12 flex items-center justify-center rounded-xl text-sm mx-auto mb-4">
                                02
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Select Your Desired Slot</h3>
                            <p className="text-sm text-gray-600 md:px-[3.5rem]">
                                Book your Tickets and Arrive at your picked location.
                            </p>
                        </div>

                        {/* Arrow (between step 2 and 3) */}
                        <div className="hidden md:flex absolute top-1/2 left-2/3 transform -translate-y-1/2">
                            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                                <FaArrowRight size={16} className='primary' />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className=" p-6 text-center">
                            <div className="primary-bg text-white w-12 h-12 flex items-center justify-center rounded-xl text-sm mx-auto mb-4">
                                03
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Book Your E-Ticketing</h3>
                            <p className="text-sm text-gray-600 md:px-[3.5rem]">
                                Show your e-tickets and Enjoy the Ride! Confirmation email also available.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <OurServices />
            <Reviews />
            <section className="bg-white py-12 md:py-28">
                <div className='container'>
                    {/* Heading */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="main_heading mb-1">
                            Frequently Asked Questions
                        </h2>
                        <p className="subheading mb-2">
                            Still feeling unsure? More questions? These might help!
                        </p>
                    </div>

                    {/* FAQ Grid */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-3 px-0 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                <p className="smallText">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            {/* ---------------Last Section---------------- */}
            <section
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: `url(${img1})`,
                    minHeight: '400px',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20">
                    <h2 className="main_heading my-4">
                        Ready to Soar Through the Hills?
                    </h2>
                    <p className="smallText mb-6" style={{ color: "white" }}>
                        Hop on the Patriata Chairlift and glide above breathtaking landscapes—your sky-high journey starts now.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button className="text-white px-6 py-3">
                            Book Now
                        </button>
                        <button className="bg-white secondary hover:text-white transition px-6 py-3  border border-white">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home