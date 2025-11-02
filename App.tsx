
import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AiDietForm } from './components/AiDietForm';
import { DietPlanView } from './components/DietPlanView';
import { CommunityView } from './components/CommunityView';
import { InfoView } from './components/InfoView';
import { generateDietPlan } from './services/geminiService';
import type { View, PatientProfile, DietPlan } from './types';

const Header = () => (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                <span className="text-blue-600">SurgiDiet</span> Planner
            </h1>
        </div>
    </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} SurgiDiet Planner. All rights reserved.</p>
            <p className="opacity-70 mt-1">This is a tool for guidance and should not replace professional medical advice.</p>
        </div>
    </footer>
);

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>
        <p className="mt-6 text-white text-xl font-semibold">{message}</p>
    </div>
);


const App: React.FC = () => {
    const [view, setView] = useState<View>('welcome');
    const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePlan = useCallback(async (profile: PatientProfile) => {
        setIsLoading(true);
        setError(null);
        try {
            const plan = await generateDietPlan(profile);
            setDietPlan(plan);
            setView('plan_view');
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            // stay on the form view to show the error
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const resetToWelcome = () => {
        setView('welcome');
        setDietPlan(null);
        setError(null);
    }

    const renderView = () => {
        if (error && view === 'ai_form') {
            // Error is handled inside AiDietForm for now, but a global modal could be an option
        }
        
        switch (view) {
            case 'ai_form':
                return <AiDietForm onSubmit={handleGeneratePlan} onBack={resetToWelcome} />;
            case 'plan_view':
                return dietPlan ? <DietPlanView plan={dietPlan} onBack={resetToWelcome} /> : <WelcomeScreen onSelectOption={setView} />;
            case 'community':
                 return <CommunityView onBack={resetToWelcome} />;
            case 'doctor_plan_info':
                 return <InfoView title="Coming Soon!" message="This feature will allow your doctor to send a diet plan directly to your account. Stay tuned for updates!" onBack={resetToWelcome} accentColor="text-green-500" />;
            case 'welcome':
            default:
                return <WelcomeScreen onSelectOption={setView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {isLoading && <LoadingSpinner message="Generating your personalized plan..." />}
            <Header />
            <main className="flex-grow">
                {error && view !== 'ai_form' && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
                {renderView()}
            </main>
            <Footer />
        </div>
    );
};

export default App;
