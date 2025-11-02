import React, { useState, useCallback } from 'react';
import type { DietPlan, DailyPlan, Meal } from '../types';
import { ShoppingListView } from './ShoppingListView';

interface DietPlanViewProps {
    plan: DietPlan;
    onBack: () => void;
}

const MealCard: React.FC<{ meal: Meal; mealType: string }> = ({ meal, mealType }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-700">{mealType}</h4>
        <p className="font-semibold text-blue-600">{meal.name}</p>
        <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
        <p className="text-xs text-gray-500 mt-2 font-mono">{meal.calories} kcal</p>
    </div>
);

const DailyPlanCard: React.FC<{ dailyPlan: DailyPlan }> = ({ dailyPlan }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{dailyPlan.day}</h3>
        <div className="space-y-4">
            <MealCard meal={dailyPlan.breakfast} mealType="Breakfast" />
            <MealCard meal={dailyPlan.lunch} mealType="Lunch" />
            <MealCard meal={dailyPlan.dinner} mealType="Dinner" />
            {dailyPlan.snacks.length > 0 && (
                <div>
                    <h4 className="font-bold text-gray-700 mb-2">Snacks</h4>
                    <div className="space-y-2">
                        {dailyPlan.snacks.map((snack, i) => (
                             <div key={i} className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-blue-600 text-sm">{snack.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{snack.calories} kcal</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

const MotivationTracker: React.FC = () => {
    const [day, setDay] = useState(1);
    const totalDays = 30;
    const progress = (day / totalDays) * 100;

    return (
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg my-8">
            <h3 className="text-2xl font-bold">Your 1-Month Progress</h3>
            <p className="opacity-80 mb-4">Stay consistent to unlock your recovery achievement!</p>
            <div className="w-full bg-blue-300 rounded-full h-4 mb-2">
                <div className="bg-white h-4 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-right font-semibold">{day} / {totalDays} Days Completed</div>
            <div className="text-center mt-4">
                <span className="text-4xl">🏆</span>
                <p className="font-semibold">Keep going! You're doing great.</p>
            </div>
        </div>
    )
}

export const DietPlanView: React.FC<DietPlanViewProps> = ({ plan, onBack }) => {
    const [activeTab, setActiveTab] = useState<'pre-op' | 'post-op'>('pre-op');
    const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);

    const getShoppingList = useCallback(() => {
        if (!plan) return [];
        const allIngredients = new Set<string>();

        const extractIngredients = (dailyPlan: DailyPlan) => {
            dailyPlan.breakfast.ingredients?.forEach(ing => allIngredients.add(ing.toLowerCase()));
            dailyPlan.lunch.ingredients?.forEach(ing => allIngredients.add(ing.toLowerCase()));
            dailyPlan.dinner.ingredients?.forEach(ing => allIngredients.add(ing.toLowerCase()));
            dailyPlan.snacks.forEach(snack => snack.ingredients?.forEach(ing => allIngredients.add(ing.toLowerCase())));
        };

        plan.preOpPlan.dailyPlans.forEach(extractIngredients);
        plan.postOpPlan.forEach(week => {
            week.dailyPlans.forEach(extractIngredients);
        });
        
        return Array.from(allIngredients).sort((a, b) => a.localeCompare(b));
    }, [plan]);


    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
             {isShoppingListVisible && (
                <ShoppingListView 
                    ingredients={getShoppingList()} 
                    onClose={() => setIsShoppingListVisible(false)} 
                />
            )}
            <button onClick={onBack} className="mb-6 text-blue-600 hover:underline font-semibold">
                &larr; Back to Start
            </button>
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-gray-800">Your Custom Diet Plan</h2>
                <p className="mt-2 text-lg text-gray-600">Generated for {plan.patientName}</p>
            </div>

            <MotivationTracker />

            <div className="mt-8">
                <div className="flex justify-center border-b border-gray-200">
                    <button onClick={() => setActiveTab('pre-op')} className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 ${activeTab === 'pre-op' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                        Pre-Operative Plan
                    </button>
                    <button onClick={() => setActiveTab('post-op')} className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 ${activeTab === 'post-op' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                        Post-Operative Plan
                    </button>
                </div>

                <div className="mt-8">
                    {activeTab === 'pre-op' && (
                        <div>
                            <p className="text-center bg-blue-50 p-4 rounded-lg text-blue-800 mb-8">{plan.preOpPlan.summary}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {plan.preOpPlan.dailyPlans.map((dp, i) => <DailyPlanCard key={i} dailyPlan={dp} />)}
                            </div>
                        </div>
                    )}
                    {activeTab === 'post-op' && (
                        <div className="space-y-12">
                            {plan.postOpPlan.map(weeklyPlan => (
                                <div key={weeklyPlan.week}>
                                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">Post-Op: Week {weeklyPlan.week}</h3>
                                    <p className="text-center bg-green-50 p-4 rounded-lg text-green-800 mb-8 max-w-3xl mx-auto">{weeklyPlan.summary}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {weeklyPlan.dailyPlans.map((dp, i) => <DailyPlanCard key={i} dailyPlan={dp} />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                 <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
                     <button 
                        onClick={() => setIsShoppingListVisible(true)}
                        className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                    >
                        🛒 Get Ingredients
                    </button>
                    <button className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors">
                        Send to Doctor for Approval
                    </button>
                    <button onClick={() => window.print()} className="bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition-colors">
                        Print Plan
                    </button>
                </div>
            </div>
        </div>
    );
};