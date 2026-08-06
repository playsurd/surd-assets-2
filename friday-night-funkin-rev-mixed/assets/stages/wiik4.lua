function onCreate()
	makeLuaSprite('sky', 'Wiik4/SKY', -775, -200);
	setScrollFactor('sky', 0.2, 0.2);
	scaleObject('sky', 1, 1);
    addLuaSprite('sky', false);

    makeLuaSprite('moon', 'Wiik4/MOON', -775, -200);
	setScrollFactor('moon', 0.2, 0.2);
	scaleObject('moon', 1, 1);
    addLuaSprite('moon', false);

    makeLuaSprite('water', 'Wiik4/WATER', -775, -200);
	setScrollFactor('water', 0.5, 0.5);
	scaleObject('water', 1, 1);
    addLuaSprite('water', false);

    makeLuaSprite('wawarock1', 'Wiik4/WAWAROCK1', -775, 200);
	setScrollFactor('wawarock1', 0.8, 0.8);
	scaleObject('wawarock1', 1, 1);
    addLuaSprite('wawarock1', false);

    makeLuaSprite('wawarock2', 'Wiik4/WAWAROCK2', -775, 200);
	setScrollFactor('wawarock2', 0.8, 0.8);
	scaleObject('wawarock2', 1, 1);
    addLuaSprite('wawarock2', false);

    makeLuaSprite('Lava', 'Wiik4/LAVA', -775, 400);
	setScrollFactor('Lava', 1, 1);
	scaleObject('Lava', 1, 1);
    addLuaSprite('Lava', false);

    makeLuaSprite('FloatingRock1', 'Wiik4/RIGHTROCK', -775, 600);
	setScrollFactor('FloatingRock1', 0.8, 0.8);
	scaleObject('FloatingRock1', 1, 1);
    addLuaSprite('FloatingRock1', false);

    makeLuaSprite('FloatingRock2', 'Wiik4/LEFTROCK', -775, 600);
	setScrollFactor('FloatingRock2', 0.8, 0.8);
	scaleObject('FloatingRock2', 1, 1);
    addLuaSprite('FloatingRock2', false);
    
    makeLuaSprite('platform', 'Wiik4/PLATFORM', -775, 400);
	setScrollFactor('platform', 1, 1);
	scaleObject('platform', 1, 1);
    addLuaSprite('platform', false);

    makeLuaSprite('frontrock', 'Wiik4/FRONTROCK', -775, 250);
	setScrollFactor('frontrock', 0.9, 0.9);
	scaleObject('frontrock', 1, 1);
    addLuaSprite('frontrock', false);
end

function onUpdate(elapsed)    if curStep == 0 then

    started = true

end

songPos = getSongPosition()

local currentBeat = (songPos/5000)*(curBpm/60)

doTweenY('FloatingRock1', 'FloatingRock1', 200 - -100*math.sin((currentBeat+12*12)*math.pi), -2)

doTweenY('FloatingRock2', 'FloatingRock2', 200 - -100*math.sin((currentBeat+12*12)*math.pi), -1)

end

function opponentNoteHit()
    health = getProperty('health')
    if getProperty('health') > 0.1 then
        setProperty('health', health- 0.009);
    end
end