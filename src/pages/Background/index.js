
// ***********code for Keep live service worker***********
let lifeline;

keepAlive();

const currentTime = () => {
    var datetime = new Date().toLocaleString();
    return datetime;
}

chrome.runtime.onConnect.removeListener(() => { });

chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'keepAlive') {
        lifeline = port;
        setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
        // setTimeout(keepAliveForced, 60000); // 5 minutes minus 5 seconds
        port.onDisconnect.addListener(keepAliveForced);
    }
});

function keepAliveForced() {
    let data = lifeline ? lifeline.disconnect() : "";
    lifeline = null;
    keepAlive();
}

async function keepAlive() {
    if (lifeline) return;
    for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => chrome.runtime.connect({ name: 'keepAlive' }),
                // `function` will become `func` in Chrome 93+
            });
            chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
            return;
        } catch (e) { }
    }
    chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
    if (info.url && /^(file|https?):/.test(info.url)) {
        keepAlive();
    }
}

// ***********code for alive***********