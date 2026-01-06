import React from 'react';
import type { Product } from '../types/Product';

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
    return (
        <div className="group relative">
            {/* Image Container with Actions Overlay */}
            <div
                className="aspect-[3/4] bg-gray-100 overflow-hidden relative cursor-pointer"
                onClick={() => onQuickView(product)}
            >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Secondary Image on Hover */}
                {product.images && product.images[1] && (
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-center object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                )}

                {/* Actions Overlay - Slide up bar (Always visible on mobile/touch, hover on desktop) */}
                <div className="absolute inset-x-0 bottom-0 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                        }}
                        className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-3 md:py-4 uppercase text-xs md:text-sm tracking-widest font-medium hover:bg-gray-900 hover:text-white transition-colors border-t border-gray-100"
                    >
                        Quick View
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-5 text-center px-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">{product.category}</p>
                <h3 className="text-lg font-serif text-gray-900 mb-1 group-hover:text-accent transition-colors duration-200">
                    <span onClick={() => onQuickView(product)} className="cursor-pointer">
                        {product.name}
                    </span>
                </h3>
                <p className="text-sm text-gray-600 font-light tracking-wide">
                    {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
