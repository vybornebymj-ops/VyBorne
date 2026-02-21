import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
    {
        id: 'dresses',
        name: 'Dresses',
        tag: 'Signature',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
        span: 'large',
    },
    {
        id: 'tops',
        name: 'Tops',
        tag: 'Versatile',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        span: 'small',
    },
    {
        id: 'coords',
        name: 'Co-ords',
        tag: 'Effortless',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        span: 'small',
    },
    {
        id: 'sarees',
        name: 'Sarees',
        tag: 'Ethnic Grace',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        span: 'small',
    },
    {
        id: 'accessories',
        name: 'Accessories',
        tag: 'Finishing Touch',
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        span: 'small',
    },
];

const CategorySection: React.FC = () => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('.scroll-reveal').forEach((child) => child.classList.add('visible'));
                }
            },
            { threshold: 0.08 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 scroll-reveal">
                <div>
                    <p className="text-2xs text-stone uppercase tracking-ultra mb-2">— Explore</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">Shop by Category</h2>
                </div>
                <Link
                    to="/shop"
                    className="mt-6 md:mt-0 inline-flex items-center gap-2 text-2xs uppercase tracking-ultra font-semibold text-charcoal hover:text-accent transition-colors group"
                >
                    View All
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Bento Grid: large left + 2x2 right */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {/* Large tile — Dresses */}
                <div
                    className="relative col-span-2 md:col-span-1 md:row-span-2 overflow-hidden grayscale-hover group cursor-pointer scroll-reveal scroll-reveal-delay-1"
                    style={{ minHeight: '480px' }}
                >
                    <Link to="/shop">
                        <img
                            src={categories[0].image}
                            alt={categories[0].name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-2xs text-cream/60 uppercase tracking-ultra mb-1">{categories[0].tag}</p>
                            <h3 className="text-3xl font-serif text-cream">{categories[0].name}</h3>
                        </div>
                        <div className="absolute top-4 right-4 w-8 h-8 border border-cream/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <FiArrowRight size={14} className="text-cream" />
                        </div>
                    </Link>
                </div>

                {/* 4 small tiles */}
                {categories.slice(1).map((cat, i) => (
                    <div
                        key={cat.id}
                        className={`relative overflow-hidden grayscale-hover group cursor-pointer scroll-reveal scroll-reveal-delay-${i + 2}`}
                        style={{ minHeight: '230px' }}
                    >
                        <Link to="/shop">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <p className="text-2xs text-cream/60 uppercase tracking-ultra mb-0.5">{cat.tag}</p>
                                <h3 className="text-xl font-serif text-cream">{cat.name}</h3>
                            </div>
                            <div className="absolute top-3 right-3 w-7 h-7 border border-cream/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <FiArrowRight size={12} className="text-cream" />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
