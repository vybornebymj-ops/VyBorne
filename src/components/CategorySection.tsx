import React from 'react';

const categories = [
    {
        id: 'dresses',
        name: 'Dresses',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Elegance for every occasion'
    },
    {
        id: 'tops',
        name: 'Tops',
        image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Versatile styles for day & night'
    },
    {
        id: 'coords',
        name: 'Co-ords',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Effortless matching sets'
    }
];

const CategorySection: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
            <h2 className="text-3xl font-serif text-gray-900 mb-12 text-center">Shop by Category</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative h-96 overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        onClick={() => {
                            const shopElement = document.getElementById('shop');
                            shopElement?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                            <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                {category.description}
                            </p>
                            <span className="mt-4 px-6 py-2 bg-white text-gray-900 text-sm font-medium w-max rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                Explore
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
