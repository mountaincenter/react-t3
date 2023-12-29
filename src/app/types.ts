export interface Post {
  id: number;
  content: string;
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
  weight: Weight[];
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
