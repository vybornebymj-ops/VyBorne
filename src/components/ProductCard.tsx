import React from 'react';
import type { Product } from '../types/Product';
import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
    return (
        <div className="group relative cursor-pointer flex flex-col w-full" onClick={() => onQuickView(product)}>
            {/* Image Container */}
            <div className="aspect-[3/4] bg-stone/5 overflow-hidden relative w-full mb-6">
                {/* Primary Image */}
                <motion.img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover origin-bottom"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    loading="lazy"
                />

                {/* Secondary Image on hover (crossfade) */}
                {product.images?.[1] && (
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                    />
                )}

                {/* Subtle dark overlay for text contrast if needed */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />

                {/* Quick View Text — appears dead center on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="bg-cream/95 backdrop-blur-md text-charcoal px-8 py-3 text-2xs uppercase tracking-mega font-sans shadow-editorial">
                        Quick View
                    </span>
                </div>

                {/* Wishlist Icon — top right, minimal */}
                <button
                    aria-label="Wishlist"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="absolute top-4 right-4 p-2 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-accent"
                >
                    <FiHeart size={18} strokeWidth={1.2} />
                </button>
            </div>

            {/* Product Info — Centered, heavily spaced out */}
            <div className="px-2 text-center flex flex-col items-center">
                <p className="text-[10px] text-stone uppercase tracking-mega mb-3 font-sans opacity-70">
                    {product.category}
                </p>
                <h3 className="text-lg md:text-xl md:tracking-tight font-display text-charcoal leading-snug mb-2 font-medium">
                    {product.name}
                </h3>
                <p className="text-sm text-charcoal/80 font-sans tracking-widest font-light">
                    {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
