export interface Post {
  id: number;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name?: string;
  nickname?: string;
  height: number;
  age?: number;
  gender?: string;
  targetWeight?: number;
  weights: Weight[];
  mealPhotos: MealPhoto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Weight {
  id: number;
  weight: number;
  bodyFat?: number;
  measurementDate: Date;
  userId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealPhoto {
  id: number;
  url: string | null;
  registeredDate: Date;
  mealType: string;
  userId: number;
  description?: string;
  mealCalories?: number;
  ratings?: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  mealTaken: boolean;
}
