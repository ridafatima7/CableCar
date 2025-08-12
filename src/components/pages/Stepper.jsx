import React, { useState } from "react";

const Stepper = ({ currentStep  }) => {
    return (
        <>
            {/* -------------Stepper Section------------ */}
            <div className="my-7 flex items-center mx-auto w-[100%] md:w-[65%] justify-between">
                {/* Step 1 */}
                <div className="my-8 flex items-center justify-center flex-col space-x-2">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                            currentStep >= 1 ? "primary-bg text-white" : "bg-gray-300 text-gray-500"
                        }`}
                    >
                        1
                    </div>
                    <p
                        className={`text-sm mt-2 font-medium ${
                            currentStep >= 1 ? "primary" : "text-gray-500"
                        }`}
                    >
                        Customer Information
                    </p>
                </div>

                {/* Connector Line */}
                <div
                    className={`flex-1 h-1 ${
                        currentStep >= 2 ? "primary-bg" : "bg-gray-300"
                    } w-11 min-w-[30px] sm:w-16 md:w-24`}
                ></div>

                {/* Step 2 */}
                <div className="flex items-center flex-col space-x-2">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                            currentStep === 2 ? "primary-bg text-white" : "bg-gray-300 text-gray-500"
                        }`}
                    >
                        2
                    </div>
                    <p
                        className={`text-sm mt-2 font-medium ${
                            currentStep === 2 ? "primary" : "text-gray-500"
                        }`}
                    >
                        Booking Confirmed
                    </p>
                </div>
            </div>
        </>
    );
};

export default Stepper;
