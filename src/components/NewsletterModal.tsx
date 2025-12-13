import React, { useEffect, useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

const NewsletterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        // Check localStorage
        const isSubscribed = localStorage.getItem('newsletter_subscribed');
        const hasSeen = localStorage.getItem('newsletter_seen_session'); // could use sessionStorage for per-session

        if (!isSubscribed && !hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000); // Show after 2 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('newsletter_seen_session', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            return;
        }

        // Mock API call
        setStatus('success');

        // Persist choice
        localStorage.setItem('newsletter_subscribed', 'true');

        // Auto close after success message
        setTimeout(() => {
            setIsOpen(false);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up flex flex-col md:flex-row">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 rounded-full transition-colors z-20"
                >
                    <FiX size={18} />
                </button>

                {/* Left Image Section */}
                <div className="hidden md:block w-2/5 relative">
                    <img
                        src="https://images.unsplash.com/photo-1550614000-4b9519e0z329?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Fashion"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-accent/20 mix-blend-multiply"></div>
                </div>

                {/* Right Content Section */}
                <div className="flex-1 p-8 md:p-10 bg-white">
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <FiCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-serif text-gray-900 mb-2">You're on the list!</h3>
                            <p className="text-gray-500">Thank you for subscribing.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <span className="uppercase text-xs font-bold tracking-widest text-accent mb-2 block">Don't Miss Out</span>
                                <h2 className="text-3xl font-serif text-gray-900 mb-3">Join the Club</h2>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    Subscribe to receive updates, access to exclusive deals, and more.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setStatus('idle');
                                        }}
                                        className={`w-full px-4 py-3 bg-gray-50 border ${status === 'error' ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder-gray-400`}
                                    />
                                    {status === 'error' && (
                                        <p className="mt-1 text-xs text-red-500">Please enter a valid email address.</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-black transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    No spam, ever. Unsubscribe anytime.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;
