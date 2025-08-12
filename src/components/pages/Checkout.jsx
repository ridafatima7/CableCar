// components/CheckoutModal.jsx
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Stepper from "./Stepper"
export const CheckoutModal = ({  show, onClose, openThankYou  }) => {
    const [selectedPayment, setSelectedPayment] = useState("bop");
    const [showThankYou, setShowThankYou] = useState(false);
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4 py-10">
            <ThankyouModal show={showThankYou} onClose={() => setShowThankYou(false)} />
            <div className="bg-white w-full max-w-6xl max-h-full mt-[14rem] overflow-y-auto rounded-lg shadow-lg relative z-50 p-6 md:p-10">
                {/* Close Button */}
                <div
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#8C8C8C] hover:text-black text-xl cursor-pointer"
                >
                    <FaTimes />
                </div>

                {/* Modal Content */}
                <section className="py-4">
                    <Stepper currentStep={1} />

                    {/* Disclaimer */}
                    <div className="mt-10 border border-gray-300 rounded-xl p-6">
                        <h2 className="text-lg md:text-xl font-semibold text-red-600 mb-2">Disclaimer</h2>
                        <p className="smallText">
                            The management of TDCP is fully committed to facilitate the tourist, however, the department, management
                            and associated personal are not liable for any injury, loss, or damage sustained during the chairlift
                            cable car rides.
                        </p>
                    </div>

                    {/* Booking Info Form */}
                    <div className="mt-10 grid md:grid-cols-2 gap-10">
                        {/* Left Form Section */}
                        <div className="border border-gray-300 bg-white rounded-xl p-6 shadow-sm h-fit">
                            <h3 className="mb-6 text-lg md:text-xl font-semibold">Let us know who you are</h3>

                            <form className="space-y-4">
                                <input type="text" placeholder="Enter your full name" className="w-full px-4 py-4 smallText border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
                                <input type="email" placeholder="Enter your email" className="w-full px-4 py-4 smallText border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input type="text" placeholder="City" className="w-full px-4 py-4 smallText border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
                                    <input type="text" placeholder="03XXXXXXXXX" className="w-full px-4 py-4 smallText border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />
                                </div>
                                <input type="text" placeholder="xxxxx-xxxxxxx-x" className="w-full px-4 py-4 smallText border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500" />

                                <p className="smallText mt-2">
                                    We’ll send your confirmation to this email address. <br />
                                    By processing with this booking, I am agreeing to TDCP’s <span className="underline cursor-pointer" style={{ color: "#48AA71" }}>Terms & Conditions</span>.
                                </p>

                                <button type="button"  onClick={openThankYou} className="mt-6 primary-bg text-white w-full py-3 px-6 rounded-md font-medium transition">
                                    Continue
                                </button>

                            </form>
                        </div>

                        {/* Right Side - Summary & Payment */}
                        <div className="space-y-6">
                            {/* Summary */}
                            <div className="border border-gray-300 rounded-xl p-6 bg-white">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">Summary</h3>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="smallText">General</span>
                                    <div className="flex items-center gap-2">
                                        <button className="px-2 py-1 bg-[#D2ECDD] hover:text-white text-gray-700 rounded">-</button>
                                        <span className="w-6 text-center text-sm font-medium">1</span>
                                        <button className="px-2 py-1 bg-[#D2ECDD] hover:text-white text-gray-700 rounded">+</button>
                                    </div>
                                    <span className="smallText">PKR 500</span>
                                </div>
                                <div className="flex justify-between smallText mb-4">
                                    <span>Date</span>
                                    <span>24 June 2025</span>
                                </div>
                                <hr className="my-4" />
                                <div className="space-y-2 smallText">
                                    <div className="flex justify-between"><span className="underline">Subtotal</span><span>PKR 500</span></div>
                                    <div className="flex justify-between"><span className="underline">Tax</span><span>PKR 50</span></div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between"><strong>Total</strong><strong>PKR 550</strong></div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="border border-gray-300 rounded-xl p-6 bg-white">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">Credit Card payment</h3>
                                <div className="flex gap-3 mb-6">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="bop"
                                            className="accent-green-600"
                                            defaultChecked
                                            onChange={() => setSelectedPayment("bop")}
                                        />
                                        <span className="smallText">Bank of Punjab</span>
                                    </label>

                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            className="accent-green-600"
                                            onChange={() => setSelectedPayment("cod")}
                                        />
                                        <span className="smallText">Cash on Delivery</span>
                                    </label>
                                </div>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Enter Account Number" className="w-full px-4 py-4 border border-gray-300 rounded-md smallText focus:ring-1 focus:ring-green-500" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="CVV" className="w-1/2 px-4 py-4 border border-gray-300 rounded-md smallText focus:ring-1 focus:ring-green-500" />
                                        <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-4 border border-gray-300 rounded-md smallText focus:ring-1 focus:ring-green-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export const ThankyouModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4 py-10">
            <div className="bg-white w-full max-w-5xl mt-[10rem] max-h-full overflow-y-auto rounded-lg shadow-lg relative z-50 p-6 md:p-10">
                {/* Close Button */}
                <div
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#8C8C8C] hover:text-black text-xl cursor-pointer"
                >
                    <FaTimes />
                </div>

                <section className="container py-4">
                    <Stepper currentStep={2} />

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {/* Left Content */}
                        <div className="border border-gray-300 rounded-xl p-8 text-center bg-white">
                            <h2 className="text-lg md:text-xl font-semibold mb-6">
                                Thank You for Booking TDCP Chairlift and Cable Car
                            </h2>

                            {/* Success Tick */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 border-4 border-[#48AA71] rounded-full flex items-center justify-center">
                                    <span className="primary text-4xl font-bold">✓</span>
                                </div>
                            </div>

                            {/* Subtext */}
                            <p className="smallText mb-4">
                                We've received your details and your booking is now secured. A
                                confirmation email has been sent to you with all the necessary
                                information.
                            </p>

                            <h3 className="text-lg md:text-xl font-semibold mt-6 mb-4">
                                Your Booking is Confirmed
                            </h3>

                            <button
                                className="primary-bg text-white w-full hover:text-white px-6 py-4 mt-4"
                                onClick={onClose}
                            >
                                Continue
                            </button>
                        </div>

                        {/* Right Content */}
                        <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-md h-fit">
                            <h3 className="text-lg md:text-xl font-semibold mb-4">Summary</h3>

                            <div className="flex items-center justify-between mb-4">
                                <span className="smallText">General</span>
                                <span className="smallText">PKR 500</span>
                            </div>

                            <div className="flex justify-between smallText mb-4">
                                <span>Date</span>
                                <span>24 June 2025</span>
                            </div>

                            <hr className="my-4" />

                            <div className="space-y-2 smallText">
                                <div className="flex justify-between">
                                    <span className="underline">Subtotal</span>
                                    <span>PKR 500</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Tax</span>
                                    <span>PKR 50</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <strong>Total</strong>
                                    <strong>PKR 550</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

