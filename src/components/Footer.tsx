import React, { type FormEvent, useState } from 'react';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiMessageCircle } from 'react-icons/fi';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(`Newsletter subscription for: ${email}`);
        alert(`Thanks for subscribing! (Mock submission for ${email})`);
        setEmail('');
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div className="mb-8 md:mb-0">
                        <span className="text-2xl font-bold tracking-tight text-white">VyBorne</span>
                        <p className="mt-4 text-gray-400 text-sm">
                            Curated elegance for the modern individual. Quality, style, and sustainability in every stitch.
                        </p>
                        <p className="mt-4 text-gray-400 text-sm">
                            Email: <a href="mailto:vybornebymj@gmail.com" className="hover:text-white transition-colors">vybornebymj@gmail.com</a>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">New Arrivals</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Best Sellers</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Accessories</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Sale</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">FAQs</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Shipping & Returns</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Subscribe to our news</h3>
                        <p className="mt-4 text-base text-gray-400">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <form className="mt-4 sm:flex sm:max-w-md" onSubmit={handleNewsletterSubmit}>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                type="email"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                required
                                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-accent"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    className="w-full bg-accent hover:bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-accent transition-colors"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Facebook</span>
                            <FiFacebook size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Instagram</span>
                            <FiInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Twitter</span>
                            <FiTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">LinkedIn</span>
                            <FiLinkedin size={24} />
                        </a>
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                        &copy; 2024 VyBorne, Inc. All rights reserved.
                    </p>
                </div>
            </div>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/919963581446"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50 flex items-center justify-center"
                aria-label="Chat on WhatsApp"
            >
                <FiMessageCircle size={28} />
            </a>
        </footer>
    );
};

export default Footer;
