function Cash(){

	var yourCash = 2000;
	var cashText = new PIXI.Text(yourCash,{fontFamily : 'Georgia, serif', fontSize: 24, fill : 0x000000, align : 'center'});
	var sprite = Assets.createSprite(images + 'dollar.png');

	this.getText = function(){
		return cashText;
	}

	this.getSprite = function(){
		return sprite;
	}

	this.addCash = function(cash){
		yourCash += cash; 
		cashText.text = yourCash;
	}

	this.getCash = function(){
		return yourCash;
	}

	cashText.x = 35;
	cashText.y = 0.5;

}