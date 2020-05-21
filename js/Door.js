function Door(){

	var sprite = Assets.createSprite(images + 'door.png');

	sprite.x = bar.x + 450;
	sprite.y = bar.y;

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	this.getSprite = function(){
		return sprite;
	}

}