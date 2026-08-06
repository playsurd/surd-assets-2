function onCreate()
	-- background shit
	makeLuaSprite('screentime', 'screentime', -600, -200);
	setScrollFactor('screentime', 0.9, 0.9);

	addLuaSprite('screentime', false);

	close(true); --For performance reasons, close this script once the stage is fully loaded, as this script won't be used anymore after loading the stage
end