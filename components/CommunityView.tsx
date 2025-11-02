
import React from 'react';

interface CommunityViewProps {
    onBack: () => void;
}

const mockStories = [
    {
        name: "John D.",
        surgery: "Knee Replacement",
        quote: "Following the community-recommended high-protein diet made my recovery so much smoother. I was back on my feet faster than I expected!",
        image: "https://picsum.photos/seed/john/400/300"
    },
    {
        name: "Sarah P.",
        surgery: "Gallbladder Removal",
        quote: "The low-fat meal plan I found here was a lifesaver. It was easy to follow and delicious. Highly recommend it to anyone going through the same.",
        image: "https://picsum.photos/seed/sarah/400/300"
    },
    {
        name: "Mike R.",
        surgery: "Coronary Artery Bypass",
        quote: "The heart-healthy diet plan helped me not just recover, but build healthier habits for life. I feel better than I have in years.",
        image: "https://picsum.photos/seed/mike/400/300"
    }
];

const StoryCard: React.FC<(typeof mockStories)[0]> = ({ name, surgery, quote, image }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <img src={image} alt={`Portrait of ${name}`} className="w-full h-48 object-cover" />
        <div className="p-6 flex-grow flex flex-col">
            <p className="text-gray-600 flex-grow italic">"{quote}"</p>
            <div className="mt-4">
                <p className="font-bold text-lg text-purple-700">{name}</p>
                <p className="text-sm text-gray-500">{surgery}</p>
            </div>
            <button className="mt-4 w-full bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition-colors">
                View Diet Plan
            </button>
        </div>
    </div>
);

export const CommunityView: React.FC<CommunityViewProps> = ({ onBack }) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <button onClick={onBack} className="mb-6 text-purple-600 hover:underline font-semibold">
                &larr; Back to Options
            </button>
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">Community Success Stories</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Get inspired by others who have successfully recovered with the help of a tailored diet plan.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockStories.map((story, i) => (
                    <StoryCard key={i} {...story} />
                ))}
            </div>
        </div>
    );
};
