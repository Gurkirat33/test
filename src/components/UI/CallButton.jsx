"use client";

import { useState } from "react";
import { PhoneCall, X } from "lucide-react";

export const CallButton = () => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setOpenModal(false);
        setFormData({ name: "", phone: "", message: "" });
    };

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-2 mt-2 lg:mt-0 bg-white text-black font-medium border border-white px-4 py-2 text-sm"
            >
                <PhoneCall size={15} /> Request a Call
            </button>

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row h-[600px]">
                            <div className="w-full md:w-1/2 relative">
                                <img 
                                    src="/about1.jpeg" 
                                    alt="Contact" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                                <div className="max-w-md mx-auto">
                                    <h3 className="text-2xl font-bold mb-6 text-black">Request a Call Back</h3>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                                placeholder="Tell us about your project..."
                                                rows={4}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-white py-3 px-6 gradient-color hover:opacity-90 transition-opacity font-medium text-lg"
                                        >
                                            Submit Request
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};