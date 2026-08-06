local blockAnim = {'blockLEFT', 'blockDOWN', 'blockUP', 'blockRIGHT'}

function goodNoteHit(membersIndex, noteData, noteType, isSustainNote)
    if noteType == 'BoxingNote' then
        characterPlayAnim('dad', blockAnim[noteData + 1], true)
        setProperty('dad.specialAnim', true)
    end
end

function opponentNoteHit(membersIndex, noteData, noteType, isSustainNote)
    if noteType == 'BoxingNote' then
        characterPlayAnim('boyfriend', blockAnim[noteData + 1], true)
        setProperty('boyfriend.specialAnim', true)
    end
end
