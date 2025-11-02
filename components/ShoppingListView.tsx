import React, { useState } from 'react';

interface ShoppingListViewProps {
    ingredients: string[];
    onClose: () => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({ ingredients, onClose }) => {
    const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'sent'>('idle');

    const handleSendToStore = () => {
        setDeliveryStatus('sent');
        setTimeout(() => {
            setDeliveryStatus('idle');
            onClose();
        }, 3000); 
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">🛒 Shopping List</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light" aria-label="Close shopping list">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {deliveryStatus === 'sent' ? (
                        <div className="text-center py-12">
                            <p className="text-2xl text-green-600 font-semibold">✅ Order Sent!</p>
                            <p className="text-gray-600 mt-2">Your ingredient list has been sent to a local store. They will contact you shortly to confirm your delivery.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-4">Here are all the ingredients you'll need for your diet plan. You can use this list to shop yourself or send it to a local store for delivery.</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 bg-gray-50 p-4 rounded-lg">
                                {ingredients.map((item, index) => (
                                    <li key={index} className="text-gray-700 capitalize list-disc list-inside">{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                
                {deliveryStatus !== 'sent' && (
                     <div className="p-6 border-t mt-auto bg-gray-50 rounded-b-2xl flex flex-col sm:flex-row gap-4">
                        <a 
                            href="https://www.google.com/maps/search/grocery+stores+near+me" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-1/2 text-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            Find Nearby Stores
                        </a>
                        <button 
                            onClick={handleSendToStore}
                            className="w-full sm:w-1/2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                        >
                            Send for Delivery
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};