"use client";

import { Send } from "lucide-react";
import { useState, useRef, Suspense } from "react";
import { submitContactForm } from "@/app/backend/contact/actions";
// import dynamic from "next/dynamic";

// const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
//   ssr: false,
//   loading: () => <div className="h-[78px] w-[304px] animate-pulse bg-secondary/5 rounded"></div>
// });

export default function ServiceForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [status, setStatus] = useState({
        loading: false,
        error: null,
        success: false
    });

    // const recaptchaRef = useRef(null);
    // const [isVerified, setIsVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // const onReCAPTCHAChange = (captchaCode) => {
    //     if (captchaCode) {
    //         setIsVerified(true);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!isVerified) {
        //     alert("Please verify that you are not a robot");
        //     return;
        // }
        setStatus({ loading: true, error: null, success: false });

        try {
            const result = await submitContactForm(formData);
            if (result.success) {
                setStatus({ loading: false, error: null, success: true });
                setFormData({ name: "", email: "", phone: "", message: "" });
                // recaptchaRef.current.reset();
                // setIsVerified(false);
                setTimeout(() => {
                    setStatus(prev => ({ ...prev, success: false }));
                }, 6000);
            } else {
                setStatus({ loading: false, error: result.error || "Failed to submit", success: false });
            }
        } catch (error) {
            setStatus({ loading: false, error: "Something went wrong", success: false });
        }
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

                {/* ReCAPTCHA Component */}
                {/* <div className="mt-4">
                    <Suspense fallback={<div className="h-[78px] w-[304px] animate-pulse bg-secondary/5 rounded"></div>}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LcQ8o8qAAAAANoMwCM3UTRH4DVBrHWo4CKR06Qd"
                            size="normal"
                            onChange={onReCAPTCHAChange}
                        />
                    </Suspense>
                </div> */}

                <button
                    type="submit"
                    disabled={status.loading}
                    className={`inline-flex items-center justify-center gap-2 gradient-color w-full rounded-lg px-4 py-2.5 text-sm text-white transition-opacity ${
                        status.loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                >
                    <Send className="h-5 w-5" />
                    {status.loading ? "Sending..." : "Send Message"}
                </button>

                {status.error && (
                    <p className="text-sm text-red-500 mt-2">{status.error}</p>
                )}
                {status.success && (
                    <p className="text-sm text-green-500 mt-2">Your Enquiry has been submitted successfully. We will get back to you as soon as possible.</p>
                )}
            </form>
        </div>
    );
}
