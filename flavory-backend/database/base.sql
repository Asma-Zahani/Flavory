INSERT INTO recipes (id, author_id, image, category, title, description, cookingTime, difficulty, numberPerson, calories, fat, protein, sugars, carbs, created_at, updated_at)
VALUES
(1, 1, '/storage/recipes/recipe_1.jpg', 'Breakfast', 'Crispy choco croissants', 'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magnna ad aliquam. Ut enim', 90, 'Hard', 3, 436, 200, 100, 146, 24, NOW(), NOW()),
(2, 1, '/storage/recipes/recipe_2.jpg', 'Main Dish', 'Lamb soup with spices & rice', 'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magnna ad aliquam. Ut enim', 90, 'super easy', 6, 436, 200, 100, 146, 24, NOW(), NOW()),
(3, 1, '/storage/recipes/recipe_3.jpg', 'Main Dish', 'Avocado bacon sandwich with lettuce', 'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magnna ad aliquam. Ut enim', 30, 'super easy', 2, 436, 200, 100, 146, 24, NOW(), NOW()),
(4, 1, '/storage/recipes/recipe_4.jpg', 'Main Dish', 'Seashells with spinach, basil & ricotta', 'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magnna ad aliquam. Ut enim', 30, 'super easy', 6, 436, 200, 100, 146, 24, NOW(), NOW());

INSERT INTO ingredients (id, name) VALUES
(1, 'Chicken Breast'),
(2, 'Ground Beef'),
(3, 'Eggs'),
(4, 'Flaxseed Meal'),
(5, 'Potato'),
(6, 'Walnuts'),
(7, 'Fresh Herbs'),
(8, 'Blueberries'),
(9, 'Mayonnaise'),
(10, 'Honey');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit, type) VALUES
(1, 1, 4, 'pieces', 'normal'),       -- Chicken Breast
(1, 3, 8, 'eggs', 'normal'),         -- Eggs
(1, 4, 14, 'g', 'normal'),           -- Flaxseed Meal
(1, 5, 1.5, 'cups', 'normal'),       -- Potato
(1, 6, 0.34, 'cups', 'normal'),      -- Walnuts
(1, 7, 2, 'tablespoons', 'For Dressing'), -- Fresh Herbs
(1, 8, 6, 'cups', 'For Dressing'),         -- Blueberries
(1, 9, 900, 'g', 'For Dressing'),        -- Mayonnaise
(1, 10, 3, 'tablespoons', 'For Dressing'); -- Honey

INSERT INTO steps (recipe_id, step_number, title, instruction)
VALUES
(1, 1, 'Make the barbecue sauce (or substitute 1 cup bottled sauce)',
'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magna aliqua. 
Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
[IMAGES]
Excepteur sint occaecat lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eius ad mod tempor inci didunt ut labore e dolore magna aliqua. 
Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in mea henderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
),
(1, 2, 'Cook the chicken (or substitute 2 cups shredded cooked chicken)',
'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magna aliqua. 
Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore quo dolore magna aliqua. Ut enim ad minim. 
quis nostrud exer citation ullamco laboris nisi ut aliquip ex mea commodo consequat duis aute irure.'
),
(1, 3, 'Mix the chicken with the barbecue sauce',
'Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magna aliqua. 
Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
[IMAGES]
Excepteur sint occaecat lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eius ad mod tempor inci didunt ut labore e dolore magna aliqua. 
Ut enim ad minim. quis nostrud exer citation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in mea henderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
);

INSERT INTO step_images (step_id, image_path)
VALUES
-- Étape 1
(1, '/storage/steps/recipe1_step1_1.jpg'),
(1, '/storage/steps/recipe1_step1_2.jpg'),

-- Étape 3
(3, '/storage/steps/recipe1_step3_1.jpg'),
(3, '/storage/steps/recipe1_step3_2.jpg'),
(3, '/storage/steps/recipe1_step3_3.jpg');

INSERT INTO reviews (user_id, recipe_id, rating, comment, created_at, updated_at)
VALUES
(1, 1, 5, 'Délicieux ! J’ai ajouté un peu de miel, parfait.', NOW(), NOW()),
(1, 1, 4, 'Très bon goût, mais un peu long à préparer.', NOW(), NOW()),
(1, 2, 5, 'Recette réussie du premier coup, bravo !', NOW(), NOW()),
(1, 3, 3, 'Pas mal, mais manque un peu d’assaisonnement.', NOW(), NOW());

INSERT INTO review_images (review_id, image_path)
VALUES
(1, '/storage/reviews/recipe1_review1_1.jpg');
