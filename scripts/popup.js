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
  const ver = 0.5; // Current version

  fetch('https://ocm9425.tools/satStats/app-version.json')
    .then(response => response.json())
    .then(data => {
      if (data.version < ver) {
        const updateAlertDiv = document.querySelector('.update-alert');
        if (updateAlertDiv) {
          updateAlertDiv.style.display = 'none';
        }
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

function fetchGasStats() {
  fetch('https://mempool.space/api/v1/fees/recommended')
    .then(response => response.json())
    .then(data => {
        const fastestFee = data.fastestFee;
        const halfHourFee = data.halfHourFee;
        const hourFee = data.hourFee;
        const gasStatsDiv = document.getElementById('gasStats');
        gasStatsDiv.innerHTML = `Fastest Fee: <strong>${fastestFee} s/vB</strong><br>Half Hour Fee: <strong>${halfHourFee} s/vB</strong><br>Hour Fee: <strong>${hourFee} s/vB</strong>`;
    })
  .catch(error => {
      console.log('Error:', error);
  });

  fetch('https://blockchain.info/q/eta')
  .then(response => response.text())
  .then(text => {
    const seconds = parseInt(text);
    let formattedTime;
    if (seconds >= 120) {
      const etaBlock = document.getElementById('etaBlock');
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      formattedTime = seconds.toFixed(1);
    }
    if (seconds < 0) {
      etaBlock.innerHTML = `Block Overdue: ${formattedTime}s`;
    } else {
      if (seconds >= 120) {
        etaBlock.innerHTML = `Next Block ETA: ${formattedTime}`;
      } else {
        etaBlock.innerHTML = `Next Block ETA: ${formattedTime}s`;
      }
    } 
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

fetchGasStats();

document.getElementById('refreshLink').addEventListener('click', fetchGasStats);

function getRarity(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error:', error));
}

function getRarity(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error:', error));
}

document.getElementById('scanButton').addEventListener('click', function() {
  const userAddress = document.getElementById('userAddress').value;
  const apiUrl = `https://gw.sating.io/api/sats/mainnet/address_details/${userAddress}`;

  const loadingDiv = document.getElementById('loading');
  loadingDiv.innerHTML = 'Scanning...';

  getRarity(apiUrl)
    .then(response => {
      const rarityResponseDiv = document.getElementById('rarityResponse');
      const storyResponseDiv = document.getElementById('storyResponse');
      const learnMoreDiv = document.getElementById('learnMore');
      rarityResponseDiv.innerHTML = `
        Uncommon: ${response.sats.rarity.uncommon.length}<br>
        Rare: ${response.sats.rarity.rare.length}<br>
        Epic: ${response.sats.rarity.epic.length}<br>
        Legendary: ${response.sats.rarity.legendary.length}<br>
        Mythic: ${response.sats.rarity.mythic.length}
      `;
      storyResponseDiv.innerHTML = `
        Pizza: ${response.sats.interesting.ord_pizza[0].list.length || 0}<br>
        Vintage: ${response.sats.interesting.ord_vintage[0].list.length || 0}<br>
        First Transaction: ${response.sats.interesting.ord_first_transaction[0].list.length || 0}<br>
        Palindromes Name: ${response.sats.interesting.ord_palindromes_name[0].list.length || 0}<br>
        Palindromes Numer: ${response.sats.interesting.ord_palindromes_integer[0].list.length || 0}
      `;
      learnMoreDiv.innerHTML = `
        Transfer and inscribe on your rare sats with one click at <a href='https://sating.io' target='_blank'>sating.io</a>
        <br>
      `;

      const displayedValues = rarityResponseDiv.querySelectorAll('span, div');
      displayedValues.forEach(element => {
        if (element.innerHTML.trim() === '[]') {
          element.innerHTML = '0';
        }
      });

      loadingDiv.innerHTML = '';
    })
    .catch(error => console.error('Error:', error));
});
