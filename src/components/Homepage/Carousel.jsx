import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import service_img from "../../assets/busService.jpg";
import { Autoplay, Pagination } from 'swiper/modules';
const Reviews = ({reviews}) => {
    const swiperRef = useRef(null);
    // const reviews = [
    //     {
    //         title: 'Amazing Experience',
    //         name: 'Sarah Khan',
    //         rating: 5,
    //         comment:
    //             'TripNavigator made our dream vacation a reality! From the moment we contacted them, their team was attentive, knowledgeable, and dedicated to ensuring we had an unforgettable experience.',
    //     },
    //     {
    //         title: 'Excellent Service',
    //         name: 'Ali Raza',
    //         rating: 4,
    //         comment:
    //             'TripNavigator made our dream vacation a reality! From the moment we contacted them, their team was attentive, knowledgeable, and dedicated to ensuring we had an unforgettable experience.',
    //     },
    //     {
    //         title: 'Highly Recommend!',
    //         name: 'Maria Ahmed',
    //         rating: 5,
    //         comment:
    //             'TripNavigator made our dream vacation a reality! From the moment we contacted them, their team was attentive, knowledgeable, and dedicated to ensuring we had an unforgettable experience.',
    //     },
    //     {
    //         title: 'Smooth & Enjoyable',
    //         name: 'Usman Tariq',
    //         rating: 4,
    //         comment:
    //             'Booking was super easy and the staff helped us throughout our tour. Loved the overall service.',
    //     },
    //     {
    //         title: 'Unforgettable Memories',
    //         name: 'Zainab Ali',
    //         rating: 5,
    //         comment:
    //             'From pick-up to drop-off, everything was perfect. Thank you for making this trip special!',
    //     },
    // ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = reviews?.review?.length;
    return (
        <section className="bg-[#F6F6F9] py-12 md:py-28">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="main_heading mb-12">{reviews?.heading || "What Clients Say About Us"}</h2>

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {reviews?.reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-6 h-full flex flex-col justify-between text-center">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                                    {review.title}
                                </h3>
                                <p className="smallText mb-2">{review.name}</p>

                                <div className="flex justify-center items-center text-yellow-400 mb-4">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <FaStar key={i} size={16} />
                                    ))}
                                </div>

                                <p className="smallText leading-relaxed">{review.comment}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        disabled={currentIndex === 0}
                        className={`p-3 rounded-full transition-all duration-300 ${currentIndex === 0
                            ? 'bg-white text-gray-400 cursor-not-allowed border'
                            : 'primary-bg text-white hover:secondary-bg'
                            }`}
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        disabled={currentIndex >= totalSlides - 1}
                        className={`p-3 rounded-full transition-all duration-300 ${currentIndex >= totalSlides - 1
                            ? 'bg-white text-gray-400 cursor-not-allowed border'
                            : 'primary-bg text-white hover:secondary-bg'
                            }`}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
};
export default Reviews;

export const OurServices = ({services}) => {
    const swiperRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [perView, setPerView] = useState(3); // Default for desktop

    // const services = [
    //     {
    //         title: 'Bus Services',
    //         description:
    //             'Comfortable shuttle and bus services are available to transport visitors from Murree city and surrounding areas to the Patriata Chairlift base station.',
    //         image: service,
    //     },
    //     {
    //         title: 'Tourist Guidance',
    //         description:
    //             'Expert guides ensure tourists have safe, informative, and enjoyable experiences across all services.',
    //         image: service,
    //     },
    //     {
    //         title: 'Ticketing Support',
    //         description:
    //             'On-site and online ticketing support for quick, hassle-free access to your ride.',
    //         image: service,
    //     },
    //     {
    //         title: 'Support',
    //         description:
    //             'On-site and online ticketing support for quick, hassle-free access to your ride.',
    //         image: service,
    //     },
    // ];

    const handleSlideChange = (swiper) => {
        const currentSlidesPerView = swiper.params.breakpoints
            ? swiper.params.breakpoints[swiper.currentBreakpoint]?.slidesPerView || 1
            : swiper.params.slidesPerView;

        setPerView(currentSlidesPerView);
        const page = Math.floor(swiper.activeIndex / currentSlidesPerView);
        setCurrentPage(page);
    };

    return (
        <section className="bg-white py-12 md:py-28">
            <div className="container text-center">
                <p className="subheading mb-2">{services?.id || "OUR SERVICES"}</p>
                <h2 className="main_heading mb-12">
                   {services?.heading || "Making Your Journey Seamless"}
                </h2>

                <Swiper
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Pagination,Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSlideChange}
                >
                    {services?.services.map((service, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="group relative rounded-xl overflow-hidden h-[360px] flex flex-col justify-end p-6 bg-cover bg-center text-center text-white"
                                style={{ backgroundImage: `url(${service?.image || service_img})` }}
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 z-0" />
                                <div className="relative z-10">
                                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="smallText mb-4 text-white md:px-[3rem]" style={{color:"white"}}>
                                        {service.description}
                                    </p>
                                    <div className="h-0 overflow-hidden opacity-0 translate-y-4 group-hover:h-auto group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-4 transition-all duration-300 ease-in-out">
                                        <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/*  Custom Pagination */}
                <div className="flex justify-center mt-16 gap-2">
                    {Array.from({ length: Math.ceil(services?.services?.length / perView) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => swiperRef.current?.slideTo(index * perView)}
                            className={`md:w-3 h-5 w-5 md:h-3 rounded-full transition-colors duration-300 ${currentPage === index ? 'primary' : 'bg-[#D9D9D9]'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};