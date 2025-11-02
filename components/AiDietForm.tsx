
import React, { useState } from 'react';
import type { PatientProfile } from '../types';
import { SURGERY_TYPES } from '../constants';

interface AiDietFormProps {
    onSubmit: (profile: PatientProfile) => void;
    onBack: () => void;
}

export const AiDietForm: React.FC<AiDietFormProps> = ({ onSubmit, onBack }) => {
    const [profile, setProfile] = useState<PatientProfile>({
        name: '',
        age: 30,
        weight: 70,
        weightUnit: 'kg',
        surgeryType: SURGERY_TYPES[0],
        surgeryDate: new Date().toISOString().split('T')[0],
        allergies: '',
        medicalConditions: '',
        dietaryPreferences: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: name === 'age' || name === 'weight' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile.name || !profile.surgeryType || !profile.surgeryDate) {
            setError('Please fill in all required fields: Name, Surgery Type, and Surgery Date.');
            return;
        }
        setError('');
        onSubmit(profile);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <button onClick={onBack} className="mb-6 text-blue-600 hover:underline font-semibold">
                &larr; Back to Options
            </button>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your AI-Powered Diet Plan</h2>
                <p className="text-gray-600 mb-6">Provide some details so our AI can tailor the perfect recovery plan for you.</p>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" id="name" value={profile.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input type="number" name="age" id="age" value={profile.age} onChange={handleChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-end gap-2">
                            <div className="flex-grow">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                                <input type="number" name="weight" id="weight" value={profile.weight} onChange={handleChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <select name="weightUnit" value={profile.weightUnit} onChange={handleChange} className="block w-auto px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="kg">kg</option>
                                <option value="lbs">lbs</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="surgeryType" className="block text-sm font-medium text-gray-700">Surgery Type</label>
                            <select name="surgeryType" id="surgeryType" value={profile.surgeryType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                                {SURGERY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="surgeryDate" className="block text-sm font-medium text-gray-700">Surgery Date</label>
                            <input type="date" name="surgeryDate" id="surgeryDate" value={profile.surgeryDate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies (e.g., peanuts, gluten, dairy)</label>
                        <textarea name="allergies" id="allergies" value={profile.allergies} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="List any food allergies here..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700">Relevant Medical Conditions (e.g., diabetes, high blood pressure)</label>
                        <textarea name="medicalConditions" id="medicalConditions" value={profile.medicalConditions} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="List any conditions that might affect your diet..."></textarea>
                    </div>
                    <div>
                        <label htmlFor="dietaryPreferences" className="block text-sm font-medium text-gray-700">Dietary Preferences (e.g., vegetarian, vegan, low-carb)</label>
                        <textarea name="dietaryPreferences" id="dietaryPreferences" value={profile.dietaryPreferences} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Let us know your food preferences..."></textarea>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                            Generate My Diet Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
