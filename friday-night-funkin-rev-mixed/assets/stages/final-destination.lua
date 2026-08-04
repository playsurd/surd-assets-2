local xx = 550;
local yy = 450;
local xx2 = 800;
local yy2 = 450;
local xx3 = 300;
local yy3 = 340;
local ofs = 30;
local followchars = true;
local del = 0;
local del2 = 0;
function onCreate()
	makeLuaSprite('wiik2-background', 'wiik2-background', -600, -100);
	setScrollFactor('wiik2-background', 0.7, 0.7);
	
	makeLuaSprite('wiik2-sun', 'wiik2-sun', -500, -200);
	setScrollFactor('wiik2-sun', 0.8, 0.8);
	scaleObject('wiik2-sun', 0.8, 0.8);

	makeLuaSprite('wiik2-buildings', 'wiik2-buildings', -600, -300);
	setScrollFactor('wiik2-buildings', 0.9, 0.9);
	scaleObject('wiik2-buildings', 1, 1);

	makeLuaSprite('wiik2-arena', 'wiik2-arena', -600, -300);
	setScrollFactor('wiik2-arena', 1, 1);
	scaleObject('wiik2-arena', 1, 1);

	makeAnimatedLuaSprite('gf','gf_revmix-wiik2', 400, 60)addAnimationByPrefix('gf','dance','GF Dancing Beat',24,true)
	setScrollFactor('gf', 1, 1);

	addLuaSprite('wiik2-background', false);
	addLuaSprite('wiik2-sun', false);
	addLuaSprite('wiik2-buildings', false);
	addLuaSprite('wiik2-arena', false);
	addLuaSprite('gf', false);
end

function opponentNoteHit()
    health = getProperty('health')
    if getProperty('health') > 0.1 then
        setProperty('health', health- 0.01);
    end
end