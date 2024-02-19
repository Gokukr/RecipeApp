create database Recipe_app;

-- //execute this inorder to work with uuid_generate_v4 datatype;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

Create table user_data(
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	address varchar(255),
	gender varchar(10),
	role varchar(20),
	phone_number numeric(10),
	password varchar(255)  
);

Create table Recipe(
	id UUID primary key default uuid_generate_v4(),
	Name varchar(255),
	Description text,
	Image varchar(255),
	Rating numeric(5),
	Ingredients varchar(255)[],
	instructions TEXT[],
	Preparation_time numeric(5),
	Cooking_time numeric(5),
	Total_time numeric(5),
	Servings varchar(10),
	Difficulty varchar(20),
	Cuisine varchar(20),
	Meal_type varchar(20),
	Status varchar(10),
	Course_type varchar(20),
	total_ratings numeric(5), 
	User_id UUID references user_data(id)		
);

INSERT INTO Recipe (
    Name,
    Description,
    Image,
    Rating,
    Ingredients,
    Instructions,
    Preparation_time,
    Cooking_time,
    Total_time,
    Servings,
    Difficulty,
    Cuisine,
    Meal_type,
    Status,
    Course_type,
    total_ratings,
    User_id
)
VALUES ('Vegetable Fried Rice',
    'Quick and easy fried rice loaded with colorful vegetables.',
    'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/fried-rice.jpg',
    4.2,
    '{"Rice", "Carrot", "Peas", "Pepper", "Onion", "Garlic", "Soy Sauce", "Eggs", "Oil"}',
    '{"1. Cook rice according to package instructions and let cool.', '2. In a large skillet or wok, heat oil over medium heat.', '3. Add onion, garlic, and vegetables, and stir-fry until tender.', '4. Push vegetables to one side and scramble eggs in the empty space.', '5. Add cooked rice and soy sauce, tossing to combine.', '6. Drizzle with sesame oil and toss again before serving."}',
    10,
    10,
    20,
    '4',
    'Easy',
    'north Indian',
    'Veg',
    'Accepted',
    'Main Course',
    0,
    '15278c66-2dad-4114-bd4f-039470ff12f7'
),
('Classic Margherita Pizza',
    'Simple and delicious pizza topped with fresh tomato sauce, mozzarella cheese, and basil leaves.',
    'https://static.toiimg.com/thumb/56868564.cms?imgsize=1948751&width=800&height=800',
    4.7,
    '{"Pizza Dough", "Tomatoe", "Cheese", "Basil Leaves", "Olive Oil", "Salt", "Pepper"}',
    '{"1. Preheat oven to highest setting.', '2. Roll out pizza dough and transfer to a baking sheet.', '3. Spread tomato sauce evenly over the dough.', '4. Top with sliced tomatoes, mozzarella cheese, and basil leaves.', '5. Drizzle with olive oil and season with salt and pepper.', '6. Bake in the preheated oven for 10-12 minutes, or until crust is golden brown and cheese is bubbly."}',
    20,
    10,
    30,
    '4',
    'Easy',
    'Chinese',
    'Veg',
    'Accepted',
    'Main Course',
    0,
    '15278c66-2dad-4114-bd4f-039470ff12f7');
select * from Recipe;

Create table Ingredients(
	ID UUID Primary key default uuid_generate_v4(),
	Ingredient_name varchar(100) UNIQUE,
	Category varchar(100)
);
INSERT INTO Ingredients (Ingredient_name, Category) VALUES
('Tomato', 'Vegetable'),('Pasta', 'Grain'),('Broccoli', 'Vegetable'),('Cheese', 'Dairy'),('Carrot', 'Vegetable'),
('Fish', 'Seafood'),('Egg', 'Dairy'),('Potato', 'Vegetable'),('Lettuce', 'Vegetable'),('Flour', 'Grains'),('Sugar', 'Sweeteners'),('Salt', 'Seasonings'),('Pepper', 'Seasonings'),
('Olive Oil', 'Oils'),('Chicken', 'Meat'),('Rice', 'Grains'),('Chicken Breast', 'Meat'),('Garlic', 'Vegetables'),('Milk', 'Dairy');
select * from Ingredients;

create table Cuisine_type(
	ID UUID primary key default uuid_generate_v4(),
	Name varchar(25),
	Description text
);
INSERT INTO Cuisine_type (Name, Description)
VALUES
    ('Italian', 'Italian cuisine is known for its regional diversity, abundance of pasta, pizza, and use of ingredients like tomatoes, olive oil, and garlic.'),
    ('Chinese', 'Chinese cuisine is diverse, with a wide range of cooking styles and flavors influenced by regions such as Sichuan, Cantonese, and Hunan.'),
    ('Spanish', 'Spanish cuisine is characterized by its Mediterranean influence, including dishes like paella, tapas, and a variety of seafood.'),
    ('Thai', 'Thai cuisine features bold flavors, aromatic herbs, and spices, with dishes like pad Thai, green curry, and tom yum soup.'),
    ('Indian', 'Indian cuisine is known for its rich flavors, diverse spices, and wide variety of vegetarian and non-vegetarian dishes, including curries, biryanis, and tandoori.'),
    ('American', 'American cuisine encompasses a wide range of regional dishes and influences, including burgers, barbecue, Tex-Mex, and soul food.'),
    ('Asian', 'Asian cuisine is a broad category that includes diverse culinary traditions from countries like China, Japan, Korea, Thailand, and Vietnam, known for their unique flavors and ingredients.'),
    ('Japanese', 'Japanese cuisine is characterized by its emphasis on fresh, seasonal ingredients, simplicity, and precision, with dishes like sushi, tempura, and ramen.');
select * from Cuisine_type;

Create table Favorites(
	ID UUID primary key default uuid_generate_v4(),
	User_ID UUID references user_data(id),
	Recipe_id UUID references Recipe(id),
	Date_added timestamp,
	Notes text
);
select * from Favorites;