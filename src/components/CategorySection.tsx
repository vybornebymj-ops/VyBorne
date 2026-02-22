import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 'dresses',
        name: 'Dresses',
        tag: 'Signature',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80',
        description: 'Fluid silhouettes designed for effortless movement and timeless grace.',
        align: 'left',
    },
    {
        id: 'coords',
        name: 'Co-ords',
        tag: 'Effortless',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
        description: 'Matching sets that redefine contemporary elegance.',
        align: 'right',
    },
    {
        id: 'sarees',
        name: 'Sarees',
        tag: 'Ethnic Grace',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80',
        description: 'Heritage textiles woven for the modern woman.',
        align: 'left',
    }
];

const CategorySection: React.FC = () => {
    return (
        <section className="bg-cream">
            {categories.map((cat, index) => (
                <div key={cat.id} className="w-full relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden border-t border-charcoal/10">
                    <div className="max-w-[100rem] mx-auto w-full px-6 lg:px-20 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                        {/* Image Block */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`w-full lg:w-1/2 aspect-[4/5] lg:aspect-[3/4] overflow-hidden ${cat.align === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
                        >
                            <Link to={`/shop?search=${cat.name}`}>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </motion.div>

                        {/* Text Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true }}
                            className={`w-full lg:w-1/2 flex flex-col justify-center ${cat.align === 'right' ? 'lg:order-1 lg:items-end lg:text-right' : 'lg:order-2 lg:items-start lg:text-left'}`}
                        >
                            <p className="text-2xs text-stone uppercase tracking-mega mb-6 font-sans">
                                {String(index + 1).padStart(2, '0')} — {cat.tag}
                            </p>
                            <h2 className="text-display-3 md:text-display-2 lg:text-display-1 font-display text-charcoal leading-none mb-8">
                                {cat.name}
                            </h2>
                            <p className="text-charcoal/70 font-sans tracking-wide mb-12 max-w-sm">
                                {cat.description}
                            </p>

                            <Link
                                to={`/shop?category=${cat.name.toLowerCase()}`}
                                className="group inline-flex items-center gap-4 text-charcoal pb-2 border-b border-charcoal/20 hover:border-charcoal transition-colors"
                            >
                                <span className="text-xs uppercase tracking-widest font-sans">Explore</span>
                                <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out font-serif italic text-lg opacity-70">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CategorySection;
