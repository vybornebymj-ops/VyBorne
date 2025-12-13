import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
    {
        id: 'dresses',
        name: 'Dresses',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Elegance for every occasion',
        size: 'large' // Main focused category
    },
    {
        id: 'tops',
        name: 'Tops',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Versatile styles',
        size: 'small'
    },
    {
        id: 'coords',
        name: 'Co-ords',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Effortless matching sets',
        size: 'small'
    }
];

const CategorySection: React.FC = () => {
    const handleCategoryClick = () => {
        const shopElement = document.getElementById('shop');
        shopElement?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16">
                <div>
                    <h2 className="text-4xl font-serif text-gray-900 mb-2">Shop by Category</h2>
                    <p className="text-gray-500 font-light">Curated collections just for you</p>
                </div>
                <button
                    onClick={handleCategoryClick}
                    className="mt-6 md:mt-0 flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-accent transition-colors duration-300 group"
                >
                    View All Collections
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                {/* Large Item: Dresses */}
                <div
                    className="relative group overflow-hidden rounded-2xl cursor-pointer md:row-span-2 shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={handleCategoryClick}
                >
                    <img
                        src={categories[0].image}
                        alt={categories[0].name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-x-4 bottom-4 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
                        <div className="relative z-10 flex justify-between items-end">
                            <div>
                                <h3 className="text-3xl font-serif text-white mb-1">{categories[0].name}</h3>
                                <p className="text-gray-100 font-light text-sm">{categories[0].description}</p>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                <FiArrowRight />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column Grid for Smaller Items */}
                <div className="flex flex-col gap-6 h-full">
                    {categories.slice(1).map((category) => (
                        <div
                            key={category.id}
                            className="relative group overflow-hidden rounded-2xl cursor-pointer flex-1 shadow-sm hover:shadow-xl transition-all duration-500"
                            onClick={handleCategoryClick}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-x-4 bottom-4 p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-serif text-white mb-0.5">{category.name}</h3>
                                        <p className="text-gray-100 font-light text-xs">{category.description}</p>
                                    </div>
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                                        <FiArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
