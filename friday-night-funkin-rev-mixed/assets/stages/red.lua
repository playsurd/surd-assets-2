function onCreate()
	-- background shit
	makeLuaSprite('red', 'red', -600, -200);
	setScrollFactor('red', 0.9, 0.9);

	addLuaSprite('red', false);
	close(true); --For performance reasons, close this script once the stage is fully loaded, as this script won't be used anymore after loading the stage
end