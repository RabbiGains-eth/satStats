import React from 'react';
import logo from '../../assets/img/logo-lg.png';
import './Newtab.css';

const Newtab = () => {
  function getBlockHeight(height, callback, errorCallback) {
    fetch(`https://blockchain.info/block-height/${height}?format=json`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          errorCallback();
        }
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(
          `An error occurred while getting block height with height ${height}: ${error}`
        );
        errorCallback();
      });
  }

  function getInscription(inscriptionId, callback, errorCallback) {
    fetch(`https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionId}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          errorCallback();
        }
      })
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log(
          `An error occurred while getting inscription with ${inscriptionId}: ${error}`
        );
        errorCallback();
      });
  }

  function insertToMagicEden() {
    const allAssets = document.querySelectorAll(
      '.grid-wrapper div[class="tw-relative tw-flex tw-items-center tw-bg-gray-200 tw-rounded-xl"]'
    );
    for (let i = 0; i < allAssets.length; i++) {
      const asset = allAssets[i];
      const link = asset.querySelector('a').href;
      const splitedLink = link.split('/');
      const token = splitedLink[splitedLink.length - 1];
      const imageElem = asset.querySelector('a');
      const isDateExist = imageElem.querySelector('.date-row');
      if (!isDateExist) {
        const iconRow = document.createElement('div');
        iconRow.className = 'date-row';
        iconRow.innerHTML = `
          <a class="date-link">
            <span class="month_value"></span>
            <span class="year_value"></span>
          </a>
          <a class="rarity-link">
            <span class="sat_rarity_value"></span>
          </a>
        `;
        imageElem.insertBefore(iconRow, imageElem.firstChild);
        imageElem
          .querySelector('.date-row .date-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        imageElem
          .querySelector('.date-row .rarity-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        allAssets[i].querySelector(
          '.rarity-link .sat_rarity_value'
        ).style.display = 'none';
        getInscription(
          token,
          function (res) {
            getBlockHeight(
              res.sat_coinbase_height,
              function (block_res) {
                const timestamp = block_res.blocks[0].time;
                const date = new Date(timestamp * 1000);
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'inline-block';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = res.sat_rarity;
                if (res.sat_rarity !== 'common') {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'red';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'white';
                } else {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'white';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'black';
                }
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = ('0' + (date.getMonth() * 1 + 1)).slice(-2);
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '/' + date.getFullYear();
                allAssets[i].querySelector('.date-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;
                allAssets[i].querySelector('.rarity-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;

                if (!res.sat_ordinal) {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                } else {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                }
              },
              function () {
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'none';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = '';
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = '';
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '';
                allAssets[i].querySelector('.date-link').href = '';
                allAssets[i].querySelector('.rarity-link').href = '';
                allAssets[i]
                  .querySelector('.date-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
                allAssets[i]
                  .querySelector('.rarity-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
              }
            );
          },
          function () {
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).style.display = 'none';
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).innerHTML = '';
            allAssets[i].querySelector('.date-link .month_value').innerHTML =
              '';
            allAssets[i].querySelector('.date-link .year_value').innerHTML = '';
            allAssets[i].querySelector('.date-link').href = '';
            allAssets[i].querySelector('.rarity-link').href = '';
            allAssets[i]
              .querySelector('.date-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
            allAssets[i]
              .querySelector('.rarity-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
          }
        );
      }
    }
  }

  function insertToOrdinalsWallet() {
    const allAssets = document.querySelectorAll(
      '.infinite-scroll-component div[class^="InscriptionCard_root"]'
    );
    for (let i = 0; i < allAssets.length; i++) {
      const asset = allAssets[i];
      const link = asset.querySelector('a').href;
      const splitedLink = link.split('/');
      const token = splitedLink[splitedLink.length - 1];
      const imageElem = asset.querySelector(
        'a div[class^="InscriptionCard_contentWrapper"]'
      );
      const isDateExist = imageElem.querySelector('.date-row');
      if (!isDateExist) {
        const iconRow = document.createElement('div');
        iconRow.className = 'date-row';
        iconRow.innerHTML = `
          <a class="date-link">
            <span class="month_value"></span>
            <span class="year_value"></span>
          </a>
          <a class="rarity-link">
            <span class="sat_rarity_value"></span>
          </a>
        `;
        imageElem.insertBefore(iconRow, imageElem.firstChild);
        imageElem
          .querySelector('.date-row .date-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        imageElem
          .querySelector('.date-row .rarity-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        allAssets[i].querySelector(
          '.rarity-link .sat_rarity_value'
        ).style.display = 'none';
        getInscription(
          token,
          function (res) {
            getBlockHeight(
              res.sat_coinbase_height,
              function (block_res) {
                const timestamp = block_res.blocks[0].time;
                const date = new Date(timestamp * 1000);
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'inline-block';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = res.sat_rarity;
                if (res.sat_rarity !== 'common') {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'red';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'white';
                } else {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'white';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'black';
                }
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = ('0' + (date.getMonth() * 1 + 1)).slice(-2);
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '/' + date.getFullYear();
                allAssets[i].querySelector('.date-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;
                allAssets[i].querySelector('.rarity-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;

                if (!res.sat_ordinal) {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                } else {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                }
              },
              function () {
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'none';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = '';
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = '';
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '';
                allAssets[i].querySelector('.date-link').href = '';
                allAssets[i].querySelector('.rarity-link').href = '';

                allAssets[i]
                  .querySelector('.date-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
                allAssets[i]
                  .querySelector('.rarity-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
              }
            );
          },
          function () {
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).style.display = 'none';
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).innerHTML = '';
            allAssets[i].querySelector('.date-link .month_value').innerHTML =
              '';
            allAssets[i].querySelector('.date-link .year_value').innerHTML = '';
            allAssets[i].querySelector('.date-link').href = '';
            allAssets[i].querySelector('.rarity-link').href = '';

            allAssets[i]
              .querySelector('.date-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
            allAssets[i]
              .querySelector('.rarity-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
          }
        );
      }
    }
  }

  function insertToOrdIO() {
    const allAssets = document.querySelectorAll('.feed-cols a[class=""]');
    for (let i = 0; i < allAssets.length; i++) {
      const asset = allAssets[i];
      const link = asset.href;
      const splitedLink = link.split('/');
      const token = splitedLink[splitedLink.length - 1];
      const imageElem = asset.querySelector(
        '.bg-dark-card div.relative.aspect-square'
      );
      const isDateExist = imageElem.querySelector('.date-row');
      if (!isDateExist) {
        const iconRow = document.createElement('div');
        iconRow.className = 'date-row';
        iconRow.innerHTML = `
          <a class="date-link">
            <span class="month_value"></span>
            <span class="year_value"></span>
          </a>
          <a class="rarity-link">
            <span class="sat_rarity_value"></span>
          </a>
        `;
        imageElem.insertBefore(iconRow, imageElem.firstChild);
        // imageElem.querySelector('.date-row .date-link').addEventListener('click', function (e) {
        //   e.preventDefault();
        //   e.stopPropagation();
        // });
        // imageElem.querySelector('.date-row .rarity-link').addEventListener('click', function (e) {
        //   e.preventDefault();
        //   e.stopPropagation();
        // });
        allAssets[i].querySelector(
          '.rarity-link .sat_rarity_value'
        ).style.display = 'none';
        getInscription(
          token,
          function (res) {
            getBlockHeight(
              res.sat_coinbase_height,
              function (block_res) {
                const timestamp = block_res.blocks[0].time;
                const date = new Date(timestamp * 1000);
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'inline-block';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = res.sat_rarity;
                if (res.sat_rarity !== 'common') {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'red';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'white';
                } else {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'white';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'black';
                }
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = ('0' + (date.getMonth() * 1 + 1)).slice(-2);
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '/' + date.getFullYear();
                allAssets[i].querySelector('.date-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;
                allAssets[i].querySelector('.rarity-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;

                if (!res.sat_ordinal) {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                } else {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                }
              },
              function () {
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'none';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = '';
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = '';
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '';
                allAssets[i].querySelector('.date-link').href = '';
                allAssets[i].querySelector('.rarity-link').href = '';

                allAssets[i]
                  .querySelector('.date-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
                allAssets[i]
                  .querySelector('.rarity-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
              }
            );
          },
          function () {
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).style.display = 'none';
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).innerHTML = '';
            allAssets[i].querySelector('.date-link .month_value').innerHTML =
              '';
            allAssets[i].querySelector('.date-link .year_value').innerHTML = '';
            allAssets[i].querySelector('.date-link').href = '';
            allAssets[i].querySelector('.rarity-link').href = '';
            allAssets[i]
              .querySelector('.date-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
            allAssets[i]
              .querySelector('.rarity-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
          }
        );
      }
    }
  }

  function insertToGamma() {
    const allAssets = document.querySelectorAll('.content-start .card-bg');
    for (let i = 0; i < allAssets.length; i++) {
      const asset = allAssets[i];
      const link = asset.querySelector('a').href;
      const splitedLink = link.split('/');
      const token = splitedLink[splitedLink.length - 1];
      const imageElem = asset?.querySelector('a .aspect-square .relative');
      const isDateExist = imageElem?.querySelector('.date-row');
      if (!isDateExist) {
        const iconRow = document.createElement('div');
        iconRow.className = 'date-row';
        iconRow.innerHTML = `
          <a class="date-link">
            <span class="month_value"></span>
            <span class="year_value"></span>
          </a>
          <a class="rarity-link">
            <span class="sat_rarity_value"></span>
          </a>
        `;
        imageElem.insertBefore(iconRow, imageElem.firstChild);
        imageElem
          .querySelector('.date-row .date-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        imageElem
          .querySelector('.date-row .rarity-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });
        allAssets[i].querySelector(
          '.rarity-link .sat_rarity_value'
        ).style.display = 'none';
        getInscription(
          token,
          function (res) {
            getBlockHeight(
              res.sat_coinbase_height,
              function (block_res) {
                const timestamp = block_res.blocks[0].time;
                const date = new Date(timestamp * 1000);
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'inline-block';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = res.sat_rarity;
                if (res.sat_rarity !== 'common') {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'red';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'white';
                } else {
                  allAssets[i].querySelector(
                    '.rarity-link'
                  ).style.backgroundColor = 'white';
                  allAssets[i].querySelector('.rarity-link span').style.color =
                    'black';
                }
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = ('0' + (date.getMonth() * 1 + 1)).slice(-2);
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '/' + date.getFullYear();
                allAssets[i].querySelector('.date-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;
                allAssets[i].querySelector('.rarity-link').href =
                  'https://ordinals.com/sat/' + res.sat_ordinal;

                if (!res.sat_ordinal) {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                    });
                } else {
                  allAssets[i]
                    .querySelector('.date-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                  allAssets[i]
                    .querySelector('.rarity-link')
                    .addEventListener('click', function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(this.href, '_blank');
                    });
                }
              },
              function () {
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).style.display = 'none';
                allAssets[i].querySelector(
                  '.rarity-link .sat_rarity_value'
                ).innerHTML = '';
                allAssets[i].querySelector(
                  '.date-link .month_value'
                ).innerHTML = '';
                allAssets[i].querySelector('.date-link .year_value').innerHTML =
                  '';
                allAssets[i].querySelector('.date-link').href = '';
                allAssets[i].querySelector('.rarity-link').href = '';
                allAssets[i]
                  .querySelector('.date-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
                allAssets[i]
                  .querySelector('.rarity-link')
                  .addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  });
              }
            );
          },
          function () {
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).style.display = 'none';
            allAssets[i].querySelector(
              '.rarity-link .sat_rarity_value'
            ).innerHTML = '';
            allAssets[i].querySelector('.date-link .month_value').innerHTML =
              '';
            allAssets[i].querySelector('.date-link .year_value').innerHTML = '';
            allAssets[i].querySelector('.date-link').href = '';
            allAssets[i].querySelector('.rarity-link').href = '';
            allAssets[i]
              .querySelector('.date-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
            allAssets[i]
              .querySelector('.rarity-link')
              .addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
              });
          }
        );
      }
    }
  }

  function removeAllLinks() {
    const allLinks = document.querySelectorAll('.date-row');
    for (let i = 0; i < allLinks.length; i++) {
      const link = allLinks[i];
      if (link) {
        link.remove();
      }
    }
  }

  const WEB_URL = 'https://magiceden.io/ordinals/';
  const ORDINALS_WEB_URL = 'https://ordinalswallet.com/';
  const ORDIO_WEB_URL = 'https://www.ord.io';
  const GAMMA_WEB_URL = 'https://gamma.io/ordinals/';
  let allowed = false;

  function executeState(selected) {
    console.log(selected, window.location.href)
    if (selected && window.location.href.indexOf(WEB_URL) > -1) {
      allowed = true;
      insertToMagicEden();

      window.addEventListener('wheel', (event) => {
        if (window.location.href.indexOf(WEB_URL) > -1 && allowed) {
          insertToMagicEden();
        }
      });
    } else if (
      selected &&
      window.location.href.indexOf(ORDINALS_WEB_URL) > -1
    ) {
      allowed = true;
      insertToOrdinalsWallet();

      window.addEventListener('wheel', (event) => {
        if (window.location.href.indexOf(ORDINALS_WEB_URL) > -1 && allowed) {
          insertToOrdinalsWallet();
        }
      });
    } else if (
      selected &&
      window.location.href.indexOf(ORDIO_WEB_URL) > -1
    ) {
      allowed = true;
      insertToOrdIO();

      window.addEventListener('wheel', (event) => {
        if (window.location.href.indexOf(ORDIO_WEB_URL) > -1 && allowed) {
          insertToOrdIO();
        }
      });
    } else if (
      selected &&
      window.location.href.indexOf(GAMMA_WEB_URL) > -1
    ) {
      allowed = true;
      insertToGamma();

      window.addEventListener('wheel', (event) => {
        if (window.location.href.indexOf(GAMMA_WEB_URL) > -1 && allowed) {
          insertToGamma();
        }
      });
    } else {
      allowed = false;
      removeAllLinks();
    }
  }


  chrome.runtime.onMessage.addListener(         
    function (request, sender, sendResponse) {
      console.log(request);
      if (request.message === "allowed") {
        executeState(request.selected ? true : false);
      }
    }
  );

  let previousUrl = '';
  const observer = new MutationObserver(function (mutations) {
    if (
      window.location.href.indexOf(WEB_URL) > -1 ||
      window.location.href.indexOf(ORDINALS_WEB_URL) > -1 ||
      window.location.href.indexOf(ORDIO_WEB_URL) > -1 ||
      window.location.href.indexOf(GAMMA_WEB_URL) > -1
    ) {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        console.log(`URL changed to ${location.href}`);
        setTimeout(
          () => {
            chrome.storage.local.get(["toggleButton"]).then(function (result) {
              console.log(result);
              executeState(result.toggleButton ? true : false);
            });
          },
          window.location.href.indexOf(ORDIO_WEB_URL) > -1 ? 4500 : 2500
        );
      }
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
  return (
    <div>
    </div>
  );
};

export default Newtab;