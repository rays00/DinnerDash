function Assets(){
	

}


Assets.createSprite = function(imageName){
	var texture = new PIXI.Texture.fromImage(imageName);
	var sprite = new PIXI.Sprite(texture);
	sprite.name = imageName;
	return sprite;
}

Assets.createTableArea = function(startX, startY, width, height){
	var eachTableArea = new PIXI.Graphics();
	eachTableArea.lineStyle(2, 0xFF00FF, 0);
	eachTableArea.beginFill(0x144d07, 0.025);
	eachTableArea.drawRoundedRect(startX, startY, width, height, 15);
	eachTableArea.endFill();
	
	return eachTableArea;
}