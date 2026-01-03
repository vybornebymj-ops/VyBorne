import React, { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { fetchProducts } from '../services/salesforceService';
import ProductDetailModal from './ProductDetailModal';
import { FiEye, FiShoppingBag } from 'react-icons/fi';

const categories = ['All', 'Dresses', 'Tops', 'Co-ords'];

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    // Initialize category from URL if present
    const [selectedCategory, setSelectedCategory] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const categoryParam = params.get('category');
            return categoryParam && categories.includes(categoryParam) ? categoryParam : 'All';
        }
        return 'All';
    });

    // Sync URL with selected category and handle initial scroll
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const currentUrlCategory = params.get('category');

        if (selectedCategory === 'All') {
            if (currentUrlCategory) {
                params.delete('category');
                const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
                window.history.pushState({}, '', newUrl);
            }
        } else {
            if (currentUrlCategory !== selectedCategory) {
                params.set('category', selectedCategory);
                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.pushState({}, '', newUrl);
            }
        }
    }, [selectedCategory]);

    // Scroll to shop section on mount if category is present in URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('category')) {
            // Small timeout to ensure DOM is ready and layout is stable
            setTimeout(() => {
                const element = document.getElementById('shop');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    // Derived state for filtered products
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                <h2 className="text-3xl font-serif text-gray-900 mb-6 md:mb-0">Latest Collection</h2>

                {/* Category Filters */}
                <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                                ${selectedCategory === category
                                    ? 'bg-accent text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group relative"
                    >
                        {/* Image Container with Actions Overlay */}
                        <div
                            className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Secondary Image on Hover (if available) - Logic handled via CSS opacity usually, but simplified here */}
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
                                        setSelectedProduct(product);
                                    }}
                                    className="p-3 bg-white rounded-full shadow-lg text-gray-900 hover:text-accent hover:scale-110 transition-all duration-200"
                                    aria-label="Quick View"
                                >
                                    <FiEye size={20} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(product);
                                    }}
                                    className="p-3 bg-white rounded-full shadow-lg text-gray-900 hover:text-accent hover:scale-110 transition-all duration-200"
                                    aria-label="Add to Cart"
                                >
                                    <FiShoppingBag size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                            <h3 className="text-base font-medium text-gray-900 group-hover:text-accent transition-colors duration-200">
                                <span onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                                    {product.name}
                                </span>
                            </h3>
                            <p className="mt-1 text-base font-light text-gray-900">
                                {product.currency === 'INR' ? '₹' : '$'}{product.price.toLocaleString('en-IN')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
            )}

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
