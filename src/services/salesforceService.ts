import type { Product } from '../types/Product';
// Import local images (Vite will handle the paths)
import product1 from '../assets/images/product1.jpg';
import product2 from '../assets/images/product2.jpg';
import product3 from '../assets/images/product3.jpg';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Emerald Floral Dress',
        description: 'A beautiful emerald green dress with floral patterns, perfect for summer gatherings.',
        detailedDescription: 'Crafted from premium organic fabric, this dress features a flattering fit-and-flare silhouette. The emerald green base is adorned with vibrant floral motifs that pop against the dark background. Features flutter sleeves and a round neckline.',
        price: 3499,
        currency: 'INR',
        imageUrl: product1,
        images: [product1, product2], // Simulating slideshow with other images for now
        category: 'Dresses',
        fabric: 'Organic Fabric',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: '2',
        name: 'Blue Tie-Dye Midi',
        description: 'Elegant blue tie-dye dress with lace detailing.',
        detailedDescription: 'This stunning midi dress features a mesmerizing blue tie-dye pattern on soft, breathable cotton. The waist is accentuated with gathered detailing, flowing into a voluminous skirt. Delicate lace inserts add a touch of vintage charm.',
        price: 2999,
        currency: 'INR',
        imageUrl: product2,
        images: [product2, product1],
        category: 'Dresses',
        fabric: 'Cotton Blend',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: '3',
        name: 'Dark Floral Maxi',
        description: 'Sophisticated dark floral maxi dress for evening wear.',
        detailedDescription: 'Make a statement with this floor-length maxi dress. The dark botanical print is both mysterious and romantic. Designed with a fitted bodice and a sweeping skirt, it is perfect for evening events.',
        price: 4599,
        currency: 'INR',
        imageUrl: product3,
        images: [product3, product2],
        category: 'Dresses',
        fabric: 'Lyra',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '4',
        name: 'Classic White Shirt',
        description: 'Crisp white cotton shirt with modern cut.',
        detailedDescription: 'A wardrobe essential. This crisp white shirt is tailored from high-quality cotton poplin. Features a relaxed fit, dropped shoulders, and a unique asymmetrical hemline for a modern twist.',
        price: 1999,
        currency: 'INR',
        imageUrl: product1, // Reusing existing image for demo
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
        imageUrl: product2,
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
        imageUrl: product3,
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
