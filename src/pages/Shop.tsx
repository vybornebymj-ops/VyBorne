import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/salesforceService';
import type { Product } from '../types/Product';
import { FiChevronDown, FiX, FiFilter } from 'react-icons/fi';

const categories = ['Dresses', 'Tops', 'Co-ords', 'Sarees', 'Accessories'];
const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low → High', value: 'asc' },
    { label: 'Price: High → Low', value: 'desc' },
];

const Shop: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(20000);
    const [sortBy, setSortBy] = useState('newest');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProducts();
                setAllProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                console.error('Failed to load shop products', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        let result = [...allProducts];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q)
            );
        }
        if (selectedCategories.length > 0) {
            result = result.filter((p) => selectedCategories.includes(p.category || ''));
        }
        result = result.filter((p) => p.price <= priceRange);

        if (sortBy === 'asc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'desc') result.sort((a, b) => b.price - a.price);

        setFilteredProducts(result);
    }, [selectedCategories, priceRange, allProducts, searchQuery, sortBy]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange(20000);
        setSortBy('newest');
    };

    const hasActiveFilters = selectedCategories.length > 0 || priceRange < 20000 || sortBy !== 'newest';
    const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label ?? 'Sort';

    return (
        <div className="bg-cream min-h-screen">
            {/* Shop Banner */}
            <div className="bg-charcoal text-cream py-16 text-center">
                <p className="text-2xs text-stone uppercase tracking-ultra mb-3">— Browse</p>
                <h1 className="text-5xl md:text-6xl font-serif">The Collection</h1>
                {searchQuery && (
                    <p className="mt-4 text-stone text-sm font-display">
                        Showing results for &ldquo;<span className="text-cream">{searchQuery}</span>&rdquo;
                    </p>
                )}
            </div>

            {/* ── Horizontal Filter Bar ── */}
            <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-stone/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Filter label */}
                        <span className="flex items-center gap-1.5 text-2xs text-stone uppercase tracking-ultra mr-2">
                            <FiFilter size={12} />
                            Filter
                        </span>

                        {/* Category pills */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 text-2xs uppercase tracking-ultra font-semibold border transition-all duration-200 whitespace-nowrap
                                        ${selectedCategories.includes(cat)
                                            ? 'bg-charcoal text-cream border-charcoal'
                                            : 'bg-cream text-stone border-stone/25 hover:border-charcoal hover:text-charcoal'
                                        }`}
                                >
                                    {cat}
                                    {selectedCategories.includes(cat) && (
                                        <FiX size={10} />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Price pip */}
                        <div className="hidden md:flex items-center gap-3 ml-2">
                            <span className="text-2xs text-stone uppercase tracking-ultra whitespace-nowrap">
                                Up to ₹{priceRange.toLocaleString('en-IN')}
                            </span>
                            <input
                                type="range"
                                min="1000"
                                max="20000"
                                step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-28 h-1 accent-accent cursor-pointer"
                            />
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Clear filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-2xs text-accent underline underline-offset-4 uppercase tracking-ultra"
                            >
                                Clear all
                            </button>
                        )}

                        {/* Sort dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSortDropdown(!showSortDropdown)}
                                className="flex items-center gap-2 text-2xs text-charcoal uppercase tracking-ultra border border-stone/25 px-4 py-1.5 hover:border-charcoal transition-colors"
                            >
                                {currentSortLabel}
                                <FiChevronDown size={12} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showSortDropdown && (
                                <div className="absolute right-0 top-full mt-1 bg-cream border border-stone/15 shadow-editorial z-50 min-w-[180px] animate-slide-down">
                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                                            className={`block w-full text-left px-4 py-3 text-2xs uppercase tracking-ultra transition-colors
                                                ${sortBy === opt.value ? 'text-accent bg-blush' : 'text-charcoal hover:bg-stone/5'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Count badge */}
                        <span className="text-2xs text-stone tracking-ultra">{filteredProducts.length} items</span>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <ProductGrid
                    externalProducts={filteredProducts}
                    loading={loading}
                    title={
                        searchQuery
                            ? `Results for "${searchQuery}" (${filteredProducts.length})`
                            : `All Products`
                    }
                    hideFilters
                />
            </div>
        </div>
    );
};

export default Shop;
