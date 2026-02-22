import React from 'react';
import { FiFeather, FiRefreshCcw, FiLock, FiGift } from 'react-icons/fi';
import { motion } from 'framer-motion';

const items = [
    { icon: FiFeather, title: 'Sustainable Craft', subtitle: 'Ethically Sourced' },
    { icon: FiRefreshCcw, title: 'Seamless Returns', subtitle: 'Hassle-Free Policy' },
    { icon: FiLock, title: 'Secure Checkout', subtitle: 'Encrypted Payments' },
    { icon: FiGift, title: 'Complimentary', subtitle: 'Shipping Over ₹999' },
];

const TrustBar: React.FC = () => {
    return (
        <section className="bg-cream py-32 border-t border-charcoal/5">
            <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-20">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8"
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-8 text-charcoal/60 group-hover:text-charcoal transition-colors duration-500">
                                <item.icon size={28} strokeWidth={1} />
                            </div>
                            <h4 className="text-xs uppercase tracking-widest font-sans text-charcoal mb-2">{item.title}</h4>
                            <p className="text-xs font-sans tracking-wide text-stone">{item.subtitle}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustBar;
