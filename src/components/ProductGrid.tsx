import React, { useEffect, useState, useRef } from 'react';
import type { Product } from '../types/Product';
import { fetchProducts } from '../services/salesforceService';
import ProductDetailModal from './ProductDetailModal';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

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
    <div className="group relative">
        <div className="aspect-[3/4] skeleton rounded-none" />
        <div className="mt-4 space-y-2">
            <div className="skeleton h-2.5 w-16 rounded-none" />
            <div className="skeleton h-4 w-3/4 rounded-none" />
            <div className="skeleton h-3 w-20 rounded-none" />
        </div>
    </div>
);

/* ── Scroll Reveal Hook ──────────────────────────────── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.scroll-reveal').forEach((child) => {
                        child.classList.add('visible');
                    });
                }
            },
            { threshold: 0.08 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

/* ── ProductGrid ─────────────────────────────────────── */
const ProductGrid: React.FC<ProductGridProps> = ({
    limit,
    externalProducts,
    loading: externalLoading,
    title = 'Latest Collection',
    hideFilters = false,
    showViewAll = false,
}) => {
    const [internalProducts, setInternalProducts] = useState<Product[]>([]);
    const [internalLoading, setInternalLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const gridRef = useScrollReveal();

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
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-cream">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
                <div>
                    <p className="text-2xs text-stone uppercase tracking-ultra mb-2">— Collection</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">{title}</h2>
                </div>

                {/* Category Pills */}
                {!externalProducts && !hideFilters && (
                    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 text-2xs uppercase tracking-ultra font-semibold whitespace-nowrap transition-all duration-300 border
                                    ${selectedCategory === cat
                                        ? 'bg-charcoal text-cream border-charcoal'
                                        : 'bg-transparent text-stone border-stone/30 hover:border-charcoal hover:text-charcoal'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8">
                    {Array.from({ length: limit ?? 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : (
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8"
                >
                    {displayProducts.map((product, i) => (
                        <div
                            key={product.id}
                            className={`scroll-reveal scroll-reveal-delay-${Math.min(i % 4 + 1, 6)}`}
                        >
                            <ProductCard
                                product={product}
                                onQuickView={setSelectedProduct}
                            />
                        </div>
                    ))}
                </div>
            )}

            {displayProducts.length === 0 && !isLoading && (
                <div className="text-center py-24">
                    <p className="text-stone font-display text-lg">No products found.</p>
                </div>
            )}

            {/* View All link */}
            {showViewAll && (
                <div className="text-center mt-14">
                    <Link
                        to="/shop"
                        className="inline-block px-10 py-3.5 border border-charcoal text-charcoal text-2xs uppercase tracking-ultra font-semibold hover:bg-charcoal hover:text-cream transition-all duration-300"
                    >
                        View All Products
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
        </section>
    );
};

export default ProductGrid;
