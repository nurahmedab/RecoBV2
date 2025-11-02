
import React from 'react';

interface InfoViewProps {
    title: string;
    message: string;
    onBack: () => void;
    accentColor: string;
}

export const InfoView: React.FC<InfoViewProps> = ({ title, message, onBack, accentColor }) => {
    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-lg">
                <h2 className={`text-4xl font-extrabold ${accentColor}`}>{title}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">{message}</p>
                <button onClick={onBack} className="mt-8 bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-900 transition-colors">
                    &larr; Go Back
                </button>
            </div>
        </div>
    );
};
