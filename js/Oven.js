	function Oven(){

		var bubble = new Bubble(40,-100,'Food done');

		var instance = this;

		var texture = new PIXI.Texture.fromImage(images + 'oven.png');
		var foodReadyTexture = new PIXI.Texture.fromImage(images + 'ovenDone.png');
		var sprite = new PIXI.Sprite(texture);
		var food = false;
		var isCooking = false;
		var cookTimer;
		var foodCooked;
		var foodDone;

		var menuOpened = false;

		sprite.interactive = true;
		sprite.buttonMode = true;

		sprite.x = bar.x - 200;
		sprite.y = bar.y - 50;
		
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;

		spriteWidth = 96;
		spriteHeight = 96;

		function setGrid(){
			var pozX = Math.round(sprite.x / 25 - 2);
			var pozY = Math.round(sprite.y / 25 - 3);
			var width = Math.round(spriteWidth / 25);
			var height = Math.round(spriteHeight / 25);
			for(var j = pozY + 1; j < pozY + width + 1; j++){
				for(var k = pozX; k < pozX + height; k++){
					grid.setWalkableAt(j, k, false);
				}
			}
		}

		setGrid();

		this.getSprite = function(){
			return sprite;
		}

		sprite.on('click',ovenOnClick);

		function ovenOnClick(){
			if(! waiter.isAtTheOven()){
				waiter.walkToOven(instance);
			}
			else {
				waiter.takeFromOven();
			}
		}


		this.startCooking = function(foodType){
			foodCooked = foodType;
			isCooking = true;
			cookTimer = new Clock(2000);
			cookTimer.setPosition(50,-40);
			sprite.addChild(cookTimer.getSprite());
			cookTimer.start();
			setTimeout(generateFood, 2000);
			menu.hide();
		}

		this.getFoodCooked = function(){
			return foodCooked;
		}

		this.checkIfFoodDone = function(){
			if(menuOpened == false && food == false && isCooking == false){
				menu.show();
			}
			if(food == true) {
				takeFood();
			}
		}

		function generateFood(){
			isCooking = false;

			bubble.changeText("");
			foodDone = Assets.createSprite(foodCooked);

			foodDone.x = 30;
			foodDone.y = 25;
			foodDone.scale.x = 0.6;
			foodDone.scale.y = 0.6;

			bubble.getSprite().addChild(foodDone);
			bubble.show(sprite);
			food = true;
			sprite.setTexture(foodReadyTexture);
			cookTimer.stop();
			cookTimer.hide();
		}

		function takeFood(){
			bubble.getSprite().removeChild(foodDone);
			waiter.takePlate();
			food = false;
			sprite.setTexture(texture);
			bubble.hide(sprite);
		}



	}

	