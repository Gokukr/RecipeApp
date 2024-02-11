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
	Description varchar(255),
	Image varchar(255),
	Rating numeric(5),
	Ingredients varchar(255)[],
	Instruction text,
	Preperation_time numeric(5),
	Cooking_time numeric(5),
	Total_time numeric(5),
	Servings varchar(10),
	Difficulty varchar(10),
	Cuisine varchar(20),
	Meal_type varchar(20),
	Status varchar(10),
	Course_type varchar(20),
	User_id UUID references user_data(id)		
);
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
select * from Cuisine_type;

Create table Favorites(
	ID UUID primary key default uuid_generate_v4(),
	User_ID UUID references user_data(id),
	Recipe_id UUID references Recipe(id),
	Date_added timestamp,
	Notes text
);
select * from Favorites;