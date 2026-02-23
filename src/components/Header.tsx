import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser, FiHeart } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import LoginModal from './LoginModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

/* ── Announcement Bar ─────────────────────────────────── */
const AnnouncementBar: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
    <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
        className="bg-charcoal text-cream text-center text-2xs tracking-mega uppercase py-2.5 px-10 relative font-sans overflow-hidden"
    >
        <div className="flex items-center justify-center gap-3 sm:gap-6 opacity-90 transition-all duration-300">
            <span className="whitespace-nowrap">Free shipping over ₹999</span>
            <span className="text-stone hidden xs:inline">·</span>
            <span className="whitespace-nowrap hidden xs:inline">Sustainable & Ethically Made</span>
        </div>
        <button
            onClick={onDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors"
            aria-label="Dismiss"
        >
            <FiX size={14} />
        </button>
    </motion.div>
);

/* ── Header ───────────────────────────────────────────── */
const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);
    const { toggleCart, totalItems } = useCart();
    const { user, signOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
        setIsProfileOpen(false);
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
            if (isHome) {
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

    const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

    return (
        <>
            <AnimatePresence>
                {showAnnouncement && <AnnouncementBar onDismiss={() => setShowAnnouncement(false)} />}
            </AnimatePresence>

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
                className={cn(
                    "w-full z-50 transition-colors duration-500",
                    isTransparent ? "absolute top-0 bg-transparent" : "sticky top-0 bg-cream/95 backdrop-blur-md border-b border-charcoal/5"
                )}
            >
                <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
                    <div className="flex justify-between items-center h-24">

                        {/* Logo - Left */}
                        <div className="flex-1 flex justify-start">
                            <Link to="/" className="flex-shrink-0 group">
                                <img
                                    src={logo}
                                    alt="VyBorne"
                                    className={cn(
                                        "h-8 md:h-10 w-auto transition-all duration-700 group-hover:opacity-70",
                                        isTransparent ? 'invert grayscale contrast-200' : ''
                                    )}
                                />
                            </Link>
                        </div>

                        {/* Centered Navigation */}
                        <nav className="hidden md:flex flex-1 justify-center items-center space-x-12">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.href;
                                return (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className={cn(
                                            "relative text-2xs uppercase tracking-ultra font-medium transition-colors duration-300 group",
                                            isTransparent ? "text-white/90 hover:text-white" : "text-charcoal/80 hover:text-charcoal"
                                        )}
                                    >
                                        {link.name}
                                        <span className={cn(
                                            "absolute -bottom-2 left-0 w-0 h-px transition-all duration-500 group-hover:w-full",
                                            isActive ? "w-full" : "",
                                            isTransparent ? "bg-white" : "bg-charcoal"
                                        )} />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Action Icons - Right */}
                        <div className="flex-1 flex justify-end items-center gap-3 xs:gap-5 md:gap-6">
                            {/* Search */}
                            <div className="relative flex items-center">
                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <motion.form
                                            initial={{ opacity: 0, width: 0, x: 20 }}
                                            animate={{ opacity: 1, width: 'auto', x: 0 }}
                                            exit={{ opacity: 0, width: 0, x: 20 }}
                                            transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
                                            onSubmit={handleSearchSubmit}
                                            className="absolute right-full mr-4 flex"
                                        >
                                            <input
                                                ref={searchRef}
                                                type="text"
                                                placeholder="Search"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-48 lg:w-64 pb-1 bg-transparent border-b border-charcoal/20 focus:outline-none focus:border-charcoal text-sm font-sans text-charcoal placeholder-charcoal/40 uppercase tracking-widest text-2xs"
                                            />
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                                <button
                                    aria-label="Toggle Search"
                                    className={cn("p-1 transition-opacity hover:opacity-50", isTransparent && !isSearchOpen ? "text-white" : "text-charcoal")}
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                >
                                    {isSearchOpen ? <FiX size={20} strokeWidth={1.5} /> : <FiSearch size={20} strokeWidth={1.5} />}
                                </button>
                            </div>

                            {/* Wishlist */}
                            <button aria-label="Wishlist" className={cn("p-1 transition-opacity hover:opacity-50 hidden sm:block", isTransparent ? "text-white" : "text-charcoal")}>
                                <FiHeart size={20} strokeWidth={1.5} />
                            </button>

                            {/* Account */}
                            <div className="relative">
                                {user ? (
                                    <>
                                        <button
                                            aria-label="Account"
                                            className={cn("p-1 transition-opacity hover:opacity-50 flex items-center gap-2", isTransparent ? "text-white" : "text-charcoal")}
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center text-2xs font-sans uppercase tracking-widest border",
                                                isTransparent ? "border-white/30" : "border-charcoal/20 bg-stone/5"
                                            )}>
                                                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute right-0 top-full mt-4 w-56 bg-cream border border-charcoal/10 shadow-editorial z-50 p-2"
                                                >
                                                    <div className="px-4 py-4 border-b border-charcoal/5 mb-2">
                                                        <p className="text-xs font-sans uppercase tracking-widest text-charcoal truncate">
                                                            {user.user_metadata?.full_name || 'My Account'}
                                                        </p>
                                                        <p className="text-2xs font-sans tracking-wide text-stone truncate mt-1">{user.email}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            signOut();
                                                            setIsProfileOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 text-2xs uppercase tracking-ultra text-charcoal hover:bg-stone/5 transition-colors"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <button
                                        aria-label="Account"
                                        className={cn("p-1 transition-opacity hover:opacity-50", isTransparent ? "text-white" : "text-charcoal")}
                                        onClick={() => setIsLoginModalOpen(true)}
                                    >
                                        <FiUser size={20} strokeWidth={1.5} />
                                    </button>
                                )}
                            </div>

                            {/* Cart */}
                            <button
                                aria-label="Cart"
                                className={cn("relative p-1 transition-opacity hover:opacity-50", isTransparent ? "text-white" : "text-charcoal")}
                                onClick={toggleCart}
                            >
                                <FiShoppingBag size={20} strokeWidth={1.5} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-sans font-medium rounded-full h-4 w-4 flex items-center justify-center leading-none">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={cn("md:hidden p-1 transition-opacity hover:opacity-50 z-50", isTransparent && !isMobileMenuOpen ? "text-white" : "text-charcoal")}
                                aria-label="Toggle Menu"
                            >
                                {isMobileMenuOpen ? <FiX size={24} strokeWidth={1} /> : <FiMenu size={24} strokeWidth={1.5} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full Screen Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
                            className="fixed inset-0 bg-cream z-40 md:hidden pt-24 px-6 pb-8 flex flex-col"
                        >
                            <nav className="flex flex-col gap-8 mt-10">
                                {navLinks.map((link, i) => (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-left text-display-3 font-display text-charcoal hover:text-stone transition-colors bg-transparent border-none cursor-pointer leading-none"
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-auto pt-10 border-t border-charcoal/10"
                            >
                                <form onSubmit={handleSearchSubmit} className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 pb-2 border-b border-charcoal/20 bg-transparent text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-charcoal text-sm uppercase tracking-widest font-sans"
                                    />
                                    <button type="submit" className="text-2xs uppercase tracking-ultra text-charcoal">
                                        Go
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            </motion.header>
        </>
    );
};

export default Header;
