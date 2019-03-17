var tableCursor;

function GameManager(){
	

}



GameManager.installWaiterBoots = function(config){
	if(!waiter.hasBoots()){
		if(config.price <= cash.getCash()){
			waiter.addBoots(config);
			cash.addCash( - config.price);
		}
		else {
			Popup.createPopup(shop.getSprite(),"This costs " + config.price + " $!");
		}
	}
	else {
		Popup.createPopup(shop.getSprite(),"You already have \n a pair of boots.");
	}
}

GameManager.placeFurniture = function(){
	if(canPlaceFurniture){
		app.stage.addChild(furnitureObject);
		canPlaceFurniture = false;
	}
}

GameManager.moveCursor = function(e){
	tableCursor.x = e.data.global.x;
	tableCursor.y = e.data.global.y;
}

GameManager.setCursor = function(imageSource){
	tableCursor = Assets.createSprite(imageSource);
	tableCursor.alpha = 0.6;
	tableCursor.x = globalMouseX;
	tableCursor.y = globalMouseY;
	tableCursor.scale.x = 1;
	tableCursor.scale.y = 1;
	app.stage.on('mousemove', GameManager.moveCursor);
	app.stage.addChild(tableCursor);
}

GameManager.unsetCursor = function(){
	if(tableCursor){
		app.stage.removeChild(tableCursor);
	}
	app.stage.off('mousemove', GameManager.moveCursor);
}

GameManager.placeNewFurniture = function(config){
	if(config.price <= cash.getCash()){
		canPlaceFurniture = true;
		furnitureToPlace = config.imageSource;
		GameManager.setCursor(config.imageSource);
		cash.addCash( - config.price);
		shop.hide();
	}
	else {
		Popup.createPopup(shop.getSprite(),"This costs " + config.price + " $!");
	}
}