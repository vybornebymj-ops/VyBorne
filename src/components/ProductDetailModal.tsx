import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import SizeGuideModal from './SizeGuideModal';
import logo from '../assets/logo.png';

interface ProductDetailModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addToCart } = useCart();

    if (!isOpen) return null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }

        setIsAddingToCart(true);

        // Simulate lazy loading
        setTimeout(() => {
            addToCart(product, selectedSize);
            setIsAddingToCart(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <FiX size={24} />
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        {/* Image Side */}
                        <div className="w-full sm:w-1/2">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-96 object-cover sm:h-full"
                            />
                        </div>

                        {/* Details Side */}
                        <div className="w-full sm:w-1/2 p-6 sm:p-8">
                            <h3 className="text-2xl font-bold text-gray-900" id="modal-title">
                                {product.name}
                            </h3>
                            <p className="mt-2 text-xl text-gray-900">
                                {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                            </p>

                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Description</h4>
                                <p className="mt-1 text-sm text-gray-500">
                                    {product.detailedDescription || product.description}
                                </p>
                                {product.fabric && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        <span className="font-medium">Fabric:</span> {product.fabric}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-gray-900">Select Size</h4>
                                    <button
                                        type="button"
                                        className="text-sm text-accent hover:underline focus:outline-none"
                                        onClick={() => setIsSizeGuideOpen(true)}
                                    >
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-2 mt-2">
                                    {product.sizes?.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`
                                                relative flex items-center justify-center rounded-md border py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1
                                                ${selectedSize === size
                                                    ? 'border-accent bg-green-50 text-accent ring-1 ring-accent'
                                                    : 'border-gray-300 text-gray-900 bg-white shadow-sm'
                                                }
                                            `}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent ${isAddingToCart ? 'opacity-75 cursor-wait' : ''}`}
                                >
                                    {isAddingToCart ? 'Adding...' : 'Add to Bag'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Size Guide Modal */}
            <SizeGuideModal
                isOpen={isSizeGuideOpen}
                onClose={() => setIsSizeGuideOpen(false)}
            />

            {/* Loading Overlay */}
            {isAddingToCart && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-slow">
                        <img
                            src={logo}
                            alt="Loading..."
                            className="h-16 w-auto animate-pulse"
                        />
                        <p className="mt-4 text-gray-900 font-medium">Adding to Bag...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailModal;
