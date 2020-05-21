var config = {};

config.waiter = {};
config.waiter.initialSpeed = 200;

config.fridge = {};
config.fridge.drinks = [];

config.fridge.drinks.push({
	id: 0,
	productName: "Red Wine",
	price: 3,
	imageSource: "images/red_wine.png"
});

config.fridge.drinks.push({
	id: 1,
	productName: "Beer",
	price: 2,
	imageSource: "images/beer.png"
})

config.shop = {};

config.shop.items = [];
config.shop.items.push({
	id: 0,
	productName: "Hitler's boots",
	price: 5,
	type: "boots",
	speed: 75,
	duration: 40000,
	description: "+ 75 waiter speed",
	imageSource: "images/hitlersboots.png"
});

config.shop.items.push({
	id: 1,
	productName:"Rollers",
	price: 10,
	type: "boots",
	speed: 150,
	duration: 50000,
	description: "+ 150 waiter speed",
	imageSource: "images/rollers.png"
});

config.shop.items.push({
	id: 2,
	productName:"Lamp",
	price: 600,
	type: "furniture",
	duration: 0,
	description: "decorate your bar",
	imageSource: "images/lamp.png"
});

