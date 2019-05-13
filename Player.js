Player = function(scene, x, y)
{
	this.speed = 2500;
	this.jumpSpeed = 100;

	this.sprite = scene.physics.add.sprite(x, y, "img_player", 0);

	this.keys = scene.input.keyboard.createCursorKeys();

	this.Update = function(delta)
	{
		if (this.keys.left.isDown)
		{
			this.sprite.body.velocity.x = -(this.speed * delta);
		}

		if (this.keys.right.isDown)
		{
			this.sprite.body.velocity.x = this.speed * delta;
		}

		if (!this.keys.right.isDown && !this.keys.left.isDown)
		{
			this.sprite.body.velocity.x = 0;
		}

		if (this.keys.up.isDown)
		{
			if (this.sprite.body.onFloor())
				this.sprite.body.velocity.y -= this.jumpSpeed;
		}
	}
}