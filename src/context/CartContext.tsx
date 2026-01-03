import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/Product';

export interface CartItem extends Product {
    selectedSize: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, newQuantity: number) => void;
    toggleCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to parse cart from localStorage:', error);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, size: string) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.selectedSize === size
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += 1;
                return newItems;
            } else {
                return [...prevItems, { ...product, selectedSize: size, quantity: 1 }];
            }
        });
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (productId: string, size: string) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === productId && item.selectedSize === size))
        );
    };

    const updateQuantity = (productId: string, size: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId && item.selectedSize === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
