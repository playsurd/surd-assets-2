/**
 * CRITICAL PATCH: Prevents 'Uncaught TypeError: locI18next.init is not a function'
 * This is designed to completely stub out the missing I18N library functions 
 * so the engine can proceed past the initialization crash.
 */

// 1. Ensure the global object exists
if (typeof window.locI18next === 'undefined') {
    window.locI18next = {};
}

// 2. Force definition of all critical I18N methods the engine might touch
// This prevents the engine from crashing on line 448 of system.js
locI18next.init = function() {
    console.warn("locI18next.init stubbed. Proceeding past crash...");
};

locI18next.load = function(data, cb) {
    console.warn("locI18next.load stubbed.");
    // Call the callback immediately so the engine doesn't hang waiting for the load to finish.
    if (typeof cb === 'function') {
        cb();
    }
};

// If the engine tries to fetch a translation key, return the key itself.
locI18next.t = function(key) {
    console.warn("locI18next.t stubbed. Returning key:", key);
    return key; 
};

// 3. Optional: Define the underlying 'i18next' object if the code references it.
if (typeof window.i18next === 'undefined') {
    window.i18next = {
        init: function() {} 
    };
}