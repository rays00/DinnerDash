function TableArea(i, j, tableWidth, tableHeight){

	var sprite = Assets.createTableArea(0, 0, tableWidth, tableHeight);

	this.getSprite = function(){
		return sprite;
	}

	var table = new Table(tableWidth / 2, tableHeight / 2);
	sprite.addChild(table.getSprite());

	

}