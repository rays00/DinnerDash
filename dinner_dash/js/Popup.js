var popupOkClicked; 

function Popup(w,h){

	var sprite = new PIXI.Sprite();

	sprite.pivot.x = w / 2;
	sprite.pivot.y = h / 2;

	var graphics = new PIXI.Graphics();
	graphics.lineStyle(2, 0xFF00FF, 1);
	graphics.beginFill(0xFFFFFF, 1);
	graphics.drawRoundedRect(0, 0, w, h, 15);
	graphics.endFill();

	const style = new PIXI.TextStyle({
    	fill: "blue",
    	fontFamily: "Verdana",
    	fontSize: 21
	});

	var text = new PIXI.Text('', style);
	text.x = 5;

	var okButton = Assets.createSprite('images/yes.png');
	okButton.scale.x = 0.5;
	okButton.scale.y = 0.5;
	okButton.y = 50;
	okButton.x = 5;

	var noButton = Assets.createSprite('images/no.png');
	noButton.x = 150;
	noButton.scale.x = 0.5;
	noButton.scale.y = 0.5;
	noButton.y = 50;

	noButton.interactive = true;
	noButton.buttonMode = true;

	okButton.interactive = true;
	okButton.buttonMode = true;

	okButton.on('click', okClicked);

	noButton.on('click', hide);

	function okClicked(){
		if(popupOkClicked != null){
			hide();
			popupOkClicked();
		}	
	}

	function hide(){
		TweenLite.to(sprite.scale, 0.1, { ease: Elastic.easeNone, x: 0.1, y: 0.1, onComplete: removePopup});
	}

	function removePopup(){
		sprite.parent.removeChild(sprite);
	}

	sprite.addChild(graphics);
	sprite.addChild(text);
	sprite.addChild(okButton);
	sprite.addChild(noButton);


	this.show = function(parent, textToShow){
		sprite.x = parent.width / 2;
		sprite.y = parent.height / 2;
		sprite.scale.x = 0.5;
		sprite.scale.y = 0.5;
		TweenLite.to(sprite.scale, 0.5, { ease: Elastic.easeOut.config(1, 0.3), x: 1, y: 1 });
		parent.addChild(sprite);
		text.text = textToShow;
	}

}


Popup.createPopup = function(parent, textToShow){
	var popup = new Popup(200, 100);
	popup.show(parent, textToShow);

}
