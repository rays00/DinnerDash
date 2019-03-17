function ShopElement(config, positionX){

	var imageSource = config.imageSource;
	var title = config.productName + '\n' + config.description;
	var cost = config.price;
	var duration = config.duration;

	if(duration != 0){
		duration = duration / 1000 + " seconds";
	}
	else {
		duration = "for unlimited time";
	}

	var element = Assets.createSprite(imageSource);
	element.x = positionX;
	element.y = 60;

	var priceTag = Assets.createSprite('images/pricetag.png');
	priceTag.scale.x = 0.6;
	priceTag.scale.y = 0.6;
	element.addChild(priceTag);

	var style = new PIXI.TextStyle({
    	fontFamily: 'Arial',
    	fontSize: 15
	});

	var popup = new Popup(200, 100);

	function confirmBuy(){
		popupOkClicked = okClicked;
		popup.show(element.parent, 'Are you sure?');
	}

	function okClicked(){
		switch(config.type){
			case "boots":
				GameManager.installWaiterBoots(config);
				break;
			case "furniture":
				GameManager.placeNewFurniture(config);
				break;
		}	
	}

	var elementTitle = new PIXI.Text(title + "\n"  + duration, style);

	
	element.addChild(elementTitle);
	elementTitle.y = - 55;
	elementTitle.x = 10;

	this.getSprite = function(){
		return element;
	}

	priceTagText(cost);

	function priceTagText(cost){
		var price = new PIXI.Text(cost + '$');
		price.anchor.x = 0.5;
		price.anchor.y = 0.5;
		priceTag.addChild(price);
		price.x = 40;
		price.y = 40;
	}

	element.interactive = true;
	element.buttonMode = true;
	element.on('click', buyProduct);

	function buyProduct(){
		confirmBuy();
	}

}