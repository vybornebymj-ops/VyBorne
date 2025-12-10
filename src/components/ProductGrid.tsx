import React, { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { fetchProducts } from '../services/salesforceService';
import ProductDetailModal from './ProductDetailModal';

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleQuickAdd = (product: Product) => {
        setSelectedProduct(product);
    };

    const getDisplayImage = (product: Product) => {
        if (hoveredProductId === product.id && product.images && product.images.length > 1) {
            // Show second image on hover if available
            return product.images[1];
        }
        return product.imageUrl;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Latest Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8 justify-items-center">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative w-full max-w-sm"
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    >
                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-96 lg:aspect-none transition-all duration-300">
                            <img
                                src={getDisplayImage(product)}
                                alt={product.name}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    <span onClick={() => setSelectedProduct(product)} className="cursor-pointer inset-0">
                                        {product.name}
                                    </span>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            </div>
                            <p className="text-lg font-medium text-gray-900">
                                {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                            </p>
                        </div>
                        <button
                            onClick={() => handleQuickAdd(product)}
                            className="mt-4 w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent hover:border-accent focus:outline-none transition-all duration-200"
                        >
                            Quick View / Add to Bag
                        </button>
                    </div>
                ))}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
};

export default ProductGrid;
