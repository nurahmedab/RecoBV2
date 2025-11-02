export interface PatientProfile {
  name: string;
  age: number;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  surgeryType: string;
  surgeryDate: string;
  allergies: string;
  medicalConditions: string;
  dietaryPreferences: string;
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  ingredients: string[];
}

export interface DailyPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface WeeklyPlan {
  week: number;
  summary: string;
  dailyPlans: DailyPlan[];
}

export interface DietPlan {
  patientName: string;
  preOpPlan: {
    summary: string;
    dailyPlans: DailyPlan[];
  };
  postOpPlan: WeeklyPlan[];
}

export type View = 'welcome' | 'ai_form' | 'community' | 'doctor_plan_info' | 'plan_view';