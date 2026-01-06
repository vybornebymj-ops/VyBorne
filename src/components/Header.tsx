import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { toggleCart, totalItems } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
            // If on home page, scroll
            if (location.pathname === '/') {
                const id = href.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // If not on home page, go home then scroll (simple version: just go home)
                navigate('/');
                // In a real app, you'd pass the hash to navigate or use a context to scroll after nav
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

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';
    const headerClass = isHome && !isScrolled
        ? 'fixed w-full bg-transparent text-white border-transparent'
        : 'sticky top-0 bg-white text-gray-900 shadow-sm border-b border-gray-100';

    const getTextColor = () => {
        if (isHome && !isScrolled) return 'text-white hover:text-gray-200';
        return 'text-gray-700 hover:text-accent';
    };

    const iconClass = isHome && !isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-accent';

    return (
        <header className={`${headerClass} z-50 transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="VyBorne Logo"
                                className="h-10 w-auto cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className={`${getTextColor()} font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    {/* Icons (Cart, Search, Mobile Menu) */}
                    <div className="flex items-center space-x-4">
                        <button
                            aria-label="Login"
                            className={`${iconClass} p-1 transition-colors`}
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            <FiUser size={22} />
                        </button>
                        <div className="relative flex items-center">
                            {isSearchOpen && (
                                <form onSubmit={handleSearchSubmit} className="absolute right-full mr-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-48 pl-3 pr-8 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-accent"
                                        autoFocus
                                    />
                                </form>
                            )}
                            <button
                                aria-label="Search"
                                className={`${iconClass} p-1 transition-colors ${isSearchOpen ? 'text-accent' : ''}`}
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                {isSearchOpen ? <FiX size={22} /> : <FiSearch size={22} />}
                            </button>
                        </div>
                        <div
                            className={`relative cursor-pointer ${iconClass} transition-colors`}
                            onClick={toggleCart}
                        >
                            <FiShoppingBag size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-gray-700 hover:text-accent focus:outline-none p-2"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.href)}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors bg-transparent"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </header>
    );
};

export default Header;
