chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ totalTime: 0, activityStartTime: null });
});

// est-ce que ça ne serait pas plutôt un chrome.runtime.onStartup  ? 
//(event déclenché lorsque Chrome démarre plutôt que qd on ouvre une fenêtre)
chrome.windows.onCreated.addListener((activeInfo) => {
    chrome.storage.local.set({ activityStartTime: new Date().getTime() });
    chrome.action.setBadgeBackgroundColor({ color: [134, 206, 233, 255] });
    chrome.action.setBadgeText({ text: '0' });
});

chrome.windows.onRemoved.addListener(() => {
    chrome.storage.local.set({ activityStartTime: null });
})

function popin() {
    chrome.windows.create({
        url: "alert_OLD/alert.html",
        type: "popup",
        width: 420,
        height: 380,
        top: 180,
        left: 420
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'closeAll') {
        // Fermer la fenêtre pop-up
        chrome.windows.getCurrent(function (currentWindow) {
            chrome.windows.remove(currentWindow.id);
        });

        // Fermer tous les onglets
        chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.curseurValue) {
        // Utilisez la valeur du curseur dans un setTimeout
        console.log("Curseur value received in background script:", message.curseurValue);
        setTimeout(popin, message.curseurValue * 1000); // rajouter *60 pour convertir en minutes
    }
});

