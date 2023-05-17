const clickEventHandler = () => {
  const isSelected = localStorage.getItem('isAllowed') ? true : false;
  if (isSelected) {
    localStorage.removeItem('isAllowed');
    chrome.storage.local.set({ isAllowed: false });
  } else {
    localStorage.setItem('isAllowed', true);
    chrome.storage.local.set({ isAllowed: true });
  }
  var element = document.querySelector(".toggle_container");
  element.classList.toggle("toggleSelected");

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "allowed", selected: !isSelected });
  });
}

const isAllowed = localStorage.getItem('isAllowed');

if (isAllowed) {
  let element = document.querySelector(".toggle_container");
  element.classList.toggle("toggleSelected");

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "allowed", selected: isAllowed ? true : false });
  });
}

const toggleObject = document.querySelector('.toggleWrap');
if (toggleObject) {
  toggleObject.addEventListener("click", clickEventHandler);
}

function checkUpdateAlert() {
  const ver = 0.1; // Current version

  fetch('https://ocm9425.tools/satStats/app-version.json')
    .then(response => response.json())
    .then(data => {
      if (data.version > ver) {
        const updateAlertDiv = document.querySelector('.update-alert');
        updateAlertDiv.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

checkUpdateAlert();

function fetchAdData() {
  fetch('https://ocm9425.tools/satStats/ad-data.json')
    .then(response => response.json())
    .then(data => {
      const adImage = document.createElement('img');
      adImage.src = data.img;
      adImage.addEventListener('click', () => {
        window.open(data.url, '_blank');
      });

      const adContainer = document.getElementById('ad');
      adContainer.innerHTML = '';
      adContainer.appendChild(adImage);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchAdData();
