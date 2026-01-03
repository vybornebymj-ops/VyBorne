import React, { useCallback } from 'react';
import { useRazorpay } from 'react-razorpay';
import logo from '../assets/logo.png';

interface CheckoutButtonProps {
    amount: number;
    currency?: string;
    onSuccess?: (paymentId: string) => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, currency = "INR", onSuccess }) => {
    // @ts-ignore - Ignoring hook type mismatch if any, relying on named export
    const { isLoading, error, Razorpay } = useRazorpay();

    const handlePayment = useCallback(() => {
        // NOTE: In a production app, you MUST create an order on your backend first
        // and pass the order_id here.
        // const order = await createOrderOnBackend(amount);

        const options = {
            key: "rzp_live_RzTn80CU6r7oWv", // Enter the Key ID generated from the Dashboard
            amount: (amount * 100).toString(), // Amount is in currency subunits. Default currency is INR.
            currency: currency,
            name: "VyBorne",
            description: "Fashion Transaction",
            image: logo,
            // order_id: "order_9A33XWu170gUtm", // Sample Order ID
            handler: (response: any) => {
                console.log(response);
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                if (onSuccess) {
                    onSuccess(response.razorpay_payment_id);
                }
            },
            prefill: {
                name: "Test User",
                email: "test.user@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "VyBorne Corporate Office",
            },
            theme: {
                color: "#059669", // Matches our 'accent' color
            },
        };

        if (Razorpay) {
            const rzp1 = new Razorpay(options as any);

            rzp1.on("payment.failed", (response: any) => {
                alert(`Payment Failed: ${response.error.description}`);
                console.error(response.error);
            });

            rzp1.open();
        }
    }, [Razorpay, amount, currency, onSuccess]);

    return (
        <button
            onClick={handlePayment}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-green-700 transition-colors duration-200"
        >
            Checkout with Razorpay
        </button>
    );
};

export default CheckoutButton;
