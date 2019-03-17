function Path(sprite, on_complete){

	var instance = this;
	var onComplete = on_complete;

	function goToPoint(i, j, time, path){
		TweenLite.to(sprite, time, { ease: Power0.easeNone, y: i, x: j, onComplete: instance.walkAlongPath, onCompleteParams: [time, path]});
	}

	this.walkAlongPath = function(time, path){
		if(path.length){
			var point = path.shift();
			goToPoint(point[0] * 25, point[1] * 25, time, path);
		}
		else {
			if(onComplete != null){
				onComplete();
			}
		}
	}



}