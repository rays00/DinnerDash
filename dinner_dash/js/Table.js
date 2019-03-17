function Table(positionX, positionY) {

	var food = new Food(-60,-25);

	var instance = this;
	var sprite = Assets.createSprite(images + 'newtable.png');
	var occupy = false;
	var clients;
	var newTable;

	sprite.width = (tableAreaGrid - 2) * 25;
	sprite.height = (tableAreaGrid - 2) * 25;

	sprite.interactive = true;
	sprite.buttonMode = true;

	sprite.x = positionX;
	sprite.y = positionY;

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	sprite.on('click', tableOnClick);

	function tableOnClick(){
		tableClick(instance);
	}	

	this.getSprite = function(){
		return sprite;
	}

	this.getClients = function(){
		return clients;
	}

	this.setOccupy = function(clientsAtTable){
		occupy = true;
		clients = clientsAtTable;
	}

	this.unsetOccupy = function(){
		occupy = false;
	}

	this.getOccupy = function(){
		return occupy;
	}

	this.putPlate = function(foodServed){
		if(occupy == true){
			food.show(sprite);
			clients.hideDialog();
			clients.checkFoodType(foodServed);
		}
	}

	this.hideFood = function(){
		food.hide();
	}

}
