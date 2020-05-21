function Fridge(x, y){

	var sprite = Assets.createSprite('fridge.png');
	sprite.x = x;
	sprite.y = y;

	var menuContainer = new PIXI.Container();

	for(i = 0; i < config.fridge.drinks.length; i++){
		var menuElement = Assets.createSprite(config.fridge.drinks[i].imageSource);
		menuElement.scale.x = 0.5;
		menuElement.scale.y = 0.5;
		menuElement.x = (i + 2) * 50;
		menuContainer.addChild(menuElement);
	}

	sprite.on('click', showMenu);

	function showMenu(){
		sprite.addChild(menuContainer);
	}
	
	this.getSprite = function(){
		return sprite;
	}

	sprite.interactive = true;
	sprite.buttonMode = true;

}