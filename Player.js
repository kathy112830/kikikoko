Player = function(scene, x, y)
{
	this.speed = 5000;
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

		if (!this.keys.right.isDown && !this.keys.left.isDown && !this.keys.up.isDown && !this.keys.down.isDown)
		{
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = 0;
		}

		if (this.keys.up.isDown)
		{
			this.sprite.body.velocity.y = -(this.speed * delta);
		}

		if (this.keys.down.isDown)
		{
			this.sprite.body.velocity.y = +(this.speed * delta);
		}
	}
}