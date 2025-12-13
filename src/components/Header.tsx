import React, { useState } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { toggleCart, totalItems } = useCart();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Shop', href: '#shop' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            src={logo}
                            alt="VyBorne Logo"
                            className="h-12 w-auto cursor-pointer"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-accent font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Icons (Cart, Search, Mobile Menu) */}
                    <div className="flex items-center space-x-4">
                        <button
                            aria-label="Login"
                            className="text-gray-600 hover:text-accent p-1"
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            <FiUser size={22} />
                        </button>
                        <button aria-label="Search" className="text-gray-600 hover:text-accent p-1">
                            <FiSearch size={22} />
                        </button>
                        <div
                            className="relative cursor-pointer text-gray-600 hover:text-accent transition-colors"
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
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
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
