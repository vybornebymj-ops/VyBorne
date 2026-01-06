import React from 'react';
import { FiEye } from 'react-icons/fi';
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
                className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer"
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

                {/* Actions Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex justify-center space-x-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                        }}
                        className="p-3 bg-white rounded-full shadow-lg text-gray-900 hover:text-accent hover:scale-110 transition-all duration-200"
                        aria-label="Quick View"
                    >
                        <FiEye size={20} />
                    </button>
                    {/* Add to Cart could go here, or just open Quick View which leads to Add to Cart */}
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="text-base font-medium text-gray-900 group-hover:text-accent transition-colors duration-200">
                    <span onClick={() => onQuickView(product)} className="cursor-pointer">
                        {product.name}
                    </span>
                </h3>
                <p className="mt-1 text-base font-light text-gray-900">
                    {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
