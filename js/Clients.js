	function Clients(x, y){
		
		var bubble = new Bubble(50, -100, "");

		var speed = 200;

		var instance = this;
		var sprite = Assets.createSprite(images + 'woman.png');
		var angry = Assets.createSprite(images + 'angry.png');
		angry.x = -20.5;
		angry.y = -80;
		angry.scale.x = 0.5;
		angry.scale.y = 0.5;

		var clientLeave = false;

		var isPositioned = false;
		var _hasEaten = false;
		var eatTimer = null;
		var currentTable = null;

		var happyTime = 36000;
		var leaveTime = 216000;

		var foodArray = [];
		foodArray.push(images + 'steak.png', images + 'french_fries.png', images + 'salad.png');
		var foodRequestedIndex = Math.round(Math.random() * 2);
		var foodRequested = Assets.createSprite(foodArray[foodRequestedIndex]);

		var startTime = 0;

		bubble.getSprite().addChild(foodRequested);
		foodRequested.x = 30;
		foodRequested.y = 30;
		foodRequested.scale.x = 0.6;
		foodRequested.scale.y = 0.6;

		var coins = Assets.createSprite(images + 'coins.png');
		coins.scale.x = 0.5;
		coins.scale.y = 0.5;

		sprite.x = x;
		sprite.y = y;

		sprite.interactive = true;
		sprite.buttonMode = true;

		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;

		function resetAngriness(){
			sprite.removeChild(angry);
			clearTimeout(angrinessCounter);
			clearTimeout(leaveCounter);
			angrinessCounter = setInterval(getAngry, happyTime);
		}

		function forgetAngriness(){
			clearTimeout(angrinessCounter);
			clearTimeout(leaveCounter);
		}

		var angrinessCounter = setTimeout(getAngry, happyTime);
		var leaveCounter;

		function getAngry(){
			leaveCounter = setTimeout(leaveAngry, leaveTime);
			sprite.addChild(angry);
		}

		function leaveAngry(){
			clientLeave = true;
			if(_hasEaten == true){
				currentTable.hideFood();
				bubble.hide();
			}
			if(_hasEaten == false && isPositioned == true){
				bubble.hide();
			}
			if(currentTable != null){
				currentTable.unsetOccupy();
			}
			instance.walkToDoor();
		}

		function actionAfterWalk(){
			if(clientLeave){
				removeClients();
				forgetAngriness();
			}
			else if(_hasEaten == false){
				showDialog();
				resetAngriness();
			}
		}

		sprite.on('mousedown', clientsOnClick);


		this.getFoodRequested = function(){
			return foodRequested;
		}

		function clientsOnClick(){
			clientsClick(instance);
		}

		function showDialog(){
			bubble.show(sprite);
		}

		this.getSprite = function(){
			return sprite;
		}

		function removeClients(){
			sprite.parent.removeChild(sprite);
		}

		this.pay = function(){
			sprite.addChild(coins);
			cashX = cash.getSprite().x;
			cashY = cash.getSprite().y;
			var coinsGPosition = coins.getGlobalPosition();
			app.stage.addChild(coins);
			coins.x = coinsGPosition.x;
			coins.y = coinsGPosition.y;
			TweenLite.to(coins, 1.5, { ease: Power0.easeNone, y: cashY, x: cashX, onComplete: prepareToLeave});
		}

		function prepareToLeave(){
			cash.addCash(3);
			app.stage.removeChild(coins);
			sendClientsHome();
		}

		function sendClientsHome(){
			clientLeave = true;
			instance.walkToDoor(door, actionAfterWalk);
		}

		this.checkFoodType = function(food){
			if(food.getType() === foodRequested.name){
				startToEat();
			}
			else {
				bubble.getSprite().removeChild(foodRequested);
				bubble.setTextPosition(10, 20);
				bubble.changeText("No!\n That's not\n what I want!");
				showDialog();
				currentTable.hideFood();
				setTimeout(function(){
					bubble.changeText("");
					bubble.getSprite().addChild(foodRequested);
				},3000);
			}
		}

		function startToEat(){
			resetAngriness();
			eatTimer = new Clock(5000);
			eatTimer.setPosition(50,-40);
			sprite.addChild(eatTimer.getSprite());
			eatTimer.start();
			setTimeout(eatFinished, 5000);
		}

		function eatFinished(){
			bubble.getSprite().removeChild(foodRequested);
			bubble.setTextPosition(25, 50);
			bubble.changeText("I'm done!");
			showDialog();
			_hasEaten = true;
			eatTimer.stop();
			eatTimer.hide();
		}

		this.hasEaten = function(){
			return _hasEaten;
		}

		this.walkToTable = function(table){
			if(isPositioned == false){
				isPositioned = true;
				currentTable = table;
			}
			walkTo(table, actionAfterWalk);

		}

		this.walkToDoor = function(){
			walkTo(door, actionAfterWalk);	
		}

		function walkTo(object, onComplete){
			var walkPath = new Path(sprite, onComplete);
			var objectPositionX = Math.round(object.getSprite().getGlobalPosition().x / 25);
			var objectPositionY = Math.round(object.getSprite().getGlobalPosition().y / 25 + 1);
			var gridBackup = grid.clone();
			var path = finder.findPath(Math.round(sprite.y / 25), Math.round(sprite.x / 25), objectPositionY, objectPositionX, gridBackup);
			distance = 25;
			time = distance / speed;
			walkPath.walkAlongPath(time, path);
			//drawGridCell(objectPositionX, objectPositionY);
		}

		this.checkIfPositioned = function() {
			return isPositioned;
		}
		
		this.hideDialog = function(){
			bubble.hide();
		}

	}

	
