// components/CheckoutModal.jsx
import { FaTimes } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import Stepper from "./Stepper"
import { createBooking } from '../../APIS';
import { toast } from 'react-toastify';
export const CheckoutModal = ({ show, data, onClose, openThankYou }) => {
    const [selectedPayment, setSelectedPayment] = useState("bop");
    const [showThankYou, setShowThankYou] = useState(false);
    const [tickets, setTickets] = useState(data?.selectedTickets || []);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        customerCity: "",
        customerPhone: "",
        customerCnic: ""
    });
    if (!show) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIncrease = (index) => {
        setTickets(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], count: updated[index].count + 1 };
            return updated;
        });
    };

    const handleDecrease = (index) => {
        setTickets(prev => {
            const updated = [...prev];
            if (updated[index].count > 1) {
                updated[index] = { ...updated[index], count: updated[index].count - 1 };
            }
            return updated;
        });
    };
    const totalPrice = useMemo(() => {
        return tickets.reduce((sum, ticket) => sum + ticket.count * ticket.price, 0)
    })
    const handleCheckout = async () => {
        // Build the booking payload
        if (!formData.customerName || !formData.customerEmail || !formData.customerCity || !formData.customerPhone || !formData.customerCnic) {
            toast.error("Please Fill All the Fields!");
            return;
        }
        setLoading(true);
        const bookingData = {
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerAddress: formData.customerCity,
            Organization: "Tourist Corp",
            Free_tickets: 2,
            customerPhone: formData.customerPhone,
            customerCnic: formData.customerCnic,
            validate: 1,
            paymentMethod: "COD",
            route_id: 13,
            ticket: tickets.map(ticket => ({
                route_id: 13,
                description: ticket.name,
                price: ticket.price
            })),
            loginid: "AD01",
            department: "Tour Operations",
            role: "User",
            expiryDate: "",
            totalAmount: tickets.reduce(
                (sum, t) => sum + t.price * t.count,
                0
            ),
        };
        console.log("payload is ", bookingData)
        try {
            const res = await createBooking(bookingData);
            if (res?.message === "Bookings created successfully") {
                console.log("Booking created successfully:", res);
                const ticketIds = res?.bookings?.map(ticket => ({
                    name: ticket.description,
                    bookingId: ticket.booking_id
                }));
                sessionStorage.setItem("bookingId", JSON.stringify(ticketIds));
                sessionStorage.setItem("Data", JSON.stringify(data));
                sessionStorage.setItem("Tickets", JSON.stringify(tickets))
                openThankYou();
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
        finally {
            setLoading(false); // stop loading in both success and error cases
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4 py-10">
            <ThankyouModal show={showThankYou} onClose={() => setShowThankYou(false)} />
            <div className="bg-white w-full max-w-6xl max-h-full mt-[6rem] overflow-y-auto rounded-lg shadow-lg relative z-50 p-6 md:p-10">
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
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-4 smallText border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                                />

                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-4 smallText border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                                />

                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="text"
                                        name="customerCity"
                                        value={formData.customerCity}
                                        onChange={handleChange}
                                        placeholder="City"
                                        required
                                        className="w-full px-4 py-4 smallText border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-green-500"
                                    />

                                    <input
                                        type="text"
                                        name="customerPhone"
                                        value={formData.customerPhone}
                                        onChange={handleChange}
                                        required
                                        placeholder="03XXXXXXXXX"
                                        className="w-full px-4 py-4 smallText border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-green-500"
                                    />
                                </div>

                                <input
                                    type="text"
                                    name="customerCnic"
                                    value={formData.customerCnic}
                                    onChange={handleChange}
                                    required
                                    placeholder="CNIC(xxxxx-xxxxxxx-x)"
                                    className="w-full px-4 py-4 smallText border outline-none border-gray-300 rounded-md focus:ring-1 focus:ring-green-500"
                                />
                                <p className="smallText mt-2">
                                    We’ll send your confirmation to this email address. <br />
                                    By processing with this booking, I am agreeing to TDCP’s <span className="underline cursor-pointer" style={{ color: "#48AA71" }}>Terms & Conditions</span>.
                                </p>

                                <button type="button" onClick={handleCheckout} className="mt-6 primary-bg text-white w-full py-3 px-6 rounded-md font-medium transition">
                                    {loading ? "Confirming..." : "Confirm "}
                                </button>

                            </form>
                        </div>

                        {/* Right Side - Summary & Payment */}
                        <div className="space-y-6">
                            {/* Summary */}
                            <div className="border border-gray-300 rounded-xl p-6 bg-white">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">Summary</h3>
                                {tickets?.map((ticket, index) => (
                                    <div key={index} className="flex items-center justify-between mb-4">
                                        <span className="smallText">{ticket?.name}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDecrease(index)}
                                                className="px-2 py-1 bg-[#D2ECDD] hover:text-white text-gray-700 rounded"
                                            >-</button>
                                            <span className="w-6 text-center text-sm font-medium">{ticket.count}</span>
                                            <button
                                                onClick={() => handleIncrease(index)}
                                                className="px-2 py-1 bg-[#D2ECDD] hover:text-white text-gray-700 rounded"
                                            >+</button>
                                        </div>
                                        <span className="smallText">PKR {ticket.price}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between smallText mb-4">
                                    <span>Date</span>
                                    <span>{new Date(data?.date).toLocaleDateString('en-CA')}</span>
                                </div>
                                <hr className="my-4" />
                                <div className="space-y-2 smallText">
                                    {/* <div className="flex justify-between"><span className="underline">Subtotal</span><span>PKR 500</span></div> */}
                                    <div className="flex justify-between"><span className="underline pb-3">Tax</span><span>Inclusive</span></div>
                                    <hr className="my-4" />
                                    <div className="flex justify-between"><strong>Total</strong><strong>PKR {totalPrice}</strong></div>
                                </div>
                            </div>

                            {/* Payment */}
                            {/* <div className="border border-gray-300 rounded-xl p-6 bg-white">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">Credit Card Payment</h3>

                                <div className="flex gap-3 mb-6">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="bop"
                                            className="accent-green-600 "
                                            checked={selectedPayment === "bop"}
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
                                            checked={selectedPayment === "cod"}
                                            onChange={() => setSelectedPayment("cod")}
                                        />
                                        <span className="smallText">Cash on Delivery</span>
                                    </label>
                                </div>

                                {selectedPayment === "bop" && (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Enter Account Number"
                                            className="w-full px-4 py-4 border border-gray-300 rounded-md outline-none smallText focus:ring-1 focus:ring-green-500"
                                        />
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-1/2 px-4 py-4 border border-gray-300 rounded-md outline-none smallText focus:ring-1 focus:ring-green-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-1/2 px-4 py-4 border border-gray-300 rounded-md outline-none smallText focus:ring-1 focus:ring-green-500"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div> */}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export const ThankyouModal = ({ show, onClose }) => {
    if (!show) return null;
    const bookingId = JSON.parse(sessionStorage.getItem("bookingId"));
    const Data = JSON.parse(sessionStorage.getItem("Data"));
    const tickets = JSON.parse(sessionStorage.getItem("Tickets"))
    const totalPrice = useMemo(() => {
        return tickets?.reduce((sum, ticket) => sum + ticket.count * ticket.price, 0)
    })
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
                                We've received your details and your booking is now secured.
                                {bookingId?.map((ticket, index) => (
                                    <span key={index}>
                                        <br /><strong>{ticket.name}</strong> | Booking ID : <strong>{ticket.bookingId}</strong>
                                    </span>
                                ))}
                                <br />
                                Thankyou for Your Trust!
                                {/*  A confirmation email has been sent to you with all the necessary information. */}
                            </p>

                            <h3 className="text-lg md:text-xl font-semibold mt-6 mb-4">
                                Your Booking is Confirmed
                            </h3>

                            <button
                                className="primary-bg text-white w-full hover:text-white px-6 py-4 mt-4"
                                onClick={onClose}
                            >
                                Go to Homepage
                            </button>
                        </div>

                        {/* Right Content */}
                        <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-md h-fit">
                            <h3 className="text-lg md:text-xl font-semibold mb-4">Summary</h3>

                            {tickets?.map((ticket, index) => (
                                <div key={index} className="flex items-center justify-between mb-4">
                                    <span className="smallText">{ticket?.name}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-[#D2ECDD] hover:text-white text-gray-700 rounded"
                                        >-</button>
                                        <span className="w-6 text-center text-sm font-medium">{ticket.count}</span>
                                        <button
                                            className="px-2 py-1 bg-[#D2ECDD] hover:text-white text-gray-700 rounded"
                                        >+</button>
                                    </div>
                                    <span className="smallText">PKR {ticket.price}</span>
                                </div>
                            ))}
                            <div className="flex justify-between smallText mb-4">
                                <span>Date</span>
                                <span>{new Date(Data?.date).toLocaleDateString('en-CA')}</span>
                            </div>

                            <hr className="my-4" />

                            <div className="space-y-2 smallText">
                                {/* <div className="flex justify-between">
                                    <span className="underline">Subtotal</span>
                                    <span>PKR 500</span>
                                </div> */}
                                <div className="flex justify-between">
                                    <span className="underline pb-3">Tax</span>
                                    <span>Inclusive</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <strong>Total</strong>
                                    <strong>PKR {totalPrice}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

