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

                {/* Mobile Top Dark Overlay for Header Legibility */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/80 to-transparent md:hidden pointer-events-none" />
            </motion.div>

            {/* Centered Edge-to-Edge Typography */}
            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 text-center">
                <div className="max-w-[70rem] mx-auto w-full mt-20">
                    <div className="overflow-hidden mb-6 flex flex-col items-center">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2, duration: 1.4, ease: "easeOut" }}
                            className="text-white leading-[1.1]"
                        >
                            <span className="block font-serif text-6xl sm:text-7xl lg:text-[8rem] font-medium italic">Curated</span>
                            <span className="block font-sans text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-[0.3em] mt-2 lg:mt-4 text-white/90">Elegance</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                        className="mt-8 sm:mt-12 flex flex-col items-center"
                    >
                        <Link
                            to="/shop"
                            className="bg-cream text-charcoal px-10 py-4 text-xs font-sans tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-500 ease-in-out"
                        >
                            Shop Collection
                        </Link>
                    </motion.div>
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
