function Shop(config){

	var container = new PIXI.Container();

	var graphics = new PIXI.Graphics();

	var quitButton;
	var instance = this;

	container.x = window.innerWidth / 5;
	container.y = window.innerHeight / 5;

	graphics.lineStyle(2, 0xFF00FF, 1);
	graphics.beginFill(0xFFFFFF, 1);
	graphics.drawRoundedRect(0, 0, 3 * (window.innerWidth / 5), 2 * (window.innerHeight / 5), 15);
	graphics.endFill();

	container.addChild(graphics);

	for(i = 0; i < config.items.length; i++){
		var element = new ShopElement(config.items[i], i * 150);
		container.addChild(element.getSprite());
	}
	
	function createQuitButton(){
		quitButton = Assets.createSprite(images + 'x.png');
		container.addChild(quitButton);
		quitButton.interactive = true;
		quitButton.buttonMode = true;
		quitButton.on('click',instance.hide);
		quitButton.x = 3 * (window.innerWidth / 5) - 25;
		quitButton.y = 5;
	}

	this.getSprite = function(){
		return container;
	}

	this.show = function(){
		app.stage.addChild(container);
		container.interactive = true;
		createQuitButton();
	}

	this.hide = function(){
		app.stage.removeChild(container);
	}


}