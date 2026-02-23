import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroVideo from '../assets/LandingPageVideo.mp4';

const Hero: React.FC = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-charcoal">
            {/* Smooth Zooming Video Background */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <video
                    className="w-full h-full object-cover opacity-80"
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                {/* Hyper-minimal dark gradient overlay to ensure text legibility but keep it stark */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/40 mix-blend-multiply" />
            </motion.div>

            {/* Edge-to-Edge Magazine Typography */}
            <div className="relative z-10 h-full w-full flex flex-col justify-end pb-20 sm:pb-32 px-6 lg:px-12">
                <div className="max-w-[90rem] mx-auto w-full">
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2, duration: 1.4, ease: "easeOut" }}
                            className="font-display text-cream leading-[0.85] tracking-tighter"
                        >
                            <span className="block text-5xl xs:text-6xl sm:text-display-2 lg:text-display-1 font-medium">Curated</span>
                            <span className="block text-5xl xs:text-6xl sm:text-display-2 lg:text-display-1 font-medium italic pr-4 lg:ml-24">Elegance</span>
                        </motion.h1>
                    </div>

                    <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                            className="text-cream/70 font-sans font-light text-sm max-w-sm leading-relaxed"
                        >
                            Defining modern Indian luxury.
                            Where heritage textiles meet hyper-refined contemporary silhouettes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                        >
                            <Link
                                to="/shop"
                                className="group inline-flex items-center gap-4 text-cream pb-2 border-b border-cream/30 hover:border-cream transition-colors"
                            >
                                <span className="text-2xs uppercase tracking-ultra font-sans">Discover Collection</span>
                                <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-out font-serif italic text-lg">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-4"
            >
                <div className="text-2xs uppercase tracking-mega text-cream/50 font-sans rotate-[-90deg] origin-left translate-y-8">Scroll</div>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 48 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="w-px bg-cream/30 translate-y-16"
                />
            </motion.div>
        </div>
    );
};

export default Hero;
