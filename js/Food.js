function Food(x, y){

	var sprite = Assets.createSprite(images + 'food.png');
	sprite.name = 'food';

	var type;
	var flag;
	var ready = false;

	var instance = this;

	sprite.x = x;
	sprite.y = y;

	sprite.interactive = true;
	sprite.buttonMode = true;

	sprite.on("click", takeFood);

	function putFlag(){
		flag = Assets.createSprite(images + "flag.png");
		sprite.addChild(flag);
		flag.scale.x = 0.5;
		flag.scale.y = 0.5;
		flag.x = 18;
		flag.y = -35;
		var foodOnFlag = Assets.createSprite(type);
		foodOnFlag.scale.x = 0.55;
		foodOnFlag.scale.y = 0.55;
		foodOnFlag.x = 15;
		foodOnFlag.y = 20;
		flag.addChild(foodOnFlag);
	}

	this.setType = function(foodType){
		type = foodType;
		putFlag();
	}

	this.getType = function(){
		return type;
	}

	function takeFood(){
		if(ready == true){
			if(waiter.isAtTheOven()){
				if(!waiter.checkIfHasFood()){
					waiter.takePlate(instance);
					instance.hide();
					oven.takeFromBar(instance);
				}
			}
			else {
				waiter.walkToPlate(instance);
			}
		}
		
	}

	this.ready = function(){
		ready = true;
	}

	this.getSprite = function(){
		return sprite;
	}

	this.show = function(parent){
		parent.addChild(sprite);
	}

	this.hide = function(){
		sprite.parent.removeChild(sprite);	
	}


}