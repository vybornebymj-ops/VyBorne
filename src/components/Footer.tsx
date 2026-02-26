import React, { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiMessageCircle, FiArrowRight } from 'react-icons/fi';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleNewsletterSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                console.error('Subscription failed');
                setStatus('error');
            }
        } catch (error) {
            console.error('Network error during subscription:', error);
            setStatus('error');
        }
    };

    return (
        <>
            <footer className="bg-charcoal text-cream">
                {/* ── Top editorial block ── */}
                <div className="border-b border-cream/10 py-16 px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-2xs text-stone uppercase tracking-ultra mb-4">— Since 2024</p>
                    <h2 className="font-serif text-5xl md:text-7xl text-cream mb-4 leading-none">VyBorne</h2>
                    <p className="text-stone font-display text-sm max-w-[80vw] sm:max-w-sm mx-auto leading-relaxed">
                        Curated elegance for the modern woman. Quality, style, and sustainability in every stitch.
                    </p>

                    {/* Social Row */}
                    <div className="flex justify-center gap-6 mt-8">
                        <a
                            href="https://instagram.com/vybornebymj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-accent hover:text-accent transition-all duration-300"
                            aria-label="Instagram"
                        >
                            <FiInstagram size={16} />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-accent hover:text-accent transition-all duration-300"
                            aria-label="Facebook"
                        >
                            <FiFacebook size={16} />
                        </a>
                        <a
                            href="/whatsapp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-accent hover:text-accent transition-all duration-300"
                            aria-label="WhatsApp"
                        >
                            <FiMessageCircle size={16} />
                        </a>
                    </div>
                </div>

                {/* ── Three-column links + newsletter ── */}
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                        {/* Shop links */}
                        <div>
                            <h3 className="text-2xs uppercase tracking-ultra text-stone mb-5">Shop</h3>
                            <ul className="space-y-3">
                                {['New Arrivals', 'Dresses', 'Co-ords', 'Sarees', 'Accessories'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to="/shop"
                                            className="text-sm text-cream/60 hover:text-cream transition-colors font-display"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Info links */}
                        <div>
                            <h3 className="text-2xs uppercase tracking-ultra text-stone mb-5">Information</h3>
                            <ul className="space-y-3">
                                <li><Link to="/about" className="text-sm text-cream/60 hover:text-cream transition-colors font-display">Our Story</Link></li>
                                <li><Link to="/shipping" className="text-sm text-cream/60 hover:text-cream transition-colors font-display">Shipping & Returns</Link></li>
                                <li><Link to="/privacy" className="text-sm text-cream/60 hover:text-cream transition-colors font-display">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="text-sm text-cream/60 hover:text-cream transition-colors font-display">Terms of Service</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-2xs uppercase tracking-ultra text-stone mb-5">Contact</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="mailto:vybornebymj@gmail.com" className="text-sm text-cream/60 hover:text-cream transition-colors font-display">
                                        vybornebymj@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="/whatsapp" className="text-sm text-cream/60 hover:text-cream transition-colors font-display">
                                        Chat on WhatsApp
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <span className="uppercase text-[10px] xs:text-xs font-bold tracking-widest text-accent mb-2 block">Don't Miss Out</span>
                            <h2 className="text-2xl xs:text-3xl font-serif text-cream mb-2 xs:mb-3">Join the Club</h2>
                            <p className="text-sm text-cream/50 font-display mb-4 leading-relaxed">
                                New arrivals, style edits & exclusive offers.
                            </p>
                            {status === 'success' ? (
                                <p className="text-accent text-sm font-display">Thank you for subscribing! ✦</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col xs:flex-row gap-2">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === 'error') setStatus('idle');
                                            }}
                                            className={`flex-1 bg-cream/5 border ${status === 'error' ? 'border-red-500' : 'border-cream/15'} text-cream placeholder-stone/50 px-4 py-2.5 text-sm font-display focus:outline-none focus:border-accent transition-colors w-full`}
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className={`${status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-dark'} bg-accent text-cream px-4 py-2.5 transition-colors flex items-center justify-center`}
                                            aria-label="Subscribe"
                                        >
                                            <FiArrowRight size={16} />
                                        </button>
                                    </form>
                                    {status === 'error' && (
                                        <p className="text-xs text-red-400">Please enter a valid email address or try again.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="border-t border-cream/10 py-5 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-2xs text-stone/60 uppercase tracking-ultra">
                        <span>© 2026 VyBorne. All rights reserved.</span>
                        <span>Made with ♥ in India</span>
                    </div>
                </div>
            </footer>

            {/* WhatsApp FAB */}
            <a
                href="/whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-4 rounded-full shadow-hover transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
                aria-label="Chat on WhatsApp"
            >
                <FiMessageCircle size={24} />
                <span className="absolute right-full mr-3 bg-charcoal text-cream text-2xs uppercase tracking-ultra px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Chat with us
                </span>
            </a>
        </>
    );
};

export default Footer;
