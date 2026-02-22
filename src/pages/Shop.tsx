import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../services/salesforceService';
import type { Product } from '../types/Product';
import { FiChevronDown, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Dresses', 'Tops', 'Co-ords', 'Sarees', 'Accessories'];
const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'asc' },
    { label: 'Price: High to Low', value: 'desc' },
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
        <div className="bg-cream min-h-screen pt-24">
            {/* Shop Banner — Massive Typography */}
            <div className="text-center py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-display-2 md:text-display-1 font-display text-charcoal leading-none mb-4">
                        The Collection
                    </h1>
                    {searchQuery ? (
                        <p className="mt-6 text-stone font-sans text-sm tracking-widest uppercase">
                            Results for &ldquo;<span className="text-charcoal font-medium">{searchQuery}</span>&rdquo;
                        </p>
                    ) : (
                        <p className="mt-6 text-stone font-sans text-xs tracking-mega uppercase">
                            Curated Seasonal Pieces
                        </p>
                    )}
                </motion.div>
            </div>

            {/* ── Horizontal Filter Bar — Hyper Minimal ── */}
            <div className="sticky top-0 md:top-24 z-30 bg-cream/90 backdrop-blur-md border-y border-charcoal/5">
                <div className="max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-20 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">

                        <div className="flex items-center gap-6 md:gap-12 flex-1">
                            {/* Filter label (mobile only, or hidden gently) */}
                            <span className="hidden md:flex items-center gap-2 text-2xs text-stone uppercase tracking-mega">
                                <FiFilter size={12} />
                                Filters
                            </span>

                            {/* Category links as stark text */}
                            <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide py-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        className={`relative text-2xs uppercase tracking-widest font-sans whitespace-nowrap transition-colors duration-300
                                            ${selectedCategories.includes(cat)
                                                ? 'text-charcoal font-medium'
                                                : 'text-stone hover:text-charcoal'
                                            }`}
                                    >
                                        {cat}
                                        <span className={`absolute -bottom-1 left-0 h-px bg-charcoal transition-all duration-300 ${selectedCategories.includes(cat) ? 'w-full' : 'w-0'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right side controls */}
                        <div className="flex items-center gap-6">
                            {/* Clear filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="hidden md:block text-2xs text-stone hover:text-charcoal tracking-mega uppercase transition-colors"
                                >
                                    Clear
                                </button>
                            )}

                            {/* Sort dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="flex items-center gap-2 text-2xs text-charcoal uppercase tracking-widest font-sans transition-opacity hover:opacity-70"
                                >
                                    {currentSortLabel}
                                    <motion.div animate={{ rotate: showSortDropdown ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        <FiChevronDown size={14} strokeWidth={1.5} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {showSortDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-full mt-4 bg-cream border border-charcoal/10 p-2 shadow-editorial z-50 min-w-[200px]"
                                        >
                                            {sortOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                                                    className={`block w-full text-left px-4 py-3 text-2xs uppercase tracking-widest font-sans transition-colors
                                                        ${sortBy === opt.value ? 'text-charcoal bg-stone/5 relative pl-6 before:content-[""] before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-charcoal before:rounded-full' : 'text-stone hover:text-charcoal'}`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Count */}
                            <span className="hidden lg:block text-2xs text-stone tracking-mega uppercase ml-4">
                                [{filteredProducts.length}]
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid — Full Width Passthrough */}
            <div className="w-full">
                <ProductGrid
                    externalProducts={filteredProducts}
                    loading={loading}
                    title=""
                    hideFilters
                />
            </div>
        </div>
    );
};

export default Shop;
