
import React from 'react';
import { IconAI, IconDoctor, IconCommunity } from '../constants';
import type { View } from '../types';

interface WelcomeScreenProps {
    onSelectOption: (view: View) => void;
}

const OptionCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    bgColor: string;
}> = ({ icon, title, description, onClick, bgColor }) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col items-center text-center`}
    >
        <div className={`rounded-full p-4 mb-4 ${bgColor}`}>
            {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
        <button className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-semibold shadow-md hover:opacity-90 transition-opacity duration-200 ${bgColor}`}>
            Get Started
        </button>
    </div>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectOption }) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">Your Journey to a Healthy Recovery Starts Here</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Choose how you'd like to create your personalized pre- and post-surgery diet plan.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <OptionCard
                    icon={<IconAI />}
                    title="AI-Generated Plan"
                    description="Fill out a quick form about your health and surgery, and our AI will instantly create a custom diet plan for you. You can then share it with your doctor."
                    onClick={() => onSelectOption('ai_form')}
                    bgColor="bg-blue-500"
                />
                <OptionCard
                    icon={<IconDoctor />}
                    title="From Your Doctor"
                    description="Receive a diet plan directly from your trusted healthcare provider, tailored to your specific medical history and needs. (Feature coming soon!)"
                    onClick={() => onSelectOption('doctor_plan_info')}
                    bgColor="bg-green-500"
                />
                <OptionCard
                    icon={<IconCommunity />}
                    title="Community Success Stories"
                    description="Explore diet plans that have helped others with similar conditions recover successfully. Get inspired by their journeys and find a plan that works for you."
                    onClick={() => onSelectOption('community')}
                    bgColor="bg-purple-500"
                />
            </div>
        </div>
    );
};
