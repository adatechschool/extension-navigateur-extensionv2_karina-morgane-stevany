let minutesBadges;
const curseur = document.querySelector("#curseur");
const output = document.querySelector(".curseur-output");
const next = document.getElementById("next");
const changeBreak = document.getElementById("changeBreak");

// Fonction pour sauvegarder la valeur du curseur dans le stockage local
function saveCurseurValue() {
    localStorage.setItem("curseurValue", curseur.value);
}

// Fonction pour récupérer la valeur du curseur depuis le stockage local
function getCurseurValue() {
    const savedValue = localStorage.getItem("curseurValue");
    return savedValue || curseur.value; // Utilise la valeur par défaut si aucune n'est trouvée dans le stockage local
}

// Initialisation de la valeur du curseur au chargement de la page
curseur.value = getCurseurValue();
output.textContent = curseur.value + " minutes";
next.textContent = "Next break in " + curseur.value + " minutes";

// Écouteur d'événement pour mettre à jour la valeur du curseur et sauvegarder dans le stockage local
curseur.addEventListener("input", function () {
    output.textContent = curseur.value + " minutes";
    saveCurseurValue();
});

// Écouteur d'événement pour changer la valeur du prochain break et sauvegarder dans le stockage local
changeBreak.addEventListener("click", function () {
    next.textContent = "Next break in " + curseur.value + " minutes";
    saveCurseurValue();
    chrome.runtime.sendMessage({ curseurValue: curseur.value })
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        
        // Envoyez un message au script de contenu actif dans l'onglet actuel
        chrome.tabs.sendMessage(activeTab.id, { message: curseur.value });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ curseurValue: curseur.value })
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        
        // Envoyez un message au script de contenu actif dans l'onglet actuel
        chrome.tabs.sendMessage(activeTab.id, { message: curseur.value });
    });
    updateCounter();
    // Mettre à jour le compteur toutes les secondes
    setInterval(updateCounter, 1000);
    // Mettre à jour le badge toutes les minutes
    setInterval(updateBadge, 60000);
});

function updateCounter() {
    chrome.storage.local.get(['totalTime', 'activityStartTime'], (result) => {
        const totalTime = result.totalTime || 0;
        const activityStartTime = result.activityStartTime;

        if (activityStartTime) {
            const stopTime = 11;
            const currentTime = new Date().getTime();
            const elapsedSeconds = (currentTime - activityStartTime) / 1000;
            const totalSeconds = totalTime + elapsedSeconds;
            console.log("total : ", totalSeconds)
            // if (totalSeconds > stopTime) {
            //     console.log("stop");
            //     affiche popup.html
            // } else {
            const counterElement = document.getElementById('counter');
            counterElement.textContent = formatTime(totalSeconds);
            // }
        }
    });
}


function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    minutesBadges = minutes;
    const seconds = Math.floor(totalSeconds % 60);
    const timing = `${minutes} minutes and ${seconds} seconds`;
    return timing;
}

const updateBadge = () => {
    console.log(minutesBadges);
    let minutesString = String(minutesBadges);
    chrome.action.setBadgeText({ text: minutesString });
}



