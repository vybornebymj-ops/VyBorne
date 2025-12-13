import React from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="relative bg-white py-24 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Info */}
                    <div>
                        <h2 className="text-4xl font-serif text-gray-900 mb-6">Let's Connect</h2>
                        <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
                            Have a question about our collections or need styling advice?
                            We'd love to hear from you. Fill out the form or reach out directly.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-accent">
                                    <FiMail size={20} />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-base font-medium text-gray-900">Email Us</h4>
                                    <p className="mt-1 text-gray-500">vybornebymj@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-accent">
                                    <FiPhone size={20} />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-base font-medium text-gray-900">WhatsApp Us</h4>
                                    <a
                                        href="https://wa.me/919876543210"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 text-gray-500 hover:text-accent transition-colors"
                                    >
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-accent">
                                    <FiMapPin size={20} />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-base font-medium text-gray-900">Visit Us</h4>
                                    <p className="mt-1 text-gray-500">3rd Lane, Akkayyapalem, Visakhapatnam, Andhra Pradesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white px-8 py-3.5 rounded-lg hover:bg-black transition-colors duration-300 font-medium group"
                            >
                                <span>Send Message</span>
                                <FiSend className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
