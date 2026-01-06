import React, { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { fetchProducts } from '../services/salesforceService';
import ProductDetailModal from './ProductDetailModal';
import ProductCard from './ProductCard';

interface ProductGridProps {
    limit?: number;
    // If filtered products are passed from parent (Shop Page), use those.
    // If null/undefined, fetch internally (Home Page).
    externalProducts?: Product[];
    loading?: boolean;
    title?: string;
    hideFilters?: boolean; // Hide the internal category pills if using sidebar
}

const categories = ['All', 'Dresses', 'Tops', 'Co-ords'];

const ProductGrid: React.FC<ProductGridProps> = ({
    limit,
    externalProducts,
    loading: externalLoading,
    title = "Latest Collection",
    hideFilters = false
}) => {
    // Internal State
    const [internalProducts, setInternalProducts] = useState<Product[]>([]);
    const [internalLoading, setInternalLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Only fetch if no external products are provided
    useEffect(() => {
        if (externalProducts) return;

        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setInternalProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setInternalLoading(false);
            }
        };

        loadProducts();
    }, [externalProducts]);

    // Determine which products to show
    const productsToShow = externalProducts || internalProducts;
    const isLoading = externalProducts ? externalLoading : internalLoading;

    // Filter Logic (Only applies if NOT provided externally)
    // If externalProducts is provided, we assume the parent handles filtering.
    // UNLESS we still want to use simple category pill filtering on Home page?
    // Let's assume: Home Page -> Internal Fetch -> Internal Pill Filter
    // Shop Page -> External Fetch -> External Sidebar Filter -> Passes filtered list.

    let displayProducts = productsToShow;
    if (!externalProducts && selectedCategory !== 'All') {
        displayProducts = displayProducts.filter(p => p.category === selectedCategory);
    }

    // Limit logic (e.g. for Home Page showing only top 8)
    if (limit && displayProducts.length > limit) {
        displayProducts = displayProducts.slice(0, limit);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                <h2 className="text-3xl font-serif text-gray-900 mb-6 md:mb-0">{title}</h2>

                {/* Category Filters (Only show if internal control + not hidden) */}
                {!externalProducts && !hideFilters && (
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
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
                {displayProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={setSelectedProduct}
                    />
                ))}
            </div>

            {displayProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No products found.</p>
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
