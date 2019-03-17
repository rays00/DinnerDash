function Waiter(config){

	//drawGridCell(tablePositionX, tablePositionY, 0xff0000);

	var speed = config.initialSpeed;

	var food = new Food(0,0);

	var sprite = Assets.createSprite(images + 'waiter.png');
	var offset = 100;
	var currentTable;
	var hasFood = false;
	var _isAtTheOven = true;
	var _isAtTheTable = false;
	var instance = this;
	var currentClients;
	var _hasBoots = false;
	var leftBoot;

	function createBoots(imageSource){
		leftBoot = Assets.createSprite(imageSource);
		leftBoot.scale.x = 0.28;
		leftBoot.scale.y = 0.28;
		leftBoot.pivot.x = 50;
		leftBoot.pivot.y = 50;
		leftBoot.y = 40;
		leftBoot.x = 1;
		sprite.addChild(leftBoot);

		rightBoot = Assets.createSprite(imageSource);
		rightBoot.scale.x = 0.28;
		rightBoot.scale.y = 0.28;
		rightBoot.pivot.x = 50;
		rightBoot.pivot.y = 50;
		rightBoot.y = 40;
		rightBoot.x = 10;
		sprite.addChild(rightBoot);
	}

	sprite.x = bar.x - 400;
	sprite.y = bar.y;

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	function removeBoots(){
		sprite.removeChild(leftBoot, rightBoot);
		_hasBoots = false;
		speed = config.initialSpeed;
	}

	this.hasBoots = function(){
		return _hasBoots;
	}

	this.addBoots = function(config){
		speed += config.speed;
		createBoots(config.imageSource);
		_hasBoots = true;
		setTimeout(removeBoots, config.duration);
	}

	this.getSprite = function(){
		return sprite;
	}

	this.checkIfHasFood = function(){
		return hasFood;
	}

	this.takePlate = function(foodServed){
		foodType = foodServed;
		hasFood = true;
		food.show(sprite);
	}

	this.isAtTheOven = function(){
		return _isAtTheOven;
	}

	this.isAtTheTable = function(){
		return _isAtTheTable;
	}

	this.arriveAtTheTable = function(){
		if(hasFood == true){
			food.hide();
			currentTable.putPlate(foodType);
		}
		hasFood = false;
		_isAtTheTable = true;
	}

	function cleanTheTable(){
		currentClients.hideDialog();
		currentTable.hideFood();
		currentClients.pay();
		currentTable.unsetOccupy();
	}

	this.takeFromOven = function(){
		_isAtTheOven = true;
	}

	this.serveTo = function(table, clients){
		walkTo(table, instance.arriveAtTheTable, 5, 0);
		_isAtTheOven = false;
		currentTable = table;	
		menu.hide();
	}

	this.walkToOven = function(oven){
		walkTo(oven, instance.takeFromOven, 8, -2);
		_isAtTheTable = false;
	}

	this.walkToPlate = function(plate){
		walkTo(plate, function(){
			checkPlate(plate);
		}, 0, -4);
	}

	this.cleanTo = function(table, Clients){
		currentClients = Clients;
		if(_isAtTheTable == true && currentTable == table){
				cleanTheTable();
		}
		else {
			currentTable = table;
			cleanUp(table, Clients);
		}
	}

	function checkPlate(plate){
		if(!waiter.checkIfHasFood()){
			waiter.takePlate(plate);
			plate.hide();
			oven.takeFromBar(plate);
		}
	}

	function cleanUp(table, clients){
		walkTo(table, cleanTheTable, 5, 0);
		_isAtTheOven = false;
		menu.hide();
	}

	function walkTo(object, onComplete, offsetX, offsetY){
		var walkPath = new Path(sprite, onComplete);
		var objectPositionX = Math.round(object.getSprite().getGlobalPosition().x / 25 - offsetX);
		var objectPositionY = Math.round(object.getSprite().getGlobalPosition().y / 25 - offsetY);
		var gridBackup = grid.clone();
		var path = finder.findPath(Math.round(sprite.y / 25), Math.round(sprite.x / 25), objectPositionY, objectPositionX, gridBackup);
		//console.log(path);
		distance = 25;
		time = distance / speed;
		walkPath.walkAlongPath(time, path);
		//drawGridCell(objectPositionX, objectPositionY, '#FFFFFF')
	}

}