function Clock(time){

	var graphics = new PIXI.Graphics();
	var i;

	graphics.lineStyle(0);
	graphics.beginFill(0xFFFFFF, 1);
	graphics.drawCircle(0, 0, 10);
	graphics.endFill();

	var startTime = 0;
	var updateClockInterval;
	var startTime;
	var eatTime = time;
	
	function drawArc(startAngle, stopAngle){
		eachStep = (stopAngle - startAngle) / 100;
		graphics.lineStyle(0, 0, 0);
		graphics.beginFill(0x00FF00, 1);
		graphics.moveTo(0, 0);
		for(i = startAngle; i < stopAngle; i = i + eachStep){
			var x = Math.cos(i) * 10;
			var y = Math.sin(i) * 10;
			graphics.lineTo(x, y);
		}
		x = Math.cos(stopAngle) * 10;
		y = Math.sin(stopAngle) * 10;
		graphics.lineTo(x,y);

	}

	this.getSprite = function(){
		return graphics;
	}

	this.hide = function(){
		graphics.parent.removeChild(graphics);	
	}

	this.setPosition = function(x, y){
		graphics.x = x;
		graphics.y = y;
	}

	function updateClock(){
			var time = (new Date).getTime();
			var percentage = (time - startTime) / eatTime;
			if(percentage > 1){
				percentage = 1;
			}
			drawArc(0, percentage * 2 * Math.PI);
		}

	this.start = function(){
		startTime = (new Date).getTime();
		updateClockInterval = setInterval(updateClock, 50);
	}

	this.stop = function(){
		clearInterval(updateClockInterval);
	}

}