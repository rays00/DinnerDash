function Menu(){


	var sprite = new PIXI.Container();
	sprite.scale.x = 0.2;
	sprite.scale.y = 0.2;
	sprite.x = 550;
	sprite.y = 40;

	var steak = Assets.createSprite('images/steak.png');
	var frenchFries = Assets.createSprite('images/french_fries.png');
	var salad = Assets.createSprite('images/salad.png');

	steak.scale.x = 2.5;
	steak.scale.y = 2.5;
	steak.y = sprite.y / 2;

	frenchFries.scale.x = 2.5;
	frenchFries.scale.y = 2.5;
	frenchFries.y = steak.y;
	frenchFries.x = steak.x + 350;

	salad.scale.x = 2.5;
	salad.scale.y = 2.5;
	salad.y = steak.y;
	salad.x = frenchFries.x + 350;

	steak.interactive = true;
	steak.buttonMode = true;

	frenchFries.interactive = true;
	frenchFries.buttonMode = true;

	salad.interactive = true;
	salad.buttonMode = true;


	sprite.addChild(steak);
	sprite.addChild(frenchFries);
	sprite.addChild(salad);

	this.getSprite = function(){
		return sprite;
	}

	this.show = function(){
		app.stage.addChild(sprite);
	}

	this.hide = function(){
		app.stage.removeChild(sprite);
	}

	steak.on('click', function(){
		oven.addToQueue(steak.name);
		//oven.startCooking(steak.name);
	});

	frenchFries.on('click', function(){
		oven.addToQueue(frenchFries.name);
		//oven.startCooking(frenchFries.name);
	});

	salad.on('click', function(){
		oven.addToQueue(salad.name);
		//oven.startCooking(salad.name);
	});

}