import React, { useState, useEffect, useMemo } from 'react';
import img1 from '../../assets/img3.jpg';
import img2 from '../../assets/greenBg.png'
import bottomImage from '../../assets/img4.png';
import { FaCheck } from 'react-icons/fa';
import chooseImg from "../../assets/img2.jpg";
import chooseImg1 from "../../assets/img1.jpg";
import { FaArrowRight } from 'react-icons/fa';
import Reviews, { OurServices } from './Carousel';
import Hero from './Hero';
import { getContent, getSectionsWithImages } from '../../APIS';
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
                        root.style.setProperty("--textColor", parsed.theme.textColor || "#868686");
                        root.style.setProperty("--buttonHoverColor", parsed.theme.buttonHoverColor || "#0D542B")
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
                if (mergedData?.theme) {
                    const root = document.documentElement;
                    root.style.setProperty("--primary", mergedData.theme.primaryColor || "#48AA71");
                    root.style.setProperty("--secondary", mergedData.theme.secondaryColor || "#0D542B");
                    root.style.setProperty("--textColor", mergedData.theme.textColor || "#868686");
                    root.style.setProperty("--buttonHoverColor", mergedData.theme.buttonHoverColor || "#0D542B")
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
    const storedData = JSON.parse(sessionStorage.getItem("content") || "{}");
    
    const sectionsWithImages = useMemo(() => {
        if (storedData.sections && storedData.images) {
            return getSectionsWithImages(storedData.sections, storedData.images);
        }
        return [];
    }, [storedData]);

    // Example: find each section you need
    const aboutUsContent = sectionsWithImages.find(sec => sec.id === "ABOUT US");
    const exploreContent = sectionsWithImages.find(sec => sec.id === "EXPLORE THE CITIES OF PUNJAB WITH US");
    const whyChooseContent = sectionsWithImages.find(sec => sec.id === "WHY CHOOSE US");
    const onlineBookingsystem = sectionsWithImages.find(sec => sec.id === "ONLINE BOOKING SYSTEM");
    const Faqs = sectionsWithImages.find(sec => sec.id === "faqs");
    const ContactUs = sectionsWithImages.find(sec => sec.id === "contact us");
    const reviews =sectionsWithImages.find(sec => sec.id === "reviews");
    const services =sectionsWithImages.find(sec => sec.id === "OUR SERVICES");

    return (
        <>
            <Hero />
            {/* ---------------About Us Section---------------- */}
            <section className="relative bg-white pt-28 pb-40 md:pt-44 md:pb-28 ">
                {/* Content container - above the image */}
                <div className="relative container md:pb-28 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 items-start">

                    {/* Column 1: About us */}
                    <div>
                        <h2 className="subheading mb-2">{aboutUsContent?.id || "ABOUT US"}</h2>
                        <p className="main_heading leading-snug md:w-[80%]">
                            {aboutUsContent?.heading || "Your Gateway to the Skies of Murree"}
                        </p>
                    </div>

                    {/* Column 2: Description + List */}
                    <div>
                        <p className="smallText mb-6">
                            {aboutUsContent?.paragraph || "Located in the scenic hills of Murree, Patriata Chairlift is one of Pakistan’s most popular and picturesque tourist attractions. Operated under the Tourism Development Corporation of Punjab (TDCP), the chairlift offers a safe, comfortable, and unforgettable ride through pine-covered slopes and misty valleys. Designed to provide a peaceful escape into nature."}
                        </p>
                        {aboutUsContent?.highlights?.length > 0 && (
                            <ul className="space-y-4">
                                {aboutUsContent?.highlights.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <img src={img2} alt="" className="w-10 h-10 mt-1" />
                                        <span className="smallText">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Absolute full-width image at bottom */}
                <img
                    src={aboutUsContent?.image || bottomImage}
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
            {/* ---------------EXPLORE THE CITIES OF PUNJAB WITH US Section---------------- */}
            <section className="bg-[#F6F6F9] py-12 md:py-28">
                <div className='container'>
                    {/* Centered Headings */}
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <p className="subheading mb-2">
                            {exploreContent?.id || "EXPLORE THE CITIES OF PUNJAB WITH US"}
                        </p>
                        <h2 className="main_heading">
                            {exploreContent?.heading || "Patriata Chair lift & Cable car Fare"}
                        </h2>
                    </div>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        {exploreContent?.tickets.map((ticket, i) => (
                            <div
                                key={i}
                                className="border border-gray-300 rounded-2xl bg-white p-10 shadow-sm"
                            >
                                <h3 className="subheading-bold mb-4">{ticket.title}</h3>
                                <p className="smallText mb-5">{ticket.description}</p>

                                <p className="text-xl font-normal text-[#333] mb-4 flex items-start gap-1">
                                    <span className="text-sm mt-2">{ticket.price.split(" ")[0]}{" "}</span>
                                    <span className="text-7xl secondary font-normal unna-regular">
                                        {" "}{ticket.price.split(" ")[1]}
                                    </span>
                                    <span className="text-lg mt-6">/per person</span>
                                </p>

                                <button className="w-full text-white px-6 py-3 mb-5">
                                    {ticket.buttonText}
                                </button>

                                <ul className="list-disc smallText pl-5 space-y-1">
                                    {exploreContent?.rules.map((rule, idx) => (
                                        <li key={idx}>{rule}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ---------------WHY CHOOSE US Section---------------- */}
            <section className="bg-white py-12 md:py-28">
                <div className="container space-y-8 md:space-y-16">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                        {/* Left Column - Text Content */}
                        <div>
                            <h2 className="subheading  mb-2">{whyChooseContent?.id || "Why Choose Us"}</h2>
                            <p className="main_heading mb-4">
                                {whyChooseContent?.heading || "A Majestic Journey above the Mountains"}
                            </p>
                            <p className="smallText text-gray-700">
                                {whyChooseContent?.paragraph || `TDCP offers a virtual journey to discover the enchanting paradise of Patriata Murree.
                                Patriata Chair Lift is a popular tourist attraction located in the beautiful hill station
                                of Patriata in the Punjab province of Pakistan. The chair lift is one of the longest and
                                highest in the country, offering breathtaking views of the surrounding mountains and valleys`}
                            </p>
                        </div>

                        {/* Right Column - Image */}
                        <div>
                            <img
                                src={whyChooseContent?.image || chooseImg}
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
                                    {whyChooseContent?.downloadPamphlet?.text || "Embark on Your Scenic Ride to the Clouds Today"}
                                </p>
                                <button className="bg-white secondary px-6 py-3 hover:text-white border border-white">
                                    {whyChooseContent?.downloadPamphlet?.btn || "Download Pamphlet"}
                                </button>
                            </div>
                        </div>

                        {/* Column 2: Stats blocks */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {whyChooseContent?.analytics?.map((item, i) => (
                                <div key={i}>
                                    <p className="text-5xl mb-2 md:mb-0 md:text-7xl unna-regular primary">
                                        {item.value}
                                    </p>
                                    <p className="smallText mt-1">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
            {/* ---------------ONLINE BOOKING SYSTEM Section---------------- */}
            <section className="bg-[#F6F6F9] py-12 md:py-28">
                <div className="container">

                    {/* Row 1: Heading + Button */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <p className="subheading mb-2">{onlineBookingsystem?.id || "ONLINE BOOKING SYSTEM"}</p>
                            <h2 className="main_heading">{onlineBookingsystem?.heading || "Plan Your Visit and Enjoy"}</h2>
                        </div>
                        <button className="text-white px-6 py-3">
                            {onlineBookingsystem?.buttonText || "Book Now"}
                        </button>
                    </div>

                    {/* Row 2: 3 Step Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {onlineBookingsystem?.steps?.map((step, index) => (
                            <React.Fragment key={index}>
                                {/* Step */}
                                <div className="p-6 text-center relative">
                                    <div className="primary-bg text-white w-12 h-12 flex items-center justify-center rounded-xl text-sm mx-auto mb-4">
                                        {step.stepNumber}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600 md:px-[3.5rem]">{step.description}</p>
                                </div>

                                {/* Arrow between steps (desktop only) */}
                                {/* 0 < 2 || 1 < 2  */}
                                {index < onlineBookingsystem?.steps.length - 1 && (
                                    <div
                                        className={`hidden md:flex absolute top-1/2 ${index === 0 ? "left-1/3" : index === 1 ? "left-2/3" : ""
                                            } transform -translate-y-1/2`}
                                    >
                                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                                            <FaArrowRight size={16} className="primary" />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
            <OurServices services={services}/>
            <Reviews  reviews={reviews}/>
            {/* ---------------Faqs SYSTEM Section---------------- */}
            <section className="bg-white py-12 md:py-28">
                <div className='container'>
                    {/* Heading */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="main_heading mb-1">
                            {Faqs?.heading || "Frequently Asked Questions"}
                        </h2>
                        <p className="subheading mb-2">
                             {Faqs?.text || "Still feeling unsure? More questions? These might help!"}
                        </p>
                    </div>

                    {/* FAQ Grid */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                        {Faqs?.Faqs.map((faq, index) => (
                            <div key={index} className="py-3 px-0 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{faq.title}</h3>
                                <p className="smallText">{faq.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            {/* ---------------Contact Us Section---------------- */}
            <section
                className="relative bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: `url(${ContactUs?.image || img1})`,
                    minHeight: '400px',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20">
                    <h2 className="main_heading my-4">
                        {ContactUs?.heading ||  "Ready to Soar Through the Hills?"}
                    </h2>
                    <p className="smallText mb-6" style={{ color: "white" }}>
                         {ContactUs?.paragraph ||  "Hop on the Patriata Chairlift and glide above breathtaking landscapes—your sky-high journey starts now."}
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button className="text-white px-6 py-3">
                             {ContactUs?.buttons?.[0]?.btn ||  "Book Now"}
                        </button>
                        <button className="bg-white secondary hover:text-white transition px-6 py-3  border border-white">
                             {ContactUs?.buttons?.[1]?.btn ||  "Contact Us"}
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home