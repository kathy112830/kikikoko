var gameConf = {
	key: "Game",
	physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 90 }
        }
    }
}

var coins = [];
var player;

var GameScene = new Phaser.Scene(gameConf);

//called before the scene is loaded
GameScene.preload = function() {}

//called as soon as the scene is created
GameScene.create = function() {
 	//create our player
 	player = new Player(this, 0, 0);
 	console.log(player);

	//create and add our map
	this.CreateMap(this);

	//find Player Object in Tiled
 	var spawnPoint = map.findObject("Objects", obj => obj.name === "Player");
 	player.sprite.x = spawnPoint.x;
 	player.sprite.y = spawnPoint.y;
 	player.sprite.setDepth(10);

 	//set the collisions layer
 	platformsLayer.setCollisionBetween(1, 50);
 	this.physics.add.collider(player.sprite, platformsLayer);

 	//set the camera to follow the player
	var camera = this.cameras.main;
  	camera.startFollow(player.sprite);
  	camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


	//create all our coins from the map
 	map.objects[0].objects.forEach(function(item, index, array){
 			if (item.name == "Coin")
              coins.push(GameScene.physics.add.image(item.x, item.y, "img_coin")
              	.setDepth(10)
              	.setScale(0.5));
        });
	//enable physics
	coins.forEach(function(item, index, array)
	{
		GameScene.physics.add.collider(item, platformsLayer);
    	//add collision detection
		GameScene.physics.add.overlap(player.sprite, item, GameScene.CoinCollected);
    });

    //enable the end zone
    var endZone = map.findObject("Objects", obj => obj.name === "EndZone");
    var endTrigger = GameScene.physics.add.image(endZone.x + endZone.width / 2, endZone.y + endZone.height / 2);
    endTrigger.width = endZone.width;
    endTrigger.height = endZone.height;
    console.log(endTrigger);
    endTrigger.body.allowGravity = false;
    this.physics.add.overlap(player.sprite, endTrigger, function()
    {
    	soundTrack.stop();
    	GameScene.scene.start("Boot");
    });
}

//called every frame, time is the time when the update method was called, and delta is the time in milliseconds since last frame
GameScene.update = function(time, delta) {
	player.Update(delta / 1000);

	// When mouse is down, put a colliding tile at the mouse location
	const pointer = this.input.activePointer;
	const worldPoint = pointer.positionToCamera(this.cameras.main);
	if (pointer.isDown)
	{
	  const tile = platformsLayer.putTileAtWorldXY(52, worldPoint.x, worldPoint.y);
	  tile.setCollision(true);
	}
}

GameScene.CreateMap = function(scene)
{
	//create map from tileset
 	map = scene.make.tilemap({ key: "map" });
 	tileset = map.addTilesetImage("Tileset", "tiles");
	//create our map in game
	backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
 	platformsLayer = map.createDynamicLayer("Platforms", tileset, 0, 0);
 	platformsLayer.setCollisionByProperty({ collides: true });
}


//we end the level if the player is colliding with any of the monsters
GameScene.CoinCollected = function(first, second)
{
	second.destroy();
	console.log("Coin collected!")
};