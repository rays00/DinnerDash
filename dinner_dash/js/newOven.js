function newOven(){


	var instance = this;
	var sprite = Assets.createSprite(images + 'oven.png');
	var foodCooked;
	var isCooking = false;
	var cookTimer;
	var platesOnBar = [];
	var queue = [];

	this.getSprite = function(){
		return sprite;
	}

	sprite.interactive = true;
	sprite.buttonMode = true;

	sprite.x = bar.x - 200;
	sprite.y = bar.y - 50;

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	spriteWidth = 96;
	spriteHeight = 96;

	sprite.on("click", ovenOnClick);

	function ovenOnClick(){
		if(! waiter.isAtTheOven()){
			waiter.walkToOven(instance);
		}
		else {
			menu.show();
		}
	}

	this.takeFromBar = function(plate){
		var toShift = platesOnBar.indexOf(plate);
		platesOnBar.slice(toShift, toShift + 1);
		for(i = toShift; i < platesOnBar.length; i++){
			TweenLite.to(platesOnBar[i].getSprite(), 2.5, { ease: Power0.easeNone, x: platesOnBar[i].getSprite().x - 50});
		}
	}

	this.addToQueue = function(foodToCook){
		food = new Food();
		food.getSprite().alpha = 0.5;
		food.show(app.stage);
		platesOnBar.push(food);
		food.getSprite().x = sprite.x + platesOnBar.length * 50;
		food.getSprite().y = sprite.y;
		food.setType(foodToCook);
		queue.push(food);
		checkQueue();
	}

	function checkQueue(){
		if(queue.length > 0 && !isCooking){
			instance.startCooking(queue[0]);
			queue.shift();
		}
	}

	this.startCooking = function(foodType){
		isCooking = true;
		cookTimer = new Clock(2000);
		cookTimer.setPosition(50,-40);
		sprite.addChild(cookTimer.getSprite());
		cookTimer.start();
		setTimeout(generateFood, 2000, foodType);
	}

	function generateFood(currentFood){
		currentFood.getSprite().alpha = 1;
		currentFood.ready();
		isCooking = false;
		cookTimer.stop();
		cookTimer.hide();
		checkQueue();
	}

}