export interface Ingredient {
  id: number;
  name: string;
}

export interface RecipeIngredient {
  id: number;
  quantity: number;
  unit: string;
  ingredient: Ingredient;
  type: string;
}

export interface Recipe {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  cookingTime: number;
  difficulty: string;
  numberPerson: number;
  recipe_ingredients: RecipeIngredient[];
  fat: string;
  protein: string;
  sugars: string;
  calories: string;
  carbs: string;
  steps: Steps[];
  author: User;
  created_at : string;
  review: { average: number, count: number};
  reviews: Review[];
}

export interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  created_at: string;
  images: Images[];
  recipe_id?: number;
  user_id?: number;
}

export interface User {
  id: number;
  full_name: string;
  profile_photo: string;
  created_at: string;
  email: string;
}

export interface Steps {
  id: number;
  step_number: number;
  title: string;
  instruction: string;
  images: Images[];
}

export interface Images {
  file?: File;
  image_path: string;
}

export interface Enums {
  categories: [];
  difficulties: [];
  typesRecipeIngredient: [];
}