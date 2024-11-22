"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export default function ServiceForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <div className="bg-primary-light rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 relative"><span className="absolute left-0 -bottom-1 h-0.5 w-12 bg-secondary"></span>Get Started Today</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-secondary-light mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 focus:bg-secondary/10 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary-light mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 focus:bg-secondary/10 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary-light mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 focus:bg-secondary/10 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary-light mb-2">
                        Message
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 focus:bg-secondary/10 transition-colors resize-none"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full gradient-color text-white py-2.5 rounded-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                    Send Message
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
}
