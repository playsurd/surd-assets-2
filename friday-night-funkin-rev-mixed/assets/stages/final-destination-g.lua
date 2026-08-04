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
	makeLuaSprite('final-background', 'final-background', -600, -100);
	setScrollFactor('final-background', 0.7, 0.7);
	
	makeLuaSprite('final-glow', 'final-glow', -600, -100);
	setScrollFactor('final-glow', 0.8, 0.8);
	scaleObject('final-glow', 0.8, 0.8);

	makeLuaSprite('final-arena', 'final-arena', -600, -300);
	setScrollFactor('final-arena', 1, 1);
	scaleObject('final-arena', 1, 1);

	addLuaSprite('final-background', false);
	addLuaSprite('final-glow', false);
	addLuaSprite('final-arena', false);
end

function opponentNoteHit()
    health = getProperty('health')
    if getProperty('health') > 0.1 then
        setProperty('health', health- 0.015);
    end
end