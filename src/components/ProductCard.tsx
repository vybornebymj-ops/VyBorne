import React from 'react';
import type { Product } from '../types/Product';
import { FiHeart } from 'react-icons/fi';

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
    return (
        <div className="group relative cursor-pointer" onClick={() => onQuickView(product)}>
            {/* Image Container */}
            <div className="aspect-[3/4] bg-stone/10 overflow-hidden relative">
                {/* Primary Image */}
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    loading="lazy"
                />

                {/* Secondary Image on hover */}
                {product.images?.[1] && (
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-500" />

                {/* Wishlist Icon — top right */}
                <button
                    aria-label="Wishlist"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-cream/90 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-cream text-charcoal"
                >
                    <FiHeart size={14} />
                </button>

                {/* Quick View label — rises from bottom */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury">
                    <button
                        onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                        className="w-full bg-cream/95 backdrop-blur-xs text-charcoal py-3.5 text-2xs uppercase tracking-ultra font-semibold hover:bg-charcoal hover:text-cream transition-colors duration-300"
                    >
                        Quick View
                    </button>
                </div>
            </div>

            {/* Product Info — left-aligned, editorial */}
            <div className="mt-4 px-0.5">
                <p className="text-2xs text-stone uppercase tracking-ultra mb-1">{product.category}</p>
                <h3 className="text-base font-serif text-charcoal leading-snug mb-1.5 group-hover:text-accent transition-colors duration-200">
                    {product.name}
                </h3>
                <p className="text-sm text-stone font-display font-light">
                    {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
