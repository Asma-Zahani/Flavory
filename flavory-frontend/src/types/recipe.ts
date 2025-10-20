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
  fat: number;
  protein: number;
  sugars: number;
  calories: number;
  carbs: number;
  steps: Steps[];
  author: Author;
  created_at : string;
}

export interface Author {
  full_name: string;
  profile_photo: string;
}

export interface Steps {
  id: number;
  step_number: number;
  title: string;
  instruction: string;
  images: Images[];
}

export interface Images {
  id: number;
  image_path: string;
  step_id: number;
}

export interface Enums {
  categories: [];
  difficulties: [];
  typesRecipeIngredient: [];
}