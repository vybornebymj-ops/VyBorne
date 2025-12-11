import type { Product } from '../types/Product';
// Import local images
import floralMain from '../assets/products/floral-main.png';
import floralSide from '../assets/products/floral-side.png';
import floralDetail from '../assets/products/floral-detail.png';
import blueMain from '../assets/products/blue-main.png';
import blueWalking from '../assets/products/blue-walking.png';
import officeMain from '../assets/products/office-main.png';

// Fallback legacy images if needed, or we can reuse nice ones for other items
import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Emerald Office Floral',
        description: 'A professional yet chic emerald green dress with subtle floral patterns.',
        detailedDescription: 'Perfect for the modern workplace. This emerald green dress combines professional tailoring with a touch of nature. Features a structured silhouette ensuring you look confident and elegant.',
        price: 3499,
        currency: 'INR',
        imageUrl: officeMain,
        images: [officeMain], // Only 1 image available for now
        category: 'Dresses',
        fabric: 'Premium Crepe',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: '2',
        name: 'Blue Tie-Dye Midi',
        description: 'Elegant blue tie-dye dress with lace detailing.',
        detailedDescription: 'This stunning midi dress features a mesmerizing blue tie-dye pattern on soft, breathable cotton. The waist is accentuated with gathered detailing, flowing into a voluminous skirt. Delicate lace inserts add a touch of vintage charm. Perfect for garden parties.',
        price: 2999,
        currency: 'INR',
        imageUrl: blueMain,
        images: [blueMain, blueWalking],
        category: 'Dresses',
        fabric: 'Cotton Blend',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: '3',
        name: 'Dark Floral Maxi',
        description: 'Sophisticated dark floral maxi dress for evening wear.',
        detailedDescription: 'Make a statement with this floor-length maxi dress. The dark botanical print is both mysterious and romantic. Designed with a fitted bodice, flutter sleeves, and a sweeping A-line skirt. Ideal for evening galas.',
        price: 4599,
        currency: 'INR',
        imageUrl: floralMain,
        images: [floralMain, floralSide, floralDetail],
        category: 'Dresses',
        fabric: 'Silk Georgette',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '4',
        name: 'Classic White Shirt',
        description: 'Crisp white cotton shirt with modern cut.',
        detailedDescription: 'A wardrobe essential. This crisp white shirt is tailored from high-quality cotton poplin. Features a relaxed fit, dropped shoulders, and a unique asymmetrical hemline for a modern twist.',
        price: 1999,
        currency: 'INR',
        imageUrl: product1, // Legacy
        category: 'Tops',
        fabric: 'Cotton Poplin',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: '5',
        name: 'Silk Blend Blouse',
        description: 'Luxurious silk blend blouse in champagne.',
        detailedDescription: 'Add a touch of luxury to your daily rotation. This blouse is crafted from a soft silk blend that drapes beautifully. Features a cowl neck and elegant cuff details.',
        price: 2499,
        currency: 'INR',
        imageUrl: product2, // Legacy
        category: 'Tops',
        fabric: 'Silk Blend',
        sizes: ['S', 'M', 'L']
    },
    {
        id: '6',
        name: 'Summer Breeze Co-ord',
        description: 'Matching crop top and skirt set in linen.',
        detailedDescription: 'Effortlessly chic. This co-ord set features a cropped linen top with adjustable straps and a matching midi skirt with a side slit. Perfect for vacations and summer brunch.',
        price: 3999,
        currency: 'INR',
        imageUrl: blueWalking, // Reusing blue walking image as a filler for now or keep legacy
        images: [blueWalking],
        category: 'Co-ords',
        fabric: 'Linen',
        sizes: ['XS', 'S', 'M', 'L']
    }
];

export const fetchProducts = async (): Promise<Product[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PRODUCTS);
        }, 800);
    });
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PRODUCTS.find(p => p.id === id));
        }, 500);
    });
};
