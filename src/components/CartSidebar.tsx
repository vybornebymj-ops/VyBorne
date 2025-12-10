import React from 'react';
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartSidebar: React.FC = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, subtotal } = useCart();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Shopping Bag</h2>
                            <div className="ml-3 h-7 flex items-center">
                                <button
                                    type="button"
                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                    onClick={toggleCart}
                                >
                                    <span className="sr-only">Close panel</span>
                                    <FiX size={24} aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-4 text-gray-500">Your bag is empty.</p>
                                        <button
                                            onClick={toggleCart}
                                            className="mt-4 text-accent font-medium hover:text-green-700"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <li key={`${item.id}-${item.selectedSize}`} className="py-6 flex">
                                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                    <img
                                                        src={Array.isArray(item.images) ? item.images[0] : item.imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-full object-center object-cover"
                                                    />
                                                </div>

                                                <div className="ml-4 flex-1 flex flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#">{item.name}</a>
                                                            </h3>
                                                            <p className="ml-4">
                                                                {item.currency === 'INR' ? '₹' : '$'}
                                                                {item.price.toLocaleString('en-IN')}
                                                            </p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">Sixe: {item.selectedSize}</p>
                                                        {item.fabric && <p className="text-xs text-gray-400 mt-1">{item.fabric}</p>}
                                                    </div>
                                                    <div className="flex-1 flex items-end justify-between text-sm">
                                                        <p className="text-gray-500">Qty {item.quantity}</p>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                                className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                                                            >
                                                                <FiTrash2 /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>₹{subtotal.toLocaleString('en-IN')}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-green-700"
                                >
                                    Checkout
                                </a>
                            </div>
                            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        className="text-accent font-medium hover:text-green-700"
                                        onClick={toggleCart}
                                    >
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
