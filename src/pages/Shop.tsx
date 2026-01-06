import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/salesforceService';
import type { Product } from '../types/Product';

const categories = ['Dresses', 'Tops', 'Co-ords', 'Sarees', 'Accessories'];

const Shop: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(10000); // Max Price

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchProducts();
                setAllProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                console.error("Failed to load shop products", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = allProducts;

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query)
            );
        }

        // Category Filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category || ''));
        }

        // Price Filter
        result = result.filter(p => p.price <= priceRange);

        setFilteredProducts(result);
    }, [selectedCategories, priceRange, allProducts, searchQuery]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif text-gray-900 mb-8 text-center">Shop Collection</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                            {/* Category Filter */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                            />
                                            <span className="ml-3 text-gray-600 group-hover:text-accent transition-colors">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="1000"
                                        max="20000"
                                        step="500"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                                        <span>₹1,000</span>
                                        <span>₹{priceRange.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-1">
                        <ProductGrid
                            externalProducts={filteredProducts}
                            loading={loading}
                            title={searchQuery ? `Search Results for "${searchQuery}" (${filteredProducts.length})` : `All Products (${filteredProducts.length})`}
                            hideFilters={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
