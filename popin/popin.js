
const page = document.querySelector('html')
const corps = document.querySelector('body');
/*
const basedef = "data:image/gif;base64,"
//const person = chrome.runtime.getURL('images/person.gif')
let changeHTML = () => {
  corps.innerHTML += `<div id="blur"></div>
<div class="popup-content" id="customPopup">
  <img class="icon" src=${basedef}${person}>
  <h2>Finally!!</h2>
  <p>
    Good job, it's time for a walk!<br> 
    Take a break, you deserve it 😉
  </p>
  <button id="closePopin" class="dismiss">Close</button>
</div>`;
}



// function showPopup() {
//     const popup = document.createElement('div');
//     popup.id = 'customPopup';
//     console.log("id:",popup.id);
//     //document.body.appendChild(popup); 
//     popup.innerHTML = '<div class="popup-content" id="close"><i class="fa-solid fa-check"></i><lord-icon src="https://cdn.lordicon.com/yqpvgvgs.json" trigger="loop" state="loop-cycle" style="width:90px; height:90px"></lord-icon><h2>Finally!!</h2><p>Good job, it s time for a break!<br> Take break, you deserve it 😉</p><button onclick="closePopup()" class="dismiss">Close</button></div>';
//   }

function closePopup() {
  const popup = document.getElementById('customPopup');
  if (popup) {
    popup.style.display = 'none';
  }
}

setTimeout(buttonClose, 6000);
setTimeout(changeHTML, 5000);

*/
function blur() {
  corps.style.filter = "blur(10px)"
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === request.message) {
      // Faites quelque chose avec le message reçu dans le script de contenu
      console.log("Message reçu dans content.js depuis popup.js", request.message);
      setTimeout(blur, request.message * 1000)//*60 pour convertir en minutes
  }
});