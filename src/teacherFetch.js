/**
 * Infinite Loop Protection
 * Detects and stops fetch() calls in infinite re-render loops
 */
const normalFetch = window.fetch;
const lastFetch = [{ time: Date.now() }];

const errorMessage = `fetch() will stop working now, because the last 10 fetches were made in less than 15 milliseconds.
The code is still in an infinite re-render/infinite loop, and that will heat up your CPU.
To stop that, open Developer Tools and Reload ASAP. Then the code will pause. Check the Call Stack!
Look for useEffect() with no second parameter, or for state changes during render, since that triggers re-render.
`;

window.fetch = function (url, params) {
    lastFetch.push({ url, time: Date.now() });
    
    if (lastFetch.length > 10 && lastFetch.slice(-1)[0].time - lastFetch.slice(-10)[0].time < 15) {
        const fetches = lastFetch.slice(-10).map(x => x.url + "\n").join("");
        console.warn("Execution will now pause because the last 10 fetches were made in less than 15 milliseconds. URLs below.\n" +
            "Check the **Call Stack** to see where the offending call comes from!\n " + fetches);
        document.body.innerText = errorMessage + fetches;
        throw new Error(errorMessage + fetches);
    }
    
    return normalFetch(url, params);
};

// Remove React Router future flag warnings
const oldConsoleWarn = console.warn;
console.warn = function (...params) {
    if (!params?.find(p => p?.indexOf?.("React Router Future Flag Warning") !== -1)) {
        oldConsoleWarn(...params);
    }
};

console.log("DH2642 fetch() infinite re-render protection installed");