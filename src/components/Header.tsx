import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser, FiHeart } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import LoginModal from './LoginModal';

/* ── Announcement Bar ─────────────────────────────────── */
const AnnouncementBar: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
    <div className="bg-charcoal text-cream text-center text-2xs tracking-ultra uppercase py-2.5 px-10 relative animate-slide-down font-display">
        <span className="inline-flex items-center gap-6">
            <span>Free shipping on orders above ₹999</span>
            <span className="text-accent">·</span>
            <span>New arrivals every Friday</span>
            <span className="text-accent">·</span>
            <span>Sustainable &amp; ethically made</span>
        </span>
        <button
            onClick={onDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors"
            aria-label="Dismiss"
        >
            <FiX size={14} />
        </button>
    </div>
);

/* ── Header ───────────────────────────────────────────── */
const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const searchRef = useRef<HTMLInputElement>(null);

    const { toggleCart, totalItems } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [location]);

    useEffect(() => {
        if (isSearchOpen && searchRef.current) searchRef.current.focus();
    }, [isSearchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        if (href.startsWith('#')) {
            if (location.pathname === '/') {
                const el = document.getElementById(href.substring(1));
                el?.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
            }
        } else {
            navigate(href);
        }
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '#contact' },
    ];

    // Styling logic
    const transparent = isHome && !isScrolled;
    const headerBg = transparent
        ? 'bg-transparent border-transparent'
        : 'bg-cream/95 backdrop-blur-sm border-b border-stone/10 shadow-card';
    const textColor = transparent ? 'text-white' : 'text-charcoal';
    const iconColor = transparent ? 'text-white hover:text-white/70' : 'text-charcoal hover:text-accent';

    return (
        <>
            {/* Announcement Bar */}
            {showAnnouncement && <AnnouncementBar onDismiss={() => setShowAnnouncement(false)} />}

            <header className={`${headerBg} ${transparent ? 'fixed' : 'sticky top-0'} w-full z-50 transition-all duration-500`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src={logo}
                                alt="VyBorne"
                                className={`h-10 md:h-12 w-auto transition-all duration-500 ${transparent ? 'invert grayscale contrast-200' : ''}`}
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-10">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className={`nav-link ${isActive ? 'active' : ''} ${textColor} bg-transparent border-none cursor-pointer transition-colors duration-300`}
                                    >
                                        {link.name}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Action Icons */}
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative flex items-center">
                                {isSearchOpen && (
                                    <form
                                        onSubmit={handleSearchSubmit}
                                        className="absolute right-full mr-3 animate-fade-in"
                                    >
                                        <input
                                            ref={searchRef}
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-52 pl-4 pr-3 py-1.5 text-sm bg-cream border border-stone/30 focus:outline-none focus:border-accent text-charcoal placeholder-stone/60 rounded-none"
                                        />
                                    </form>
                                )}
                                <button
                                    aria-label="Toggle Search"
                                    className={`${iconColor} p-1 transition-colors`}
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                >
                                    {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
                                </button>
                            </div>

                            {/* Wishlist */}
                            <button aria-label="Wishlist" className={`${iconColor} p-1 transition-colors hidden sm:block`}>
                                <FiHeart size={20} />
                            </button>

                            {/* Account */}
                            <button
                                aria-label="Account"
                                className={`${iconColor} p-1 transition-colors`}
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                <FiUser size={20} />
                            </button>

                            {/* Cart */}
                            <button
                                aria-label="Cart"
                                className={`relative ${iconColor} p-1 transition-colors`}
                                onClick={toggleCart}
                            >
                                <FiShoppingBag size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-2xs font-semibold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`md:hidden ${iconColor} p-1 transition-colors`}
                                aria-label="Toggle Menu"
                            >
                                {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer — smooth slide down */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-400 ease-luxury ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } bg-cream border-t border-stone/10`}
                >
                    <nav className="px-6 py-8 flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className="text-left text-xl font-serif text-charcoal hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
                            >
                                {link.name}
                            </button>
                        ))}
                        <div className="pt-4 border-t border-stone/20">
                            <form onSubmit={handleSearchSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-stone/30 bg-cream text-charcoal placeholder-stone/50 focus:outline-none focus:border-accent text-sm"
                                />
                                <button type="submit" className="bg-charcoal text-cream px-4 text-sm">
                                    Go
                                </button>
                            </form>
                        </div>
                    </nav>
                </div>

                <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            </header>
        </>
    );
};

export default Header;
