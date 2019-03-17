var bubbleIdCounter = 0;

function Bubble(x, y, bubbleText){

	var sprite = Assets.createSprite(images + 'bubble.png');
	var text = new PIXI.Text(bubbleText,{fontFamily : 'Arial', fontSize: 17, fill : 0xff1010, align : 'center'});

	text.x = 25;
	text.y = 50;

	sprite.addChild(text);

	sprite.x = x;
	sprite.y = y;

	sprite.transform.scale.x = 0.6;
	sprite.transform.scale.y = 0.6;

	this.setTextPosition = function(x, y){
		text.x = x;
		text.y = y;
	}

	this.show = function(parent){
		parent.addChild(sprite);
	}

	this.hide = function(){
		if(sprite.parent){
			sprite.parent.removeChild(sprite);
		}
		else console.log("no parent");
	}

	this.getSprite = function(){
		return sprite;
	}

	this.changeText = function(message){
		text.text = message;
	}


}