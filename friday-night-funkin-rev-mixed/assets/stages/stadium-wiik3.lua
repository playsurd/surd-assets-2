local xx = 750;
local yy = 450;
local xx2 = 900;
local yy2 = 460;
local ofs = 45;
local followchars = true;
local del = 0;
local del2 = 0;
function onCreate()
    -- background shit
    makeLuaSprite('1arenastage', 'stadium/1arenastage', -600, -300);
    setScrollFactor('1arenastage', 1, 1);

    makeLuaSprite('2arenaring', 'stadium/2arenaring', -600, -300);
    setScrollFactor('2arenaring', 0.9, 0.9);

    makeLuaSprite('4arenaringback', 'stadium/4arenaringback', -600, -300);
    setScrollFactor('4arenaringback', 0.8, 0.8);

    makeLuaSprite('5galaxy', 'stadium/5galaxy', -400, -300);
	setScrollFactor('5galaxy', 0.6, 0.6);
    
    makeAnimatedLuaSprite('Crowd_Bump','Crowd_Bump',-600, -300)addAnimationByPrefix('Crowd_Bump','dance','Crowd Bump CrowedDance',6,true)
    setScrollFactor('Crowd_Bump', 0.8, 0.8);

    addLuaSprite('5galaxy', false);
    addLuaSprite('4arenaringback', false);
    addLuaSprite('Crowd_Bump', false);
    addLuaSprite('2arenaring', false);
    addLuaSprite('1arenastage', false);
end

function onBeatHit()
    if curBeat % 1 == 0 then
        objectPlayAnimation('Crowd_Bump','dance',false)
    end
end

function onCreatePost()
    setProperty('boyfriend.color', getColorFromHex('ffa4af'))
    setProperty('dad.color', getColorFromHex('ffa4af'))
    setProperty('gf.color', getColorFromHex('ffa4af'))
end

function onUpdate()
	if del > 0 then
		del = del - 1
	end
	if del2 > 0 then
		del2 = del2 - 1
	end
    if followchars == true then
        if mustHitSection == false then
            if getProperty('dad.animation.curAnim.name') == 'singLEFT' then
                triggerEvent('Camera Follow Pos',xx-ofs,yy)
            end
            if getProperty('dad.animation.curAnim.name') == 'singRIGHT' then
                triggerEvent('Camera Follow Pos',xx+ofs,yy)
            end
            if getProperty('dad.animation.curAnim.name') == 'singUP' then
                triggerEvent('Camera Follow Pos',xx,yy-ofs)
            end
            if getProperty('dad.animation.curAnim.name') == 'singDOWN' then
                triggerEvent('Camera Follow Pos',xx,yy+ofs)
            end
            if getProperty('dad.animation.curAnim.name') == 'singLEFT-alt' then
                triggerEvent('Camera Follow Pos',xx-ofs,yy)
            end
            if getProperty('dad.animation.curAnim.name') == 'singRIGHT-alt' then
                triggerEvent('Camera Follow Pos',xx+ofs,yy)
            end
            if getProperty('dad.animation.curAnim.name') == 'singUP-alt' then
                triggerEvent('Camera Follow Pos',xx,yy-ofs)
            end
            if getProperty('dad.animation.curAnim.name') == 'singDOWN-alt' then
                triggerEvent('Camera Follow Pos',xx,yy+ofs)
            end
            if getProperty('dad.animation.curAnim.name') == 'idle-alt' then
                triggerEvent('Camera Follow Pos',xx,yy)
            end
            if getProperty('dad.animation.curAnim.name') == 'idle' then
                triggerEvent('Camera Follow Pos',xx,yy)
            end
        else

            if getProperty('boyfriend.animation.curAnim.name') == 'singLEFT' then
                triggerEvent('Camera Follow Pos',xx2-ofs,yy2)
            end
            if getProperty('boyfriend.animation.curAnim.name') == 'singRIGHT' then
                triggerEvent('Camera Follow Pos',xx2+ofs,yy2)
            end
            if getProperty('boyfriend.animation.curAnim.name') == 'singUP' then
                triggerEvent('Camera Follow Pos',xx2,yy2-ofs)
            end
            if getProperty('boyfriend.animation.curAnim.name') == 'singDOWN' then
                triggerEvent('Camera Follow Pos',xx2,yy2+ofs)
            end
	    if getProperty('boyfriend.animation.curAnim.name') == 'idle' then
                triggerEvent('Camera Follow Pos',xx2,yy2)
            end
        end
    else
        triggerEvent('Camera Follow Pos','','')
    end
    
end
function opponentNoteHit()
    health = getProperty('health')
    if getProperty('health') > 0.1 then
        setProperty('health', health- 0.0085);
    end
end