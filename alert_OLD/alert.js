const button = document.getElementById('closePopin');
button.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'closeAll' });
});

const image = document.getElementById('image')
image.src = "data:image/gif;base64," + person