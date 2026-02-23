import React, { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { fetchProducts } from '../services/salesforceService';
import ProductDetailModal from './ProductDetailModal';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductGridProps {
    limit?: number;
    externalProducts?: Product[];
    loading?: boolean;
    title?: string;
    hideFilters?: boolean;
    showViewAll?: boolean;
}

const categories = ['All', 'Dresses', 'Tops', 'Co-ords', 'Sarees', 'Accessories'];

/* ── Skeleton Card ───────────────────────────────────── */
const SkeletonCard: React.FC = () => (
    <div className="group relative w-full">
        <div className="aspect-[3/4] skeleton rounded-none w-full" />
        <div className="mt-6 flex flex-col items-center">
            <div className="skeleton h-2 w-12 mb-3 rounded-none" />
            <div className="skeleton h-3 w-3/4 mb-3 rounded-none" />
            <div className="skeleton h-3 w-16 mb-1 rounded-none" />
        </div>
    </div>
);

/* ── ProductGrid ─────────────────────────────────────── */
const ProductGrid: React.FC<ProductGridProps> = ({
    limit,
    externalProducts,
    loading: externalLoading,
    title = 'Latest Arrivals', // Elevated copy
    hideFilters = false,
    showViewAll = false,
}) => {
    const [internalProducts, setInternalProducts] = useState<Product[]>([]);
    const [internalLoading, setInternalLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        if (externalProducts) return;
        const load = async () => {
            try {
                const data = await fetchProducts();
                setInternalProducts(data);
            } catch (err) {
                console.error('Failed to fetch products', err);
            } finally {
                setInternalLoading(false);
            }
        };
        load();
    }, [externalProducts]);

    const productsToShow = externalProducts ?? internalProducts;
    const isLoading = externalProducts ? externalLoading : internalLoading;

    let displayProducts = productsToShow;
    if (!externalProducts && selectedCategory !== 'All') {
        displayProducts = displayProducts.filter((p) => p.category === selectedCategory);
    }
    if (limit && displayProducts.length > limit) {
        displayProducts = displayProducts.slice(0, limit);
    }

    return (
        <section id="shop" className="w-full bg-cream py-20 sm:py-32 overflow-hidden">
            <div className="max-w-[100rem] mx-auto px-4 sm:px-12 lg:px-20">
                {/* Header row */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-2xs text-stone uppercase tracking-mega mb-4 sm:mb-6 font-sans">Discover</p>
                        <h2 className="text-4xl xs:text-5xl md:text-display-2 font-display text-charcoal mb-8 sm:mb-12">{title}</h2>
                    </motion.div>

                    {/* Minimal Category Links */}
                    {!externalProducts && !hideFilters && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12"
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`relative text-xs uppercase tracking-widest font-sans transition-colors duration-500 pb-1
                                        ${selectedCategory === cat
                                            ? 'text-charcoal'
                                            : 'text-stone hover:text-charcoal'
                                        }`}
                                >
                                    {cat}
                                    <span className={`absolute bottom-0 left-0 h-px bg-charcoal transition-all duration-500 ${selectedCategory === cat ? 'w-full' : 'w-0'}`} />
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Grid - Asymmetrical staggered layout */}
                {isLoading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 lg:gap-x-16 gap-y-12 sm:gap-y-24">
                        {Array.from({ length: limit ?? 8 }).map((_, i) => (
                            <div key={i} className={i % 2 !== 0 ? "lg:mt-16" : ""}>
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-12 gap-y-12 sm:gap-y-20 lg:gap-y-32"
                    >
                        {displayProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } }
                                }}
                                className={i % 2 !== 0 ? "lg:mt-24" : ""}
                            >
                                <ProductCard
                                    product={product}
                                    onQuickView={setSelectedProduct}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {displayProducts.length === 0 && !isLoading && (
                    <div className="text-center py-32">
                        <p className="text-stone font-display text-xl italic">No pieces found in this collection.</p>
                    </div>
                )}

                {/* View All link */}
                {showViewAll && (
                    <div className="text-center mt-32">
                        <Link
                            to="/shop"
                            className="group inline-flex items-center gap-4 text-charcoal pb-2 border-b border-charcoal/20 hover:border-charcoal transition-colors"
                        >
                            <span className="text-xs uppercase tracking-widest font-sans">View Full Collection</span>
                            <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out font-serif italic text-lg opacity-70">→</span>
                        </Link>
                    </div>
                )}

                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        isOpen={!!selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
