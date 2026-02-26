import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser, FiHeart } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';



/* ── Header ───────────────────────────────────────────── */
const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
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

    const primaryLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
    ];

    const secondaryLinks = [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const allLinks = [...primaryLinks, ...secondaryLinks];

    const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

    return (
        <>

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
                    <div className="flex justify-between items-center h-20 md:h-24 relative">

                        {/* Left Section: Mobile Hamburger OR Desktop Logo */}
                        <div className="flex-1 flex justify-start items-center relative z-50">
                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={cn("md:hidden p-1 transition-opacity hover:opacity-50", isTransparent && !isMobileMenuOpen ? "text-white" : "text-charcoal")}
                                aria-label="Toggle Menu"
                            >
                                {isMobileMenuOpen ? <FiX size={24} strokeWidth={1} /> : <FiMenu size={24} strokeWidth={1} />}
                            </button>

                            {/* Desktop Logo */}
                            <Link to="/" className="hidden md:block flex-shrink-0 group">
                                <span className={cn(
                                    "text-3xl sm:text-4xl font-serif font-medium tracking-wide transition-colors duration-300",
                                    isTransparent ? "text-white" : "text-charcoal"
                                )}>
                                    VyBorne
                                </span>
                            </Link>
                        </div>

                        {/* Center Section: Mobile Logo OR Desktop Navigation */}
                        <div className="flex-[2] flex justify-center items-center pointer-events-auto">
                            {/* Mobile Logo */}
                            <Link to="/" className="md:hidden flex-shrink-0 group flex justify-center mt-1">
                                <span className={cn(
                                    "text-3xl font-serif font-medium tracking-wide transition-colors duration-300",
                                    isTransparent ? "text-white" : "text-charcoal"
                                )}>
                                    VyBorne
                                </span>
                            </Link>

                            {/* Desktop Navigation Links */}
                            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
                                {allLinks.map((link) => {
                                    const isActive = location.pathname === link.href;
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => handleNavClick(link.href)}
                                            className={cn(
                                                "relative text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 group",
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
                        </div>

                        {/* Action Icons - Right */}
                        <div className="flex-1 flex justify-end items-center gap-3 xs:gap-5 md:gap-6">
                            {/* Search Icon */}
                            <button
                                aria-label="Toggle Search"
                                className={cn("p-1 transition-opacity hover:opacity-50", isTransparent && !isSearchOpen ? "text-white" : "text-charcoal")}
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                {isSearchOpen ? <FiX size={20} strokeWidth={1.5} /> : <FiSearch size={20} strokeWidth={1.5} />}
                            </button>

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

                        </div>
                    </div>
                </div>

                {/* Dropdown Search Overlay */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
                            className="absolute top-full left-0 w-full bg-cream border-t border-b border-charcoal/5 shadow-editorial z-40"
                        >
                            <div className="max-w-[50rem] mx-auto px-6 py-8">
                                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                    <FiSearch className="absolute left-4 text-charcoal/50" size={24} />
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        placeholder="SEARCH FOR STYLES, CATEGORIES..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-charcoal/20 focus:border-charcoal focus:outline-none py-4 pl-14 pr-12 text-lg sm:text-sidebar font-display text-charcoal placeholder-charcoal/30"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 text-charcoal/50 hover:text-charcoal transition-colors"
                                            aria-label="Clear Search"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Full Screen Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
                            className="fixed inset-0 bg-cream/95 backdrop-blur-md z-40 md:hidden pt-24 px-6 pb-8 flex flex-col"
                        >
                            <nav className="flex flex-col gap-6 mt-10">
                                {primaryLinks.map((link, i) => (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-left text-4xl sm:text-5xl font-display text-charcoal hover:text-stone transition-colors bg-transparent border-none cursor-pointer leading-none"
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </nav>

                            <nav className="flex flex-col gap-4 mt-8">
                                {secondaryLinks.map((link, i) => (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-left text-sm uppercase tracking-widest font-sans text-charcoal/80 hover:text-charcoal transition-colors bg-transparent border-none cursor-pointer"
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
