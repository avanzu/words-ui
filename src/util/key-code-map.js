const keyCodes  = {
    'KEY_SPACE' : 32,
    'KEY_SPACE_ALT': 160,
    'KEY_ARROW_UP' : 38,
    'KEY_ARROW_DOWN' : 40,
    'KEY_ARROW_LEFT' : 37,
    'KEY_ARROW_RIGHT' : 39,
    'KEY_ENTER' : 13,
    'KEY_ESCAPE': 27,
    'KEY_F1' : 112,
    'KEY_F2' : 113,
    'KEY_F3' : 114,
    'KEY_F4' : 115,
};

const eventMap = {
    [keyCodes.KEY_SPACE]: 'space-pressed',
    [keyCodes.KEY_ESCAPE]: 'escape-pressed',
    [keyCodes.KEY_SPACE_ALT]: 'space-pressed',
    [keyCodes.KEY_ARROW_UP]: 'arrow-up-pressed',
    [keyCodes.KEY_ARROW_DOWN] : 'arrow-down-pressed',
    [keyCodes.KEY_ARROW_LEFT] : 'arrow-left-pressed',
    [keyCodes.KEY_ARROW_RIGHT] : 'arrow-right-pressed',
    [keyCodes.KEY_ENTER]: 'enter-pressed',
    [keyCodes.KEY_F1] : 'f1-pressed',
    [keyCodes.KEY_F2] : 'f2-pressed',
    [keyCodes.KEY_F3] : 'f3-pressed',
    [keyCodes.KEY_F4] : 'f4-pressed',
};

const hasModifier = function(event) {
    return (event.altKey || event.shiftKey || event.metaKey || event.ctrlKey );
};

const modifyEventName = function(event, baseEventName) {
    let modifiers = [];
    if(event.shiftKey) modifiers.push('shift');
    if(event.ctrlKey) modifiers.push('ctrl');
    if( event.altKey) modifiers.push('alt');
    if (event.metaKey) modifiers.push('meta');
    modifiers.push(baseEventName);
    return modifiers.join('-').trim();
};

export default { keyCodes, eventMap, hasModifier, modifyEventName }


